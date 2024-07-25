import {  useState } from "react"
import {  Link, Navigate } from "react-router-dom"
import './user.css'
import loginImg from '../../images/login-conept.jpg'
import { useDispatch, useSelector } from "react-redux"
import { loginAppUSer} from "../../features/appUser/appUserSlice"
import { toast } from "react-toastify"

const UserSignIn = () => {

  const appUser = useSelector((state) => state.appUser)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState(
    {
      email: "",
      password: ""
    }
  )

  function handleSignIn(event){
    event.preventDefault()
    dispatch(loginAppUSer(formData))
    /** Clear the form */
    setFormData(
      {
        email: "",
        password: ""
      }
    )
  }

  function handleChange(event){
    setFormData(
      {
        ...formData,
        [event.target.id]: event.target.value
      }
    )
  }

  return (
    <div className="user-signin-login content-container ">
      <div className="grid-container">
        <section className="form-container bg-blue-100 font-bold rounded shadow">
          <div>
            <form onSubmit={handleSignIn}>
              <div className="text-8xl text-center"><i class="bi bi-person-circle"></i></div>
              <h1 className="text-3xl font-bold">WELCOME BACK!</h1>
              <div>
                <label htmlFor="email">Email</label>
                <input className="p-1 border rounded" placeholder="Your email address" type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input className="p-1 border rounded" placeholder="Your password" type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
              </div>
              <div>
                <input className="bg-blue-700 text-white rounded-md" onClick={handleSignIn} type="submit" value={"Sign In"} />
              </div>
            </form>

            <div >
              <p className="my-30">Don't have an account ? <span className="text-slate-700"><Link to={"/user/auth/register"}>Register here</Link></span></p>
            </div>
          </div>
          
        </section>
        <section>
          <div className="image-container"><img src={loginImg} alt="login" /></div>
        </section>
      </div>


      {/**Usedispatch test */}
      {appUser.loading && <div>Loading...</div>}
      {!appUser.loading && appUser.user ? <Navigate to={'/user'} /> : null}
      
    </div>
  )

  
}

export default UserSignIn