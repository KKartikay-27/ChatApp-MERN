import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {

  const [search,setSearch] = useState('');
  const {setSelectedConversation} = useConversation();
  const conversations = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return;
    if(search.length < 3)toast.error('Search query should be atleast 3 characters long');

    console.log(conversations);
    
    const conversation = conversations.conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));   

    if(conversation){
      setSelectedConversation(conversation);
      setSearch('');
    }else toast.error('No conversation found');

  }
  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type="text" placeholder='Search..' className='input input-bordered rounded-full'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp className='h-6 w-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput

// STARTER CODE FOR THIS FILE
// import React from 'react'
// import { IoSearchSharp } from "react-icons/io5";

// const SearchInput = () => {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type="text" placeholder='Search..' className='input input-bordered rounded-full'/>
//         <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearchSharp className='h-6 w-6 outline-none'/>
//         </button>
//     </form>
//   )
// }

// export default SearchInput