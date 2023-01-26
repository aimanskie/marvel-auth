import { useGlobalContext } from '../context'
import userImg from '../assets/avatar@2x.png'
import searchImg from '../assets/search@2x.png'

const Navbar = () => {
  const { user, logoutUser } = useGlobalContext()
  return (
    <header className='bg-white flex justify-between'>
      <div className='flex relative ml-6'>
        <div className='bg-gray-200 my-4 py-3 '>
          <input type='text' className='bg-gray-200 ml-7' placeholder='Search' />
        </div>
        <div className=' absolute pt-8 pl-1'>
          <img src={searchImg} className='h-5 text-gray-50' alt='' />
        </div>
      </div>
      <div className='flex mr-10'>
        <div className='flex relative border rounded-3xl my-4 mx-2 pr-3'>
          <div className='w-32 text-end mt-2'>{user.userName}</div>
          <img src={userImg} className='rounded-full w-10 h-10 absolute mt-1' alt='' />
        </div>
        <button className='border rounded-3xl my-4 px-5 mx-2' onClick={() => logoutUser()}>
          Logout
        </button>
      </div>
    </header>
  )
}
export default Navbar
