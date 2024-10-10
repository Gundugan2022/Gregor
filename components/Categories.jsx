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
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <span className='cursor-pointer block pb-3 mb-3'>
                {category.name}
              </span>
            </Link>
          ))}
      </div>
  )
}

export default Categories