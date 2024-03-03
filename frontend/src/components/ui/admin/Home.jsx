import { selectCurrentUser } from "../../../features/auth/authSlice"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
const Home = () => {
  const user = useSelector(selectCurrentUser)
  console.log('user', user)
  return (
    <div className='flex flex-col justify-center h-[calc(100vh-100px)]'>
      <div className="grid grid-cols-12">

        <div className="col-span-7 flex flex-col justify-center">
          <h1 className='text-4xl capitalize'>welcome, <span className="purple_gradient">{user.fullname}</span>.</h1>
          <p className="text-xl my-6 max-w-3xl">
          We appreciate your active participation in these challenges and sincerely 
          hope that you are successfully accepted. <Link to={'/'} className="purple_gradient border-b-2 border-[#fff]">Activating</Link> your account is 
          a crucial criterion in our selection process, and we encourage you 
          to proceed with the activation at your earliest convenience. 
          Best of luck in your endeavors. 
          </p>
          <p className="text-lg max-w-3xl mb-6"><span className="purple_gradient capitalize">{user.fullname}</span>, registered for <span className="purple_gradient">Devlast</span> challenges on <span className="purple_gradient">{Date(user.createdAt).toString()}</span></p>
          <span className="status pending welcome">pending</span>
        </div>
        <div className="col-span-5">
          <img src="/undra.svg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home