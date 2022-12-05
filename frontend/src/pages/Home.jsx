import Button from '../components/Button'
import Header from '../components/Header'
import { BsArrowRight } from 'react-icons/bs'
import bellFunction from '../assets/BellFunction.png'
import '../styles/Home.scss'
import { Link } from 'react-router-dom'


const Home = () => {
  return (
   <div>
    <Header/>

    <div className='flex justify-center items-center home-container mx-auto max-w-7xl mt-4'>

    {/* left container  */}
    <div className='home-left-container flex flex-col justify-between max-w-xl'>
    <div className='mt-20'>

      <p className='text-4xl font-bold mb-10'>Alerts now managed!</p>

      <p className='mb-10 text-lg'>Block Alerts provide a platform to set up alerts in your smart contracts. Whether you want to get alerts for any transaction or events, the block alerts platform will listen to the alert and send it to your Slack, MS teams, etc.
      </p>

     <Link to="/started" >
     <div className='flex '>
      <Button text="Get Started" suffixLogo={<BsArrowRight/>} customClass={"getStarted"} />
      </div>
     </Link>

    </div>

    </div>
    {/* left container end  */}


    {/* right container  */}
    <div className='bellFunction-image'>
      <img src={bellFunction} alt="" />
    </div>
    {/* right container end  */}

    </div>

   </div>

  )
}

export default Home