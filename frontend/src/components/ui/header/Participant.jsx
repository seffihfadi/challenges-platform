import { NavLink } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../features/auth/authSlice"

const Participant = () => {
  const user = useSelector(selectCurrentUser)
  return (
    <div className="links">
      <NavLink to='/partic/fields'>Fields</NavLink>
      <NavLink to={`/partic/field/${user.field}/challenges`}>My Challenges</NavLink>
      <NavLink to={`/partic/field/${user.field}/board`}>My Board</NavLink>

    </div>
  )
}

export default Participant