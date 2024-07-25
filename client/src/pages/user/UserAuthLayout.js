import { Navigate, Outlet } from "react-router-dom"
import UserNav from "../../components/user/UserNav"
import { useSelector } from "react-redux"

const UserAuthLayout = () => {
  const appUser = useSelector(state => state.appUser)
  return (
    <> {
      appUser.user ? <Navigate to={"/user"} /> : 
      <div>
        <UserNav />
        <section>
            <Outlet />
        </section>
      </div>
    }
    
    </>
    
  )
}

export default UserAuthLayout