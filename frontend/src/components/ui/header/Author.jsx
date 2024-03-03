import { NavLink } from "react-router-dom"


const Author = () => {
  return (
    <div className="links">

      <NavLink to='/author/challenge/create'>
        <i className="uil uil-plus-circle mr-2 text-[18px]"></i>
        Create
      </NavLink>
      <NavLink to='/author/' end>Home</NavLink>
      <NavLink to='/author/challenges'>Challenges</NavLink>
    </div>
  )
}

export default Author