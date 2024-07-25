import { useContext } from "react"
import AppContext from "../contexts/appContext"
import { Link } from "react-router-dom"


const NotFound = () => {

  const {loggedInUser} = useContext(AppContext)
  console.log("Not found", loggedInUser)
  return (
    <div className="content-container text-center grid align-items-center">
        <h1 className="text-9xl font-bold text-red-400">404</h1>
        <h1 className="text-5xl font-bold">OOPS! PAGE NOT FOUND</h1>
        <p className="mt-2 mb-3">Sorry, the page you are looking for doesn't exist. If you think something is broken report a problem.</p>
        <p>
          <Link to={'/'} className="p-2 rounded-lg bg-blue-500 font-bold text-white shadow">RETURN HOME</Link>
        </p>
    </div>
  )
}

export default NotFound