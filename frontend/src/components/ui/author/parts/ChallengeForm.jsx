import { useDispatch, useSelector } from "react-redux"
import { setAlert } from "../../../../features/ui/alertSlice"
import { useState } from "react"
import { useCreateChallengeMutation, useUpdateChallengeMutation } from "../../../../features/challenge/challengeSlice"
import { selectCurrentUser } from "../../../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"



const ChallengeForm = ({type, data}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {field: authorField} = useSelector(selectCurrentUser)
  // console.log('field', field)
  const [fileExists, setFileExists] = useState(false)
  const [createChallenge, {isCreateLoading}] = useCreateChallengeMutation()
  const [updateChallenge, {isUpdateLoading}] = useUpdateChallengeMutation()
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {desc, mark, maxSubmittions, name, assignment} = Object.fromEntries(formData)

    if(!desc || !mark || !maxSubmittions || !name) {
      dispatch(setAlert(['Fill in required fields', 'error']))
      return
    }

    if(type === 'create' && assignment.size === 0) {
      dispatch(setAlert(['Please upload a pdf file', 'error']))
      return
    }

    const challengeData = new FormData()

    challengeData.append('challengeName', name);
    challengeData.append('description', desc);
    challengeData.append('mark', mark);
    challengeData.append('maxSubmittions', maxSubmittions);
    challengeData.append('field', authorField);
    challengeData.append('assignment', assignment);

    if (type === 'create') {

      await createChallenge(challengeData)
        .unwrap()
        .then((payload) => {
          dispatch(setAlert([payload.message, 'success']))
          navigate('/author/challenges', {replace: true})
        }) 
        .catch((error) => dispatch(setAlert([error.data.message, 'error'])))

    } else {

      await updateChallenge({description: desc, mark, maxSubmittions, challengeName: name, chaID: data?._id})
        .unwrap()
        .then((payload) => {
          dispatch(setAlert([payload.message, 'success']))
          navigate('/author/challenges', {replace: true})
        }) 
        .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
    }

      

  }
  return (
    
    <div className="md:w-[550px] w-full max-w-md p-2">
      <div className="flex flex-col mb-10">
        <h1 className="text-3xl mb-5 purple_gradient">{type} Challenge</h1>
        <p>{type} 
          <span className="purple_gradient font-bold capitalize">
            {type === 'Create' ? ' a new ' : ` the ${data?.name} ` }
          </span>
          challenge
        </p>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="group glass">
          <input defaultValue={data?.name} id="name" name="name" type="text" required />
          <label htmlFor="name">name</label>
        </div>
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-2 group glass">
            <input defaultValue={data?.mark} id="mark" min={0} name="mark" type="number" required />
            <label htmlFor="mark">mark</label>
          </div>
          
          <div className="col-span-3 group glass">
            <input defaultValue={data?.maxSubmittions} id="maxSubmittions" min={0} name="maxSubmittions" type="number" required />
            <label htmlFor="maxSubmittions">max submissions</label>
          </div>
        </div>
        <div className="group glass">
          <textarea defaultValue={data?.description} id="desc" name="desc" rows={4} type="text" required ></textarea>
          <label htmlFor="desc">description</label>
        </div>
        {type === 'Create' &&
        <div className="mb-8">
          <input onChange={() => setFileExists(true)} hidden id="assignment" name="assignment" type="file" accept="application/pdf" required />
          <label className={`down text-sm capitalize glass ${fileExists && 'green'}`} htmlFor="assignment">
            <i className="uil uil-cloud-upload mr-3 text-[20px]"></i>
            upload assignment
          </label>
        </div>
        }
        
        
        <div className="flex justify-end items-center">
          {/* <Link to='/signup'>or Sign up</Link> */}
          <button disabled={isUpdateLoading || isCreateLoading}>{type}</button>
        </div>
      </form>
    </div>
  )
}

export default ChallengeForm