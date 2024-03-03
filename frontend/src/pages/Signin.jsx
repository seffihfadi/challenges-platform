import { Link, useNavigate } from "react-router-dom"
import { useSigninMutation } from "../features/auth/authApiSlice"
import { useDispatch } from "react-redux"
import { setAlert } from '../features/ui/alertSlice'
import AlertModel from "../components/AlertModel"
// import { toast, ToastContainer } from "react-toastify"

const Signin = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [signin, { isLoading }] = useSigninMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {email, password} = Object.fromEntries(formData)
    if(!email || !password) {
      dispatch(setAlert(['Fill in required fields', 'error']))
      return
    }

    await signin({ email, password })
      .unwrap()
      .then((payload) => {
        dispatch(setAlert([payload.message, 'success']))
        navigate('/partic/fields')

      })
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
      
  }

  return (
    <div className="sign h-screen">
      <AlertModel />
      <div className="flex w-full justify-center items-center">
        <div className="md:w-[400px] w-full max-w-md p-2">
          <div className="flex flex-col items-center mb-10">
            <img className="w-28 md:hidden" src="/vite.svg" alt="" />
            <h1 className="head_text text-3xl">sign in</h1>
            <p>Welcome Back To {' '} <span className="purple_gradient font-bold">devlast</span></p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="group glass">
              <input id="email" name="email" type="email" required />
              <label htmlFor="email">gmail</label>
            </div>
            <div className="group glass">
              <input id="password" name="password" type="password" required />
              <label htmlFor="password">password</label>
            </div>
            <div className="flex justify-between items-center">
              <Link to='/signup'>or Sign up</Link>
              <button disabled={isLoading}>Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin