import { useEffect, useState } from "react"
import {Bar} from 'react-chartjs-2'
import avatarImg from '../../images/androgynous-avatar-non-binary-queer-person.jpg'
import { Buffer } from "buffer"
import { useSelector, useDispatch } from "react-redux"
import { updateUserWithNewProfilePhoto, updateUserWithOldProfilePhoto } from "../../features/appUser/appUserSlice"
import { toast } from "react-toastify"

const Profile = () => {
  const dispatch = useDispatch()
  const appUser = useSelector((state) => state.appUser)
  const [formData, setFormData] = useState({...appUser.user,
    oldPassword: appUser.user.password,
    newPassword: "",
    newPasswordConfirm: "",
    image: appUser.user.image.data
  })
  
  const [newImageIsSelected, setNewImageIsSelected] = useState(false)


  /** Photo to display on the user's profile section */
  const [profilePhoto, setProfilePhoto] = useState()


  /** Handle form input change */
  function handleChange(event){
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    })
  }

  function handleFileSelected(event){
    const fileSelected = event.target.files[0]
    setNewImageIsSelected(true)
    setProfilePhoto(URL.createObjectURL(fileSelected))
    setFormData({
      ...formData,
      image: fileSelected
    })
}

  function updateUserProfile(event){
    event.preventDefault()
    const profile = new FormData()
    profile.append("name", formData.name)
    profile.append("email", formData.email)
    profile.append("password", formData.oldPassword)
    profile.append("image", formData.image)
    profile.append("id", formData.id)

    /** Check if passwords match */
    if(formData.newPassword !== formData.newPasswordConfirm){
      toast.error("New password does not match the confirm password")

    } else{
      /** Check if new profile image is selected */
      if(newImageIsSelected){

        dispatch(updateUserWithNewProfilePhoto(profile))
      } else{
          dispatch(updateUserWithOldProfilePhoto(formData))
      }
    }
    
  }

  useEffect(() => {
    if(appUser.user.image.data){
      setProfilePhoto(`data:image/*;base64,${Buffer.from(appUser.user.image.data, "binary").toString("base64")}`)
    }
    console.log(appUser.user)
    
  }, [appUser.user])


  return (
    <div className="profile content-container">

      <dvi className="summary">
        <div className="background-image-container rounded-xl "></div>
        <div className="photo-section rounded-xl bg-slate-100">
          <div className="profile-photo p-2">
            {
              appUser.user.image ? 
                <img src={profilePhoto} alt={appUser.user.name} />
               : 
               <img src={avatarImg} alt="avatar" />
            }
          </div>
          <div className="profile-info grid-container">
            <div>
              <h1 className="text-2xl font-bold">{appUser.user.name.toUpperCase()}</h1>
              <p>Profession Description</p>
            </div>
            <div>
              <h1 className="text-xl font-bold flex items-baseline"><span className="text-5xl text-red-500 mr-2"><i class="bi bi-credit-card-2-back-fill"></i></span>My Subscription</h1>
              <p>Your account was created on: {appUser.user.createdAt} </p>
            </div>
          </div>
        </div>
      </dvi>

      <div className="stats-contact-info grid-container">
        <section className="contact-stats rounded shadow bg-slate-100 text-center p-3">
          <div >
            <h1 className="text-2xl font-bold text-gray-600">My Contact Info.</h1>
            <form onSubmit={updateUserProfile} className="text-start">
              <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="name" ><span className="text-3xl text-green-600 mr-2"><i class="bi bi-info-square-fill"></i></span>Name</label>
                <input className="p-2 m-t-1 border border-gray-300 rounded"  type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              </span>
              <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="email"><span className="text-3xl text-blue-600 mr-2"><i class="bi bi-envelope-at-fill"></i></span>Email</label>
                <input className="p-2 m-t-1 border border-gray-300 rounded"  type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              </span>
              <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="phoneNumber"><span className="text-3xl text-yellow-600 mr-2"><i class="bi bi-headset"></i></span>Phone Number</label>
                <input className="p-2 m-t-1 border border-gray-300 rounded"  type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </span>
              <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="newProfilePhoto"><span className="text-3xl text-yellow-600 mr-2"><i class="bi bi-cloud-arrow-up-fill"></i></span>Update My Profile Image</label>
                <input className="p-2 m-t-1 border border-gray-300 rounded" type="file" accept="image/*" id="newProfilePhoto" name="newProfilePhoto"   onChange={handleFileSelected} />
              </span>
              {/* <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="oldPassword"><span className="text-3xl text-lime-600 mr-2"><i class="bi bi-key-fill"></i></span>Old Password</label>
                <input className="p-2 m-t-1 border border-gray-300 rounded" placeholder="Leave blank to keep old password"  type="password" id="oldPassword" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
              </span> */}
              <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="newPassword"><span className="text-3xl text-violet-600 mr-2"><i class="bi bi-key-fill"></i></span>New Password</label>
                <input className="p-2 m-t-1 border border-gray-300 rounded" placeholder="Leave blank to keep old password" type="password" id="newPassword" name="newPassword" value={formData.newPassword} onChange={handleChange} />
              </span>
              <span className="py-2 grid grid-cols-2">
                <label className="py-1 text-md font-bold flex items-center" htmlFor="newPasswordConfirm"><span className="text-3xl text-violet-600 mr-2"><i class="bi bi-key-fill"></i></span>Confirm New Password </label>
                <input className="p-2 m-t-1 border border-gray-300 rounded" placeholder="Leave blank to keep old password" type="password" id="newPasswordConfirm" name="newPasswordConfirm" value={formData.newPasswordConfirm} onChange={handleChange} />
              </span>
              
              
              <div>
                <input onClick={updateUserProfile} className="bg-blue-700 rounded-lg text-white" type="submit" value={"Update My Profile"} />
              </div>
            </form>
          </div>
        </section>
        <section className="rounded shadow bg-slate-100 py-3">
          <h1 className="text-2xl font-bold text-slate-500 text-center">My Activities Summary</h1>
          <div className="chart-container">
           <Bar
            data={{
              labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
              datasets: [
                {
                  label: "My Activities",
                  data: [3, 4, 6, 5, 7, 3, 9],
                  barThickness: 20,
                  backgroundColor: "blue"
                },
                
              ],
            
            
            }}
            options={{
            
            }}
            
            />
          </div>
        </section>
      </div>
  
      <div>
        {appUser.loading ? toast.info("Updating your profile!") : null}
      </div>
    </div>
  )
}


export default Profile