from bs4 import BeautifulSoup
import requests
import json
import schedule
import time

def push_to_slack_webhook(webhook_url, data):
    headers = {
        'Content-Type': 'application/json'
    }
    r = requests.post(webhook_url, headers=headers, data=data)
    print(r.text)

def erc20_tokens_transferred_amount(bs_obj):
    elements = bs_obj.find_all("div", {"class": "media-body"})

    amount = ''

    for e in elements:
        amount = e.find_all("span", {"class": "text-break"})[0].text
        break
    return amount

def from_to_addresses(bs_obj):
    elements = bs_obj.find_all("div", {"class": "media-body"})

    txn_from, txn_to = '', ''

    for e in elements:
        counter = 0
        for i in e.find_all("span", {"class": "tooltip-address"}):
            if counter == 0:
                txn_from = i.text
            if counter == 1:
                txn_to = i.text
            counter += 1
    return (txn_from, txn_to)

def get_token_name(bs_obj):
    elements = bs_obj.find_all("div", {"class": "media-body"})

    token_address = bs_obj.find_all('a', {'id': 'contractCopy'})[0].text
    token_name = ''
    for e in elements:
        token_name = e.find_all("a", {"href": "/token/" + token_address})[0].text
        break
    return token_name

def build_slack_message(txn_hash, amount, token_name, txn_from, txn_to):
    slack_message = {
            "blocks": [
                {
			        "type": "section",
			        "text": {
				                "type": "mrkdwn",
				                "text": "*New transaction Alert*"
			                }
		        },
                {
			        "type": "section",
			        "block_id": "section567",
			        "text": {
				        "type": "mrkdwn",
				        "text": "<https://goerli.etherscan.io/tx/{}|Check on Etherscan> \n *{}* {} \n *Transferred* \n from: *{}* \n to: *{}*".format(txn_hash, amount, token_name, txn_from, txn_to)
			        }
		        }
            ]
        }
    return slack_message

def update_transaction_notified(txn):
    headers = {
        'Content-Type': 'application/json'
    }
    data = json.dumps({
        "txn": txn
    })
    requests.post("http://127.0.0.1:8080/txn_notified", data=data, headers=headers)

def check_txn_exists(txn):
    headers = {
        'Content-Type': 'application/json'
    }
    r = requests.get("http://127.0.0.1:8080/txn_notified?txn=" + txn)
    return r.json()

ETHERSCAN_URL = "https://api-goerli.etherscan.io/api"

params = {
    "module": "account",
    "action": "txlist",
    "address": "",
    "startblock": "7969166",
    "endblock": "99999999",
    "page": "1",
    "offset": "100",
    "sort": "asc",
    "apikey": "R1Q6ZHTH4YW4CPMT8D51KDSZ58PYA13CB8"
}

headers = {
    "cookie": "_ga=GA1.2.436795533.1660038922; __stripe_mid=4c5191d9-1244-4af8-8085-7558609169c210396f; ASP.NET_SessionId=xqgzqwupjpc5q3yzqt235hhk; etherscan_cookieconsent=True; _gid=GA1.2.1138389952.1668399132; __cuid=eeac0f68644b4714b7dafdfe1ef90601; amp_fef1e8=9300c91c-4ff5-447a-ad12-c1d9e1debd87R...1gi2j140u.1gi2lbck8.d.3.g",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
}

def job():

    alerts = requests.get("http://127.0.0.1:8080/alert")

    for d in alerts.json()['data']:

        params.update({"address": d['alertAddress']})

        r = requests.get(ETHERSCAN_URL, params=params)

        txn_hash = r.json()['result'][-1]['hash']

        if not check_txn_exists(txn_hash)['exists']:

            if r.json()['result'][-1]['functionName'] == 'transfer(address to, uint256 tokens)':

                r = requests.get('https://goerli.etherscan.io/tx/' + txn_hash, headers=headers)

                bs_obj = BeautifulSoup(r.text, features='html.parser')

                amount = erc20_tokens_transferred_amount(bs_obj)
                txn_from, txn_to = from_to_addresses(bs_obj)
                token_name = get_token_name(bs_obj)

                push_to_slack_webhook(d['slackWebhook'], json.dumps(build_slack_message(txn_hash, amount, token_name, txn_from, txn_to)))

                # update that a transaction notification has been sent on the db
                update_transaction_notified(txn_hash)


schedule.every(0.1).minutes.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)
