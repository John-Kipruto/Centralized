import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AppContext from '../../contexts/appContext'
import axios from 'axios'
import {Buffer} from "buffer"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers } from '../../features/user/userSlice'
import { toast } from 'react-toastify'

const MemberItem = ({userItem}) => {
  const {setSelectedMember, apiURL, fetchUsers,  setFilteredUsers} = useContext(AppContext)
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  function handleSelectClick(){
    setSelectedMember(userItem)
  }

  function deleteUser(){
    axios.delete(`${apiURL}/users/${userItem.id}`, {withCredentials: true})
    .then(response => {
      setFilteredUsers(user.users.filter(userValid => userValid.id !== userItem.id))
      dispatch(fetchAllUsers())
      toast.success("User deleted successfully!")
      fetchUsers()
    })
    .catch(error => console.log(error))
  }
  return (
    <div key={userItem.id} className='member border rounded px-2 py-3 grid items-center grid-cols-6'>
        <div className='flex items-center'>
            <span className='mr-2'>
                {
                userItem.image ?
                <div><img src={`data:image/png;base64, ${Buffer.from(userItem.image.data, "binary").toString("base64")}`} alt={userItem.name} /></div>
                : 
                <div> <img src='' alt='' /></div>
                }
            </span>
        {userItem.name}
        </div>
        <div>{userItem.email}</div>
        <div>{userItem.role === "user" ? <span className='text-violet-500 font-semi-bold'>{userItem.role}</span> : <span className='text-teal-500'>{userItem.role}</span>}</div>
        <div className='text-green-500'>{userItem.active ? <span className='text-green-500'>Active</span> : <span className='text-red-500'>Inactive</span>}</div>
        <div className='text-blue-500'><Link onClick={handleSelectClick} to={"/admin/update-member"}><span className='border p-2 rounded'><i class="bi bi-pencil-fill"></i></span></Link></div>
        <div className='text-red-500'><span onClick={deleteUser} className='border p-2 rounded'><button><i class="bi bi-trash-fill"></i></button></span></div>
    </div>
  )
}

export default MemberItem