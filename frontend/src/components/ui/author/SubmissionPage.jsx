import Linkify from 'react-linkify';
import { useGetSubmissionQuery } from '../../../features/submission/submissionSlice';
import { useParams } from 'react-router-dom';
import Loader from '../../Loader';
import TimeAgo from 'timeago-react';
import { getFirstLetter } from '../../../utils/helpers';
import { useEvaluateSubmissionMutation } from '../../../features/submission/submissionSlice';
import { setAlert } from '../../../features/ui/alertSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ResponsesSection } from '../partic/parts/ResponsesSection';

const SubmissionPage = () => {
  const { subID }= useParams()
  const dispatch = useDispatch()
  const [decision, setDecision] = useState('')
  const { data: submission, isLoading: submissionLoading } = useGetSubmissionQuery(subID)
  const [evaluateSubmission, { isLoading }] = useEvaluateSubmissionMutation()
  const navigate = useNavigate()


  // console.log('submission', submission)
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const {mark, hint} = Object.fromEntries(formData)
    // console.log('dt', parseInt(mark || 0))
    // console.log('decision', decision)
    if(decision === 'accepted' && parseInt(mark || 0) <= 0) {
      dispatch(setAlert(['Fill in required fields', 'error']))
      return
    }
    await evaluateSubmission({ subID, decision, points: mark, hint })
      .unwrap()
      .then((payload) => {
        dispatch(setAlert([payload.message, 'success']))
        navigate('/author/challenges', {replace: true})
      })
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))

  }

  if(submissionLoading) return <Loader msg='loading sub' />
  return (

    <div className="my-10 grid grid-cols-12">
      <div className="col-span-12 lg:col-span-8 lg:border-r-[1px] border-[#353535] px-3">
        <h1 className="text-3xl my-3 purple_gradient capitalize">{submission.challenge.name}</h1>
        <span className='text-gray-500 capitalize'><TimeAgo datetime={submission.createdAt} /></span>
        <Linkify properties={{target: '_blank'}}>
          <p className="text-lg my-6 link">{submission.submittion}</p>
        </Linkify>
        <div className="flex flex-wrap gap-3 my-3">
          <div className="tag">
            <div className="user">
              <div className="img sm">{getFirstLetter(submission.participent.fullname)}</div>
            </div>
            {submission.participent.fullname}
          </div>
          <div className="tag">
            <i className="uil uil-list-ol mr-3 text-[20px]"></i>
            6th
          </div>
          <div className="tag">
            <i className="uil uil-arrow-growth mr-3 text-[20px]"></i>
            560pts
          </div>
        </div>
        
      </div>
      <div className="col-span-12 lg:col-span-4 my-10 md:my-0 px-3 challenge-area">
        <h1 className="text-2xl my-3 purple_gradient capitalize">old submissions</h1>
        <ResponsesSection submissions={[submission]} />

        
      </div>
      <div className="col-span-12 lg:col-span-5 xl:col-span-4">
        <h1 className="text-2xl my-3 purple_gradient capitalize">decision</h1>
        <form onSubmit={handleSubmit} className='w-full my-6' noValidate>
          <div className="group glass">
            <input id="mark" min={0} name="mark" type="number" required />
            <label htmlFor="mark">mark</label>
          </div>
          <div className="group glass">
            <textarea id="hint" name="hint" rows={5} required ></textarea>
            <label htmlFor="hint">hint</label>
          </div>
          <div className="flex justify-end gap-3 items-center">
            <button disabled={isLoading} onClick={() => setDecision('rejected')} className="tag danger">
              <i className="uil uil-x mr-3 text-[20px]"></i>
              reject
            </button>
            <button disabled={isLoading} onClick={() => setDecision('accepted')} className="tag success">
              <i className="uil uil-check-circle mr-3 text-[20px]"></i>
              accept
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default SubmissionPage

{/* <div className="user flex-col">
          <div className="img grand">s</div>
          <div className="name items-center">
            <span className='text-lg'>seffih fadi</span>
            <p>seffih@gamil.com</p>
          </div>
        </div>
        <div className="flex my-5">
          <h1 className='text-4xl font-bold text-green-500'>
            6
            <span className='text-lg'>th</span>{' '}
            <span className='text-gray-500 text-xl'>(530pts)</span>
          </h1>
        </div> */}