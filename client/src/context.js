import axios from 'axios'
import { createContext, useContext, useState, useEffect } from 'react'
const AppContext = createContext()

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profiles, setProfiles] = useState([])
  const [singleProfile, setSingleProfile] = useState({})

  const saveUser = (user) => {
    setUser(user)
  }

  const removeUser = () => {
    setUser(null)
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios(`/api/authenticate`)
      saveUser(data.user)
    } catch (error) {
      removeUser()
    }
  }

  const logoutUser = async () => {
    try {
      await axios.delete('/api/authenticate')
      console.log('success await')
      removeUser()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  const getUsers = async () => {
    const {
      data: { users },
    } = await axios('/api/account')
    setProfiles(users)
    return
  }

  const getUserToEdit = async (id) => {
    const {
      data: { user },
    } = await axios(`/api/account/${id}`)
    setSingleProfile(user)
  }

  return (
    <AppContext.Provider
      value={{
        saveUser,
        user,
        logoutUser,
        getUsers,
        profiles,
        setProfiles,
        getUserToEdit,
        singleProfile,
        setSingleProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppProvider }
