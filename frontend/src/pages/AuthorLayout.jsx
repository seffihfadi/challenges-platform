import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useDispatch } from "react-redux"
import { setHeaderType } from "../features/ui/headerSlice"

const ParticipantLayout = () => {
  const dispatch = useDispatch()
  dispatch(setHeaderType('author'))

  return (
    
    <div className="partic">
      <Header />
      <main>
        <div className="container">
          <Outlet />  
        </div>
      </main>
    </div>

  )
}

export default ParticipantLayout