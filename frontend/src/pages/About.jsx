import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} className='w-full md:max-w-[450px]' />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis doloribus dolore ex impedit quaerat aspernatur laudantium soluta, adipisci alias fugiat assumenda architecto a fugit, consequatur laborum sunt officiis mollitia enim!</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius possimus pariatur itaque voluptas dolore? Dignissimos ipsum voluptatibus cum autem, nulla ad laboriosam molestias provident, possimus consectetur, recusandae accusamus labore cupiditate!</p>
          <b className='text-gray-600'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae quod tenetur quis, porro non, enim consequatur veritatis placeat delectus ratione voluptate distinctio qui ipsa ipsum aliquid deleniti sunt. Dolorum, provident?</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque optio exercitationem illo ex corrupti corporis! Aliquid veniam eligendi molestias repudiandae, est corporis, ad culpa fugit quod quibusdam eius beatae illo?</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque optio exercitationem illo ex corrupti corporis! Aliquid veniam eligendi molestias repudiandae, est corporis, ad culpa fugit quod quibusdam eius beatae illo?</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque optio exercitationem illo ex corrupti corporis! Aliquid veniam eligendi molestias repudiandae, est corporis, ad culpa fugit quod quibusdam eius beatae illo?</p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default About
