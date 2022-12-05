import React from 'react'
import { useState } from 'react'
import Header from '../components/Header'
import '../styles/Create-alert.scss'

const CreateAlert = () => {

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [slackhook, setSlackhook] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      alertName: name,
      alertAddress: address,
      slackWebhook: slackhook
    }
    const res = await fetch('http://127.0.0.1:8080/alert', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    console.log(res);

    // window.location.href = '../alerts';
  }

return (
  <div>
    <Header />

    <div className='flex justify-center create-alert-wrapper'>

      <div className='flex justify-center items-center'>

        <form action="" onSubmit={handleSubmit} className='flex flex-col justify-around items-center rounded-md py-4 form-wrapper'>

          <p className='text-3xl font-semibold'>Create Alert</p>

          <div>
            <label className='text-md font-medium' >Alert name</label><br />
            <input type="text" placeholder='Enter alert name' className='px-6 py-2 rounded-md mt-2' value={name}
              onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className='text-md font-medium' >Smart Contract Adress</label><br />
            <input type="text" placeholder='Enter your smart Contract Address ' className='px-6 py-2 rounded-md mt-2' value={address}
              onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div>
            <label className='text-md font-medium' >Web Hook</label><br />
            <input type="text" placeholder='Enter your webhook' className='px-6 py-2 rounded-md mt-2' value={slackhook}
              onChange={(e) => setSlackhook(e.target.value)} />
          </div>

          <button type='submit' className='bg-black py-2 px-8 rounded-lg' >Submit</button>

        </form>

      </div>


    </div>


  </div>
)
}

export default CreateAlert