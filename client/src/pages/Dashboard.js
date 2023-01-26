import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import actionIcon from '../assets/action-more@2x.png'
import EditUser from './EditUser'

function Dashboard() {
  const { getUsers, profiles } = useGlobalContext()
  const [edit, setEdit] = useState(false)
  const [editId, setEditId] = useState('')
  const [singleProfile, setSingleProfile] = useState({})

  useEffect(() => {
    getUsers()
  }, [edit])

  const handleClick = (e) => {
    setEditId(e.currentTarget.dataset.id)
    const singleUser = profiles.filter((profile) => profile._id === e.currentTarget.dataset.id)
    setSingleProfile(singleUser[0])
    setTimeout(() => {
      setEdit(!edit)
    }, 1000)
  }

  return (
    <div className='relative flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>
        <Navbar />
        {!edit ? (
          <div className=' bg-gray-200 h-screen p-5'>
            <h3>User Profile</h3>
            <div className='overflow-auto rounded-lg shadow hidden md:block'>
              <table className=' bg-white w-full'>
                <thead className='bg-gray-50 border-b-2 border-gray-200'>
                  <tr>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Username</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>First Name</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Last Name</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Gender</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Email</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Created by</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Created at</th>
                    <th className='p-3 text-sm font-semibold tracking-wide text-left'>Action</th>
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-100'>
                  {profiles &&
                    profiles.map((profile) => (
                      <tr key={profile._id}>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile.userName}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile.firstName}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile.lastName}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile.gender}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile.email}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile._id}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>{profile.createdAt}</td>
                        <td className='p-3 text-sm text-gray-700 whitespace-nowrap'>
                          <img src={actionIcon} alt='action' data-id={profile._id} onClick={handleClick}></img>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EditUser edit={edit} setEdit={setEdit} editId={editId} singleProfile={singleProfile} />
        )}
      </div>
    </div>
  )
}

export default Dashboard
