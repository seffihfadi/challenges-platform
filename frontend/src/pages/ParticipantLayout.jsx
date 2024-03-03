import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useDispatch, useSelector } from "react-redux"
import { setHeaderType } from "../features/ui/headerSlice"
import { loading } from "../features/ui/headerSlice"

const ParticipantLayout = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(loading)
  dispatch(setHeaderType('participant'))

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