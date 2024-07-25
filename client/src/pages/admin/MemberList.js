import { useContext, useEffect, useState } from "react"
import AppContext from "../../contexts/appContext"
import MembersListItems from "../../components/admin/MembersListItems"
import { useSelector} from "react-redux"

const MemberList = () => {

  const user = useSelector(state => state.user)
  const { filteredUsers, setFilteredUsers} = useContext(AppContext)
  
  const [formData, setFormData] = useState("")

  function handleSearchChange(event){
    setFormData(event.target.value)
  }

  useEffect(() => {
    if(formData === ""){
      setFilteredUsers(user.users)
    } else{
      setFilteredUsers(user.users.filter(user => user.name.toLowerCase().includes(formData.toLowerCase())))
    }
  }, [formData])

  return (
    <div className="content-container">
      <h2 className='text-xl font-bold text-gray-500 flex items-center'><span className='text-6xl mr-2 text-green-700'><i class="bi bi-people-fill"></i></span>Members List</h2>
      <form>
        <div>
          <input className="border-2 border-gray-500 rounded" id="search" name="search" value={formData} onChange={handleSearchChange} placeholder="Search a user by their name"  />
        </div>
      </form>
      <MembersListItems users={filteredUsers} />
    </div>
  )
}

export default MemberList