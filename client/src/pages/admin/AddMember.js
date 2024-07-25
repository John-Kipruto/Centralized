import { useContext, useState} from 'react'
import registerImg from '../../images/register.jpg'
import { fetchAllUsers } from '../../features/user/userSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import AppContext from '../../contexts/appContext'
import { toast } from 'react-toastify'

const AddMember = () => {
    const {apiURL} = useContext(AppContext)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        image: "",
        password: "",
        passwordConfirm: ""
    })
    
    function handleInputChange(event){
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        })
    }
    
    function handleFileInputChange(event){
        const fileSelected = event.target.files[0]
        setFormData({
            ...formData,
            image: fileSelected
        })
    }

    function resetFormData(){
        setFormData({
            name: "",
            email: "",
            phoneNumber: "",
            image: "",
            password: "",
            passwordConfirm: ""
        })
    }
    
    function registerUser(event){
        event.preventDefault()
        const profile = new FormData()
        profile.append("name", formData.name)
        profile.append("email", formData.email)
        profile.append("image", formData.image)
        profile.append("phoneNumber", formData.phoneNumber)
        profile.append("password", formData.password)

        if(formData.name === "" || formData.email === "" || formData.phoneNumber === "" || formData.password === ""){
            toast.error("Form fields cannot be empty")
        } else{
            const config = { headers: {'Content-Type': 'multipart/form-data'}, withCredentials: true}
    
            axios.post(`${apiURL}/users`, profile, config )
            .then(response => {
                
                dispatch(fetchAllUsers())
                toast.success("New user addded!")
                resetFormData()
            })
            .catch(error => console.log(error))
        }
      
    }
    
    return (
    <div className='content-container'>
        
        <div className=" grid lg:grid-cols-2 gap-5">
            <section className='rounded shadow py-4 px-2 bg-slate-100'>
            <h1 className='text-3xl font-bold p-1 text-center'>ADD NEW MEMBER</h1>
            <div className="text-9xl text-center"><i class="bi bi-person-fill-check"></i></div>
                <form className="grid" onSubmit={registerUser}>
                  
                    <div>
                        <label htmlFor="name">Name</label>
                        <input required placeholder="Member name" className='border rounded p-1' id="name" name="name" value={formData.name} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input required type="email" placeholder="Member email address" className='border rounded p-1' id="email" name="email" value={formData.email} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input required placeholder="Member phone number" className='border rounded p-1' id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="image">Profile Photo</label>
                        <input  type="file" accept="image/*" className='border rounded p-1' id="image" name="image"  onChange={handleFileInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input required type="password" placeholder="Member password" className='border rounded p-1' id="password" name="password" value={formData.password} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">Confirm password</label>
                        <input required type="password" placeholder="Member password" className='border rounded p-1' id="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <input onClick={registerUser}  className='bg-blue-800 text-white font-bold p-2 rounded' type='submit' value={"REGISTER"} />
                    </div>
                </form>
            </section>
            <section>
                <div className='image-container  bg-blue-500 sticky top-28'><img src={registerImg} alt='register' /></div>
            </section>
        </div>
    </div>
    )
}

export default AddMember