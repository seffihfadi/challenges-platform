import { getFirstLetter } from "../utils/helpers"
import { selectCurrentUser } from "../features/auth/authSlice"
import { useSelector } from "react-redux"
import { useSignoutMutation } from "../features/auth/authApiSlice"
import { useNavigate, useLocation } from "react-router-dom"


const Signout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector(selectCurrentUser)
  const [signOut] = useSignoutMutation()

  const handleSignout = async () => {
    await signOut()
    navigate('/signin', { state: { from: location }, replace: true })
  }

  return (
    <div className="user">
      <div className="img logout">
        <span>{getFirstLetter(user.fullname)}</span>
        <button onClick={handleSignout} title="signout" className="hidden"><i className="uil uil-sign-out-alt"></i></button>
      </div>
      <div className="hidden md:flex">
        <span>Hi, <span className='text-gray-500 capitalize'>{user.fullname}</span></span>
      </div>
    </div>
  )
}

export default Signout