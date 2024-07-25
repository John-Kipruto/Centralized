import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import AppContext from "../../contexts/appContext"
import axios from "axios"
import adminSignInImg from '../../images/7140739_3515462.jpg'

const AdminSignIn = () => {

    const navigate = useNavigate()
    const {loggedInAdmin, setLoggedInAdmin, apiURL} = useContext(AppContext)

    const [formData, setFormData] = useState(
        {
          email: "",
          password: ""
        }
      )
    
      function handleSignIn(event){
        event.preventDefault()
    
       axios.post(`${apiURL}/auth/login`, formData, {withCredentials: true})
        .then(response => {
          setLoggedInAdmin({name: "Admin"})
          console.log(response)
          navigate("/admin")
        })
        .catch(error => console.log(error))

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
        <>
        {
          loggedInAdmin ? <Navigate to="/admin" /> :
          <div className="admin-signin grid-container content-container">

          <section className="admin-form-container rounded bg-teal-100 font-bold shadow">
            <div>
              <h1 className="text-2xl font-bold">WELCOME BACK ADMIN !</h1>
    
              <form onSubmit={handleSignIn}>
                <div>
                  <label htmlFor="email">Email</label>
                  <input className="border rounded p-1" placeholder="Admin email" type="email" name="email" id="email" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input className="border rounded p-1" placeholder="Admin password" type="password" name="password" id="password" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                  <input className="bg-teal-700 text-white font-bold rounded-lg" onClick={handleSignIn}  type="submit" value={"Sign In"} />
                </div>
              </form>
            </div>
          </section>

          <section>
            <div className="image-container"><img src={adminSignInImg} alt="admin signin" /></div>
          </section>
          
        </div>
        }
        </>
      )
}

export default AdminSignIn