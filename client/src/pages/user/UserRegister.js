import { Link, Navigate } from "react-router-dom"
import { useState } from "react"
import registrationImg from '../../images/mobile-login.jpg'
import { registerUserWithProfilePhoto, registerUserWithoutProfilePhoto } from "../../features/appUser/appUserSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

const UserRegister = () => {

  const appUser = useSelector(state => state.appUser)
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

    /** Check if any input is empty */
    if(formData.name === "" || formData.email === "" || formData.phoneNumber === "" || formData.password === ""){
        toast.error("Input fields cannot be empty")
    } else{
        /** Confirm if passwords match */
        if(formData.password !== formData.passwordConfirm){
            toast.error("Passwords do not match")
        } else{

            if(formData.image !== ""){
                dispatch(registerUserWithProfilePhoto(profile))
            } else{
                dispatch(registerUserWithoutProfilePhoto(formData))
            } 

            resetFormData()
        }
    }
     
}

return (
<div className='content-container'>
    
    <div className=" grid lg:grid-cols-2 gap-5">
        <section className='rounded shadow py-4 px-2 bg-blue-100'>
        <h1 className='text-3xl font-bold p-1 text-center'>LET'S GET YOU SIGNED UP !</h1>
        <div className="text-9xl text-center"><i class="bi bi-person-fill-check"></i></div>
            <form className="grid" onSubmit={registerUser}>
              
                <div>
                    <label htmlFor="name">Name</label>
                    <input required placeholder="Your name" className='border rounded p-1' id="name" name="name" value={formData.name} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input required type="email" placeholder="Your email address" className='border rounded p-1' id="email" name="email" value={formData.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone number</label>
                    <input required placeholder="Your phone number" className='border rounded p-1' id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="image">Profile Photo</label>
                    <input  type="file" accept="image/*" className='border rounded p-1' id="image" name="image"  onChange={handleFileInputChange}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input required type="password" placeholder="Your password" className='border rounded p-1' id="password" name="password" value={formData.password} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="passwordConfirm">Confirm password</label>
                    <input required type="password" placeholder="Your password" className='border rounded p-1' id="passwordConfirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleInputChange}/>
                </div>
                <div>
                    <input onClick={registerUser}  className='bg-blue-800 text-white font-bold p-2 rounded' type='submit' value={"REGISTER"} />
                </div>
            </form>
            <div>
              <p className="text-center mt-4">Already registered ? <span className="text-lg font-bold"><Link to={"/user"}>Sign In</Link></span></p>
            </div>
        </section>
        <section>
            <div className='image-container  bg-blue-500 sticky top-28'><img src={registrationImg} alt='register' /></div>
        </section>
    </div>

    <div>
        {!appUser.loading && appUser.user ? <div><Navigate to={"/"}/></div> : null}
    </div>
</div>
)
}

export default UserRegister