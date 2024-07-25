import {Routes, Route} from 'react-router-dom'
import { UserLayout, UserRegister, UserSignIn } from './pages/user'
import { AdminLayout, AdminSignIn, MemberList } from './pages/admin'
import RootLayout from './pages/RootLayout'
import { useState, useEffect } from 'react'
import AppContext from './contexts/appContext'
import NotFound from './pages/NotFound'
import UserAuthLayout from './pages/user/UserAuthLayout'
import Dashboard from './pages/admin/Dashboard'
import Profile from './pages/user/Profile'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js/auto'
import axios from 'axios'
import AddMember from './pages/admin/AddMember'
import UpdateMember from './pages/admin/UpdateMember'
import {  useDispatch } from 'react-redux'
import { fetchAllUsers} from './features/user/userSlice'
import { authenticateAppUser } from './features/appUser/appUserSlice'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

Chart.register(CategoryScale)

const App = () => {

    const apiURL = "http://localhost:8000/api"
    const dispatch = useDispatch()

    /** Application states */
    const [loggedInAdmin, setLoggedInAdmin] = useState(null)
    const [filteredUsers, setFilteredUsers] = useState([])
    const [selectedMember, setSelectedMember] = useState(null)

    /** App functions */

    /** Get all users from the backend */
    function fetchUsers(){
        axios.get(`${apiURL}/users`)
        .then(response => {
            setFilteredUsers(response.data)
        })
        .catch(error => console.log(error))
    }

   

    /** Check if admin is logged in */
    function authenticateAdmin(){
        axios.get(`${apiURL}/users/auth`, {withCredentials: true})
        .then(response => setLoggedInAdmin(response.data))
        .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchUsers()
        authenticateAdmin()
        dispatch(fetchAllUsers())
        dispatch(authenticateAppUser())
        
    }, [])


  return (
    <div className='text-lg'>
        <AppContext.Provider value={{loggedInAdmin, setLoggedInAdmin, 
            filteredUsers, setFilteredUsers,
            apiURL, selectedMember, setSelectedMember
            }}>
                
            <Routes>

                {/***************** Public routes ****************/}

                {/** User authentication routes */}
                <Route path='/user/auth' element={<UserAuthLayout />}>
                    <Route index element={<UserSignIn /> } />
                    <Route path='register' element={<UserRegister /> } />
                </Route>

                {/** Admin authentication route */}
                <Route path='/admin/signin' element={<AdminSignIn />} />
                



                {/************** Private routes *****************/}

                {/** User routes */}
                <Route path='/' element={<RootLayout />}>
                    <Route path='user' element={<UserLayout />}>
                        <Route index element={<Profile />} />
                    </Route>
                </Route>

                {/** Admin Routes */}
                <Route path='/admin' element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='member-list' element={<MemberList />} />
                    <Route path='add-member' element={<AddMember />} />
                    <Route path='update-member' element={<UpdateMember />} />
                </Route>




                {/*************** Erorr Pages **************/}
                
                {/** 404 Eror Page */}
                <Route path='*' element={<NotFound />}></Route>

            </Routes>

            <ToastContainer />
        </AppContext.Provider>
       
    </div>
  )
}

export default App
