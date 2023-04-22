import React, { useState } from 'react'
import {useAppSelector,useAppDispatch} from '../hook';
import {addContact,deleteContact, editContact} from '../feature/ContactSlice.js'
interface totalData{
    firstname:string,
    lastname:string,
    status:string,
    id : string
}
const Contact = () => {
    const dispatch  = useAppDispatch();
    // get redux state using useAppSelector
    const data = useAppSelector((e)=>{return e});
    const [showModal,setshowModal]=useState(false);
    const [contact,setcontact]=useState({firstname:"",lastname:"",status:"inactive"});
    const [singcontact,setsingcontact]=useState({firstname:"",lastname:"",status:""});
    const [showEdit,setshowEdit]=useState(false);
    const [contactlist,setcontactlist]=useState(true);
    const [viewData,setviewData]=useState<totalData | null>(null);
    const[view,setview]=useState(false);
    const[editId,seteditId]=useState();
    console.log(data)
    // add new contact 
    const handleClick=()=>{
        setshowModal(false);
        setcontactlist(true);
        dispatch(addContact({
            "firstname":contact.firstname,
            "lastname":contact.lastname,
            "status":contact.status
        }))
    }
    const handleView=(id:any)=>{
        setcontactlist(false);
        setshowEdit(false);
        setview(true);
        const newData = data[id];
        setviewData(newData);
    }
    //It delete the contact 
    const handleDelete=(id:any)=>{
        dispatch(deleteContact(id))
    }
    const handleEditChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
     setsingcontact({...singcontact,[e.target.name]:e.target.value})
    }
   const handleEdit = (firstname:any,lastname:any,status:any,id:any)=>{
    setshowEdit(true);
    setcontactlist(false);
    singcontact.firstname=firstname;
    singcontact.lastname=lastname;
    singcontact.status=status;
    seteditId(id);
   }
   const handleSubmit=()=>{
    setshowEdit(false);
    setcontactlist(true);
    //Send the payload to editContact in Redux to edit contact Info using
    //dispatch function
    dispatch(editContact({
        "firstname":singcontact.firstname,
        "lastname":singcontact.lastname,
        "status":singcontact.status,
        "id":editId
    }));
   }
   const handleClose=()=>{
    setcontactlist(true);
    setshowEdit(false);
    setshowModal(false);
    setview(false)
   }
    const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        setcontact({...contact,[e.target.name]:e.target.value})
    }
  return (
    <div className='p-2 flex flex-col w-[100%] items-center '>
        <button data-modal-target="defaultModal" data-modal-toggle="defaultModal" className='rounded-none h-10   bg-blue-500 p-1 justify-center' type='button' onClick={()=>{setshowModal(true);
        setcontactlist(false);
         setshowEdit(false)}}
         >Create Contact</button>
     {showModal ? ( <div id='defaultModal' className='p-5 border-2 border-black m-2'>
        
            <h1 className='text-center text-2xl mb-2'>Create Contact Screen</h1>
       
        <form className='border-2 p-3 text-xl border-black'>
            <div className='my-2'>
            <label className='mx-2'>First Name:</label>
            <input type='text' className='border-2 border-black' name="firstname" onChange={handleChange} value={contact.firstname}></input>
            </div>
            <div className='my-2'>
            <label className='mx-2 '>Last Name:</label>
            <input type='text' className='border-2 border-black' name="lastname" onChange={handleChange} value={contact.lastname} ></input>
            </div>
            <div className='flex flex-row my-2'>
                <label className='mx-2 my-3 p-2' >Status:</label>
                <div className='mx-5 my-2 '>
                <div className="flex items-center mb-4">
    <input id="default-radio-1" type="radio"  name="status" value="active" onChange={handleChange} className="w-4 h-4  bg-gray-100    "/>
    <label htmlFor="default-radio-1" className="ml-2   text-gray-900 dark:text-gray-300">Active</label>
</div>
<div className="flex items-center ">
    <input checked id="default-radio-2" type="radio"  name="status" value="inactive" onChange={handleChange} className="w-4 h-4  bg-gray-100    "/>
    <label htmlFor="default-radio-2" className="ml-2   text-gray-900 ">InActive</label>
</div>
</div>
            </div>
        </form>
            <div className='flex justify-center items-center gap-2'>
                <button data-modal-hide="defaultModal" className='bg-blue-500 py-2 px-4 my-2' onClick={handleClick} >Save</button>
                <button data-modal-hide="defaultModal" className='bg-blue-500 py-2 px-4 my-2' onClick={handleClose} >Close</button>
            </div>
       </div>):null}
<div className={`flex flex-col my-2  gap-1 border overflow-auto  h-[70%] w-[50%] ${contactlist || view || showEdit ?'':'hidden'} `}>
   {
     contactlist &&  data.map((e:any,id:any)=>(
        <div className='flex flex-row py-1 px-2 justify-between  gap-7 text-xl my-2 w-[100%] border-2 rounded-2xl border-black '>
            <div className='basis-1/2 '>{e.firstname} {e.lastname}</div>
            <div className='flex gap-1  basis-1/2 justify-end '>
            <button className='bg-green-400   rounded-full px-4 py-2  text-white' onClick={()=>{handleEdit(e.firstname,e.lastname,e.status,e.id)}}  >Edit</button>
            <button className='bg-red-500  rounded-full p-2 text-white' onClick={()=>
               handleDelete(e.id)   
            } >Delete</button>
            <button className='bg-gray-500  rounded-full px-4 py-2 text-white' onClick={()=>handleView(id)} >View</button>
            </div>
       </div>
       ))}
          {showEdit ? ( <div id='defaultModal' className='p-5 border-2 border-black m-2'>
        
        <h1 className='text-center text-2xl mb-2'>Create Contact Screen</h1>
   
    <form className='border-2 p-3 text-xl border-black'>
        <div className='my-2'>
        <label className='mx-2'>First Name:</label>
        <input type='text' className='border-2 border-black' name="firstname" onChange={handleEditChange} value={singcontact.firstname}></input>
        </div>
        <div className='my-2'>
        <label className='mx-2 '>Last Name:</label>
        <input type='text' className='border-2 border-black' name="lastname" onChange={handleEditChange} value={singcontact.lastname} ></input>
        </div>
        <div className='flex flex-row my-2'>
            <label className='mx-2 my-3 p-2' >Status:</label>
            <div className='mx-5 my-2 '>
            <div className="flex items-center mb-4">
<input id="default-radio-1" type="radio"  name="status" value="active" onChange={handleEditChange} className="w-4 h-4  bg-gray-100    "/>
<label htmlFor="default-radio-1" className="ml-2   text-gray-900 dark:text-gray-300">Active</label>
</div>
<div className="flex items-center ">
<input checked id="default-radio-2" type="radio"  name="status" value="inactive" onChange={handleEditChange} className="w-4 h-4  bg-gray-100    "/>
<label htmlFor="default-radio-2" className="ml-2   text-gray-900 ">InActive</label>
</div>
</div>
        </div>
    </form>
        <div className='flex justify-center items-center gap-2'>
            <button data-modal-hide="defaultModal" className='bg-blue-500 py-2 px-4 my-2' onClick={handleSubmit} >SaveEditedContact</button>
            <button data-modal-hide="defaultModal" className='bg-blue-500 py-2 px-4 my-2' onClick={handleClose} >Close</button>
        </div>
   </div>):null}
   {
    view?<div className='flex p-2 flex-col gap-1 text-xl text-center justify-center items-center shadow-md '>
        <div className='text-2xl text-center'>Contact Detail</div>
        <div>FirstName:<span className='text-green-400 mx-4'>{viewData?.firstname}</span></div>
        <div>LastName:<span className='text-green-400 mx-4'>{viewData?.lastname}</span></div>
        <div>Status:<span className='text-green-400 mx-4'>{viewData?.status}</span></div>
        <button onClick={handleClose} className='p-2 bg-gray-400 text-white w-1/2'>Close</button>
    </div>
   :null}
    </div>
   </div>
  )
}

export default Contact