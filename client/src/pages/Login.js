import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useGlobalContext } from '../context'
import axios from 'axios'

function Login() {
  const { saveUser } = useGlobalContext()
  const history = useHistory()
  const [values, setValues] = useState({
    email: 'aimanskie@gmail.com',
    password: 'aiman',
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = values
    const loginUser = { email, password }
    try {
      const { data } = await axios.post(`/api/authenticate`, loginUser)
      setValues({ email: '', password: '' })
      saveUser(data.user)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <section className='bg-green-400'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
          <div className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
            <h1 className='text-center mt-6 mb-1 text-5xl font-black text-green-900'>Logo</h1>
            <h6 className='text-center'>Login to Platform</h6>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Registered email</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    placeholder='name@gmail.com'
                    required=''
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Password</label>
                  <input
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    required=''
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                  />
                </div>
                <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                  Login
                </button>
              </form>
              <p className='text-sm font-light text-gray-500 '>
                No account?
                <Link to='/register' className='font-medium pl-2 text-primary-600 hover:underline '>
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
