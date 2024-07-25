import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const RootLayout = () => {
    const appUser = useSelector(state => state.appUser)
   
    if(appUser.user){
      return (
        <>
            <Navigate to={'/user'} replace={true} />
            <section>
                <Outlet />
            </section>
        </>
      )
    }
      
    return(
      <>
        <Navigate to={'/user/auth'} replace={true} />
      </>
    )
  
}

export default RootLayout