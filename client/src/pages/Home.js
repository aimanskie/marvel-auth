import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { useGlobalContext } from '../context'
function Home() {
  const { user } = useGlobalContext()
  return (
    <>
      {user && <Redirect to='/dashboard' />}
      <div className='flex h-screen bg-green-400'>
        <div className='m-auto text-center bg-gray-100 rounded-xl pb-6'>
          <h1 className='mb-4 text-4xl font-extrabold text-gray-900'>Welcome to my website</h1>
          <p className='mb-6 text-lg font-normal text-gray-500'>
            Here at we focus on markets where technology, innovation, and capital can unlock long-term value and drive
            economic growth.
          </p>
          <div className=' text-center text-white '>
            <Link to='/login' className='bg-primary-400 p-4 rounded-lg mr-1'>
              Login
            </Link>
            <Link to='/register' className='bg-primary-400 p-4 rounded-lg ml-1'>
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
