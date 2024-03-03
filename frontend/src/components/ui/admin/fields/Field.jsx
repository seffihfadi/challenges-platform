import { Link } from "react-router-dom"
import { COLORS } from "../../../../utils/helpers"

const Field = () => {
  return (
    <div className="field">
      <div className="after" style={{background: COLORS[0]}}></div>
      <h1 className='text-xl'>%53<span className='text-sm'>.32</span></h1>
      <span className='text-gray-500 text-sm'>21 Sep, 2024</span>
      <h2 className='text-lg capitalize mt-auto'>web<br /> development</h2>
      <div className="flex justify-between mt-3">
        <div className="flex">
          <div className="user">
            <div className="img">f</div>
          </div>
          <div className="user">
            <div className="img">s</div>
          </div>
          <div className="user">
            <div className="img">d</div>
          </div>
        </div>
        <Link to='/'><i className="uil uil-500px"></i></Link>
      </div>
    </div>
  )
}

export default Field