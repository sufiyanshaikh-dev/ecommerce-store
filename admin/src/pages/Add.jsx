import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false)
  const [image2, setImage2] = useState(false)
  const [image3, setImage3] = useState(false)
  const [image4, setImage4] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])


  const onSubmitHandler = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestSeller", bestSeller)
      formData.append("sizes", JSON.stringify(sizes))

      image1 && formData.append("image1", image1)
      image2 && formData.append("image2", image2)
      image3 && formData.append("image3", image3)
      image4 && formData.append("image4", image4)

      // send to backend
      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      })

      if (response.data.success) {
        toast.success(response.data.message)
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("")
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    // <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-center gap-3'>
    //   <div>
    //     <p className='mb-2'>Upload Image</p>
    //     <div className='flex gap-2'>
    //       <label htmlFor="image1">
    //         <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} />
    //         <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
    //       </label>
    //       <label htmlFor="image2">
    //         <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} />
    //         <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
    //       </label>
    //       <label htmlFor="image3">
    //         <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} />
    //         <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
    //       </label>
    //       <label htmlFor="image4">
    //         <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} />
    //         <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
    //       </label>
    //     </div>
    //   </div>
    //   <div className='w-full'>
    //     <p className='mb-2'>Product name</p>
    //     <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Type here' className='w-full max-w-[500px] px-3 py-2' required />
    //   </div>
    //   <div className='w-full'>
    //     <p className='mb-2'>Product description</p>
    //     <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder='Write content here' className='w-full max-w-[500px] px-3 py-2' required />
    //   </div>
    //   <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
    //     <p className='mb-2'>Product category</p>
    //     <select onChange={(e) => setCategory(e.target.value)} value={category} className='w-full px-3 py-2'>
    //       <option value="Men">Men</option>
    //       <option value="Women">Women</option>
    //       <option value="Kids">Kids</option>
    //     </select>
    //   </div>
    //   <div>
    //     <p className='mb-2'>Sub category</p>
    //     <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className='w-full px-3 py-2'>
    //       <option value="Topwear">Topwear</option>
    //       <option value="Bottomwear">Bottomwear</option>
    //       <option value="Winterwear">Winterwear</option>
    //     </select>
    //   </div>
    //   <div>
    //     <p className='mb-2'>Product price</p>
    //     <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
    //   </div>
    //   <div>
    //     <p className='mb-2'>Product sizes</p>
    //     <div className='flex gap-3'>
    //       <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
    //         <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`}>S</p>
    //       </div>
    //       <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
    //         <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`}>M</p>
    //       </div>
    //       <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
    //         <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`}>L</p>
    //       </div>
    //       <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
    //         <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`}>XL</p>
    //       </div>
    //       <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
    //         <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1`}>XXL</p>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='flex gap-2 mt-2'>
    //     <input onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} type="checkbox" id='bestseller' />
    //     <label htmlFor="bestseller" className='cursor-pointer'>Add to bestseller</label>
    //   </div>
    //   <button type="submit" className='w-28 mt-4 py-3 bg-black text-white'>ADD</button>
    // </form>
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-5 px-6 py-6">
      <div className="w-full max-w-[800px]">
        <p className="mb-2 font-medium">Upload Image</p>
        <div className="flex gap-3 flex-wrap">
          <label htmlFor="image1">
            <img className="w-20 border border-gray-300 rounded-md cursor-pointer" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img className="w-20 border border-gray-300 rounded-md cursor-pointer" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
          </label>
          <label htmlFor="image3">
            <img className="w-20 border border-gray-300 rounded-md cursor-pointer" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
          </label>
          <label htmlFor="image4">
            <img className="w-20 border border-gray-300 rounded-md cursor-pointer" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full max-w-[800px]">
        <p className="mb-2 font-medium">Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Type here" className="w-full border border-gray-300 rounded-md px-3 py-2" required />
      </div>

      <div className="w-full max-w-[800px]">
        <p className="mb-2 font-medium">Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Write content here" className="w-full border border-gray-300 rounded-md px-3 py-2 h-24 resize-none" required />
      </div>

      {/* ✅ Category, Subcategory & Price in one line */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[800px]">
        <div className="flex-1">
          <p className="mb-2 font-medium">Product category</p>
          <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium">Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} value={subCategory} className="w-full border border-gray-300 rounded-md px-3 py-2">
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div className="flex-1">
          <p className="mb-2 font-medium">Product price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full border border-gray-300 rounded-md px-3 py-2" type="Number" placeholder="25" required/>
        </div>
      </div>

      <div className="w-full max-w-[800px]">
        <p className="mb-2 font-medium">Product sizes</p>
        <div className="flex gap-3 flex-wrap">
          <div onClick={() => setSizes((prev) => prev.includes("S") ? prev.filter((item) => item !== "S") : [...prev, "S"])}>
            <p className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1 rounded-md border`}>S</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("M") ? prev.filter((item) => item !== "M") : [...prev, "M"])}>
            <p className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1 rounded-md border`}>M</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("L") ? prev.filter((item) => item !== "L") : [...prev, "L"])}>
            <p className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1 rounded-md border`}>L</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("XL") ? prev.filter((item) => item !== "XL") : [...prev, "XL"])}>
            <p className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1 rounded-md border`}>XL</p>
          </div>
          <div onClick={() => setSizes((prev) => prev.includes("XXL") ? prev.filter((item) => item !== "XXL") : [...prev, "XXL"])}>
            <p className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} cursor-pointer px-3 py-1 rounded-md border`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full max-w-[800px] mt-2">
        <input onChange={() => setBestSeller((prev) => !prev)} checked={bestSeller} type="checkbox" id="bestseller" className="cursor-pointer"/>
        <label htmlFor="bestseller" className="cursor-pointer">Add to bestseller</label>
      </div>
      <button type="submit" className="w-28 mt-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition">ADD</button>
    </form>

  )
}

export default Add
