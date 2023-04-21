import React from 'react'
import {Link,useParams} from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='container  flex flex-col text-3xl w-2/12 h-[92vh] items-center  border-2 border-r-black'>
    <Link to='/' className='py-3  '> 
      <button className='border-black'>Contacts</button>
      </Link>
      <div className='h-1 w-[100%] border-2 border-b-black'></div>
      <Link to='/maps' className='py-3'>
    <button>Maps&Charts</button>
      </Link>
      <div className='h-1 w-[100%] border-2 border-b-black'></div>
    </div>
  )
}

export default Navbar