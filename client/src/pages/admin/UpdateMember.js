import {useContext, useState} from 'react'
import AppContext from '../../contexts/appContext'
import axios from 'axios'
import { Buffer } from 'buffer'
import { useDispatch } from 'react-redux'
import { fetchAllUsers } from '../../features/user/userSlice'

const UpdateMember = () => {

    const {selectedMember, fetchUsers, apiURL} = useContext(AppContext)
    const dispatch = useDispatch()

    const [newImageIsSelected, setNewImageIsSelected] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        phoneNumber: "",
        gender: "",
        idNumber: "",
        password: "",
        ...selectedMember,
        image: selectedMember.image.data
    })

    const [profileImage, setProfileImage] = useState(`data:image/*;base64,${Buffer.from(selectedMember.image.data, "binary").toString("base64")}`)

    function handleInputChange(event){
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }

    function handleFIleChange(event){
        setNewImageIsSelected(true)
        const fileSelected = event.target.files[0]
        setProfileImage (URL.createObjectURL(fileSelected))
        
        setFormData({
            ...formData,
            image: fileSelected
        })
    }

    function updateUser(event){
        event.preventDefault()
        const profile = new FormData()
        profile.append("name", formData.name)
        profile.append("email", formData.email)
        profile.append("password", formData.password)
        profile.append("image", formData.image)
        
        const config = {headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true}

        /** Check if new profile image is selected */
        if(newImageIsSelected){

        axios.put(`${apiURL}/users/${selectedMember.id}`, profile, config)
        .then(response => {
            alert("Profile updated")
            dispatch(fetchAllUsers())
            fetchUsers()
            
        })
        .catch(error => {
            console.log(error)
        })
        } else{

        axios.put(`${apiURL}/users/${selectedMember.id}`, formData, {withCredentials: true})
        .then(response => {
            alert("Profile updated")
            dispatch(fetchAllUsers())
            fetchUsers()
            
        })
        .catch(error => {
            console.log(error)
        })
        }
    
  }

  return (
    <div className='content-container'>
        
        <div className=" grid lg:grid-cols-2 gap-5">
            <section className='rounded shadow py-3 px-2 bg-slate-100'>
            <h1 className='text-3xl font-bold p-1 text-center'>UPDATE MEMBER DETAILS</h1>
                <form className='' onSubmit={updateUser}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input className='border rounded' id="name" name="name" value={formData.name} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input className='border rounded' id="email" name="email" value={formData.email} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input className='border rounded' id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                        <input type='file' className='border rounded' id="image" name="image"  onChange={handleFIleChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input className='border rounded' id="password" name="password" value={formData.password} onChange={handleInputChange}/>
                    </div>
                    <div></div>
                    <div>
                        <input onClick={updateUser} className='bg-blue-500 text-white font-bold p-2 rounded' type='submit' value={"UPDATE MEMBER"} />
                    </div>
                </form>
            </section>
            <section>
                <div className='image-container rounded-lg sticky top-28'><img src={profileImage} alt='register' /></div>
            </section>
        </div>

    </div>
  )
}

export default UpdateMember