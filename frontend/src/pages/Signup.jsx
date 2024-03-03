import { Link } from "react-router-dom"
const Signup = () => {
  return (
    <div className="sign">
      {/* <div className="video">
        <img className="h-screen object-cover" src="/bg.jpg" alt="" />
        <div className="absolute top-6 left-4">
          <img className="w-12" src="/vite.svg" alt="" />
        </div>
      </div>
      <div className="const"></div> */}
      <div className="flex w-full justify-center items-center">
        <div className="md:w-[400px] w-full max-w-md p-2">
          <div className="flex flex-col items-center mb-10">
            <img className="w-28 md:hidden" src="/vite.svg" alt="" />
            <h1 className="head_text text-3xl">sign up</h1>
            <p className="text-gray-500 text-center">Join a community, connect, share, and engage with others through posts and reactions.</p>
          </div>
          <form noValidate>
            <div className="group glass">
              <input id="fullname" name="fullname" type="text" required />
              <label htmlFor="fullname">full name</label>
            </div>
            <div className="group glass">
              <input id="email" name="email" type="email" required />
              <label htmlFor="email">gmail</label>
            </div>
            <div className="group glass">
              <input id="password" name="password" type="password" required />
              <label htmlFor="password">password</label>
            </div>
            <div className="group glass">
              <textarea id="motivation" name="motivation" rows={4} required ></textarea>
              <label htmlFor="motivation">motivation</label>
            </div>
            <div className="group glass">
              <select name="field" id="field" required>
                <option value='web'>web development</option>
                <option value='cybersecurity'>cyber security</option>
                <option value='ai'>AI development</option>
                <option value='mobile'>mobile development</option>
              </select>
              <label htmlFor="field">join field</label>
            </div>
            <div className="flex justify-between items-center">
              <Link to='/signin'>or Sign in</Link>
              <button>Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup