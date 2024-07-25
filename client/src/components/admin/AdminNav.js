import { Navbar, Nav, Offcanvas } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../features/appUser/appUserSlice"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import AppContext from "../../contexts/appContext"

const AdminNav = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {setLoggedInAdmin} = useContext(AppContext)

  function handleLogout(){
    dispatch(logoutUser())
    setLoggedInAdmin(null)
    navigate("/admin/signin")
  }

  return (
    <div className="admin-nav-container bg-slate-50 shadow rounded">
      <Navbar>
      <span className=""><Navbar.Brand><h2 className="font-bold text-teal-400">WELCOME ADMIN</h2></Navbar.Brand></span>
        <Navbar.Offcanvas>
          <Offcanvas.Body>
            <Nav>
              <Link to={""} className="p-2 rounded hover:bg-teal-400 hover:text-white"><span className="mr-1 text-2xl"><i class="bi bi-speedometer"></i></span> Dashboard</Link>
              <Link to={"member-list"} className="p-2 rounded hover:bg-teal-400 hover:text-white"><span className="mr-1 text-2xl"><i class="bi bi-people-fill"></i></span> Member List</Link>
              <Link to={"add-member"} className="p-2 rounded hover:bg-teal-400 hover:text-white"><span className="mr-1 text-3xl"><i class="bi bi-person-fill-add"></i></span> Add Member</Link>
              <Link className="p-2 rounded hover:bg-teal-400 hover:text-white" onClick={handleLogout}><span className="mr-1 text-2xl"><i class="bi bi-arrow-left-square"></i></span>Logout</Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
    </div>
  )
}

export default AdminNav