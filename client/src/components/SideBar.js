import React from 'react'
import icon from '../assets/user@2x.png'
const Sidebar = () => {
  return (
    <aside className='bg-white w-50'>
      <div className='mt-10 mb-10 px-4'>
        <h1 className='text-4xl font-black text-green-500'>LOGO</h1>
        <div className='bg-green-50 px-2 py-4 mt-32 mx-5 rounded-lg flex flex-col space-y-10'>
          <a href='/'>
            <div className='flex space-x-3'>
              <img src={icon} alt='' className='w-5' />
              <span className='text-green-500'>User profile</span>
            </div>
          </a>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
