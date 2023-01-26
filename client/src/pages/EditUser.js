import { useState } from 'react'
import axios from 'axios'
import { useGlobalContext } from '../context'

const EditUser = ({ setEdit, edit, editId, singleProfile }) => {
  const { getUsers } = useGlobalContext()

  const [values, setValues] = useState({
    userName: singleProfile.userName,
    email: singleProfile.email,
    role: singleProfile.role,
    firstName: singleProfile.firstName,
    lastName: singleProfile.lastName,
    gender: singleProfile.gender,
    phone: singleProfile.phone,
  })

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { userName, email, role, firstName, lastName, gender, phone } = values
    const updateUser = { userName, email, role, firstName, lastName, gender, phone }
    try {
      const { data } = await axios.put(`/api/account/${singleProfile._id}`, { user: updateUser })
      getUsers()
      setTimeout(() => {
        setEdit(!edit)
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {singleProfile ? (
        <div className='flex justify-center pt-10'>
          <div className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
            <div className=' space-y-4 md:space-y-6 sm:p-8'>
              <h6 className='text-center'>Edit User</h6>
              <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Username</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='userName'
                    value={values.userName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Email</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>First Name</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Last Name</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Gender</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='gender'
                    value={values.gender}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Phone Number</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='phone'
                    value={values.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-900 '>Birthday</label>
                  <input
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 '
                    name='birthday'
                    value={values.birthday}
                    onChange={handleChange}
                  />
                </div>
                <button className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>'Loading..'</div>
          <button
            className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
            onClick={() => setEdit(!edit)}
          >
            Update
          </button>
        </>
      )}
    </>
  )
}

export default EditUser
