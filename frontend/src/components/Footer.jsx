import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className="">
            <img src={assets.logo} alt="" className='mb-5 w-32'/>
            <p className='w-full text-gray-600 md:w-2/3'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis iure molestiae ipsa id eius architecto cumque saepe! Tempore laudantium ipsum ad consequatur? Corporis fugit fugiat hic natus inventore eveniet cupiditate!
            </p>
        </div>
        <div>
            <p className="text-xl font-medium mb-5">COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>0114171421214</li>
                <li>contct@foreveryou.com</li>
            </ul>
        </div>
        <div>
            <hr />
            <p className='py-5 text-sm text-center '>Copyright 2025@ forever.com All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer
