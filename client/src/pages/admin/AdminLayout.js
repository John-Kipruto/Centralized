import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import AppContext from "../../contexts/appContext"
import { AdminNav } from "../../components/admin"
import './admin.css'

const AdminLayout = () => {

  const {loggedInAdmin} = useContext(AppContext)

  if(loggedInAdmin){
    return (
      <div className="admin-nav-outlet">
          <section>
            <AdminNav />
          </section>
          <section className="admin-outlet">
              <Outlet />
          </section>
      </div>
    )
  }

  return(
    <>
      {
        <Navigate to={"/admin/signin"} replace={true} />
      }
    </>
  )
  
}

export default AdminLayout