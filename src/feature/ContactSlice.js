import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid'
const initialState=[{
    id:uuidv4(),
    firstname:'Raghav',
    lastname:'jha',
    status:'active'
},
{
    id:uuidv4(),
    firstname:'Raju',
    lastname:'jha',
    status:'active'
},
{
    id:uuidv4(),
    firstname:'Rahul',
    lastname:'Roy',
    status:'active'
},
{
    id:uuidv4(),
    firstname:'Kumar',
    lastname:'Anukul',
    status:'active'
}
]
export const ContactSlice = createSlice({
 name:'contact',
 initialState,
 reducers:{
    addContact:(state,action)=>{
     const{firstname,lastname,status}=action.payload;
     const newcontact={
      "id":uuidv4(),
      "firstname":firstname,
      "lastname":lastname,
      "status":status
     };
     state.unshift(newcontact);
    },
    editContact:(state,action)=>{
        const{firstname,lastname,status,id}=action.payload;
        for(let i=0;i<state.length;i++){
            if(state[i].id===id){
                state[i].firstname=firstname;
                state[i].lastname=lastname;
                state[i].status=status;
            }
        }
    },
    deleteContact:(state,action)=>{
         return state.filter((item)=>{return item.id!==action.payload})
         console.log(state)
    }
 }
})
export const {addContact,editContact,deleteContact}=ContactSlice.actions;
export default ContactSlice.reducer;