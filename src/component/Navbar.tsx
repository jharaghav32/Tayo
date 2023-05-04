import React from 'react'
import {Link,useParams} from 'react-router-dom'
import {MdContactPage} from 'react-icons/md'
import{BiLineChart} from 'react-icons/bi'
import{BiMap} from 'react-icons/bi'
const Navbar = () => {
  return (
    <div className='container  flex flex-col text-3xl w-2/12 h-[92vh] items-center  border-2 border-r-black'>
    <Link to='/' className='py-3 w-[100%] hover:bg-slate-200 '> 
    
      <button className='border-black'><MdContactPage className='inline'/> <span className='hidden md:inline'>Contacts</span> </button>
      </Link>
      <div className='h-1 w-[100%] border-2 border-b-black'></div>
      <Link to='/chart' className='py-3 w-[100%] hover:bg-slate-200 '>
       
     <button> <BiLineChart className='inline'/><span className='hidden md:inline'> Charts</span></button>
      </Link>
      <div className='h-1 w-[100%] border-2 border-b-black'></div>
      <Link to='/maps' className='py-3 w-[100%] hover:bg-slate-200 '>
       
       <button> <BiMap className='inline'/><span className='hidden md:inline'>Map</span></button>
        </Link>
      <div className='h-1 w-[100%] border-2 border-b-black'></div>
    </div>
  )
}

export default Navbar