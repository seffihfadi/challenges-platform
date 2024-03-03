
const AddField = () => {
  return (
    <div className="sign h-[calc(100vh-6rem)]">
      <div className="flex w-full justify-center items-center">
        <div className="md:w-[400px] w-full max-w-md p-2">
          <div className="flex flex-col mb-10">
            <h1 className="head_text text-3xl">Create Field</h1>
            <p>Create a {' '} <span className="purple_gradient font-bold">Devlast </span>challenges field and enhance your creativity</p>
          </div>
          <form noValidate>
            <div className="group glass">
              <input id="name" name="name" type="text" required />
              <label htmlFor="name">field name</label>
            </div>
            <div className="group glass">
              <input defaultValue={new Date().toISOString().slice(0, 16)} id="startsin" name="startsin" type="datetime-local" required />
              <label htmlFor="startsin">starts in</label>
            </div>
            <div className="group glass">
              <input defaultValue={new Date().toISOString().slice(0, 16)} id="endsin" name="endsin" type="datetime-local" required />
              <label htmlFor="endsin">ends in</label>
            </div>
            <div className="flex justify-between items-center">
              {/* <Link to='/signup'>or Sign up</Link> */}
              <button>Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddField