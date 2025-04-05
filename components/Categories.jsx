import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import { getCategory } from '../services';


const Categories = () => {
  const [category, setCategory] = useState([]);
   
  useEffect(() => {
    getCategory()
       .then((newCategory) => setCategory(newCategory))
   
  }, []);
 
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 mb-8 pb-12'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
        Categories
      </h3>
          {category.map((category) => (
           

          <div key={category.slug} className='flex items-center w-full mb-4'>

          <div className='w-16 flex-none'>
            <img
              alt={category.name}
              height='51px'
              className='align-middle h-[51px] w-[51px] object-cover rounded-full'
              src={category.photo.url}
              width='51px'
            />
          </div>
          
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='cursor-pointer  pb-3 mb-3'>
                {category.name}
              </span>
            </Link>
          </div>

          ))}
      </div>
  )
}

export default Categories