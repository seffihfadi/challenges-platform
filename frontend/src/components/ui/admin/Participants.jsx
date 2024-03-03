import Field from "./fields/Field"
const Participants = () => {
  return (
    <div className="gap-6 grid grid-cols-8">
      <div className="col-span-8">
        <h1 className="admin_head_text">our fields <span className="bg-orange-500 px-4 rounded-full">5</span></h1>
      </div>
      {[1, 2, 3, 4].map((i) =>
        <div key={i} className="col-span-2">
          <Field />
        </div>
       )}

      <div className="col-span-8">
        <h1 className="admin_head_text">participants</h1>
      </div>
      
      <div className="col-span-8">
        <div className="relative border-[#353535] overflow-hidden my-5 border-2 rounded-xl shadow-md">
          <div className="flex items-center justify-between mx-3 p-2 border-[#353535] border-b-2">
   
            <div className="search">
              <input 
                type="text" 
                name='search'
                className='glass' 
                placeholder='Search'
              />
            </div>
    
          </div>
          <div className="overflow-x-auto">

            <table className="w-full text-sm text-left rtl:text-right">
              <thead className="text-xs uppercase">
                <tr>
                  <th scope="col" className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4"
                      />
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Field
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="bg-glass border-gray-500 rounded"
                      />
                    </div>
                  </td>
                  <th>
                    <div className="user">
                      <div className="img">s</div>
                      <div className="name">
                        <span>seffih fadi</span>
                        <p>seffih@gamil.com</p>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">Web Development</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2" />{" "}
                      Valid
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 items-center">
                      <i className="uil uil-award text-[22px]"></i>
                      Author
                    </div>
                  </td>
                  <td className="px-6 py-4">25
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Participants