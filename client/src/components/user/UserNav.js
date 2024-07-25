import {Navbar, Nav, Offcanvas} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { logoutUser } from '../../features/appUser/appUserSlice'
import { useDispatch, useSelector } from 'react-redux'

const UserNav = () => {
  const appUser = useSelector(state => state.appUser)
  const dispatch = useDispatch()

  function handleUserLogout(){
   dispatch(logoutUser())
  }

  return (
    <Navbar className='bg-blue-100'>
      <Navbar.Brand><h2 className='m-auto text-2xl font-bold'>CENTRALIZED</h2></Navbar.Brand>
      <Navbar.Offcanvas>
        <Offcanvas.Body>
          <Nav className='me-auto m-auto'>
            {appUser.user ? 
            <>
              <Nav.Item><Link className='ml-7 flex items-center' to={"/user"}><span className='text-3xl mr-1'><i class="bi bi-person-check-fill"></i></span> Profile</Link></Nav.Item>
              <Nav.Item><Link className='ml-7 flex items-center' onClick={handleUserLogout}>Logout<span className='text-2xl'><i class="bi bi-box-arrow-in-right"></i></span></Link></Nav.Item>
            </> 
            : 
            <>
              <Nav.Item><Link className='ml-7 flex items-center' to={"/user"}>Login <span className='text-xl ml-1'><i class="bi bi-arrow-right-square"></i></span></Link></Nav.Item>
              <Nav.Item><Link className='ml-7 flex items-center' to={"/user/auth/register"}>Register<span className='text-2xl'><i class="bi bi-box-arrow-in-right"></i></span></Link></Nav.Item>
            </>}
            
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Navbar>
  )
}

export default UserNav