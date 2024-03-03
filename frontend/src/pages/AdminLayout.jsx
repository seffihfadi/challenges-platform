import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import Header from "../components/Header"

const AdminLayout = () => {
  return (
    <div className="admin">
      <Header />
      <main>
        <Suspense fallback={'goog'}>
          <div className="container">
            <Outlet />    
          </div>
        </Suspense>
      </main>
    </div>
  )
}

export default AdminLayout