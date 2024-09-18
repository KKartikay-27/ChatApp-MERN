import React from 'react'
import { BiLogOut } from 'react-icons/bi'
import useLogout from '../../hooks/useLogout';


const LogoutButton = () => {
  const { loading,logout }= useLogout();
  return (
    <div className='mt-auto p-2'>
      {!loading ? (
        <BiLogOut className='w-8 h-8 text-white cursor-pointer'
        onClick={logout }/>
      ) : (
        <span className='loading loading-spinner '></span>
      )}
    </div>
  )
}

export default LogoutButton 