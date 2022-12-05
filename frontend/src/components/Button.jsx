import React from 'react'
import '../styles/Button.scss'

const Button = ({prefixLogo,text,suffixLogo, customClass}) => {
  return (
    <div className={`${customClass} flex items-center  button p-2 rounded-lg`}>
        {prefixLogo}
        <p className='text-md font-semibold'>{text}</p>
        <p className='ml-2'>{suffixLogo}</p>
    </div>
  )
}

export default Button