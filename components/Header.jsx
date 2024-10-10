import Link from 'next/link'
import React, {useState, useEffect} from 'react'

import { getCategory } from '../services';

const Header = () => {
  
  const [category, setCategory] = useState([]);
   
  useEffect(() => {
    getCategory()
       .then((newCategory) => setCategory(newCategory))
   
  }, []);

  
  return (
    <div className='container mx-auto px-10 mb-8'>
        <div className='border-b w-full inline-block border-blue-400 py-8'>
            <div className='md:float-left block'>
                <Link href='/'>
                <span className='cursor-pointer font-bold text-4xl text-white'>
                    Gregor
                </span>
                </Link>
            </div>
            <div className='hidden md:float-left md:contents'>
                
            </div>
        </div>
    </div>
  )
}

export default Header