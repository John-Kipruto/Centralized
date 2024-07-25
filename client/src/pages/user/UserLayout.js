import { Outlet } from "react-router-dom"
import { UserNav } from "../../components/user"

const UserLayout = () => {
  return (
    <div>

        <section>
          <UserNav />
        </section>
        
        <section>
            <Outlet />
        </section>
    </div>
  )
}

export default UserLayout