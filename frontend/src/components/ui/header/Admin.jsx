import { NavLink } from "react-router-dom"

const Admin = () => {
  return (
    <div className="links">
      <NavLink to='/dashboard/home'>Home</NavLink>
      <NavLink to='/dashboard/fields'>Fields</NavLink>
      <NavLink to='/dashboard/participants'>Participants</NavLink>
      <NavLink to='/dashboard/settings'>Settings</NavLink>
    </div>
  )
}

export default Admin