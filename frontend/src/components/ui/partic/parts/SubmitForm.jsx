import { useCreateSubmissionMutation } from "../../../../features/submission/submissionSlice";
import { useDispatch } from "react-redux";
import { setAlert } from "../../../../features/ui/alertSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

export const SubmitForm = ({mySub, maxSub}) => {
  const dispatch = useDispatch()
  const { challengeID } = useParams()
  const [subText, setSubText] = useState('')

  const [createSubmission, { isLoading }] = useCreateSubmissionMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = subText
    setSubText('')
    await createSubmission({ challengeID, submission })
      .unwrap()
      .then((payload) => dispatch(setAlert([payload.message, 'success'])))
      .catch((error) => dispatch(setAlert([error.data.message, 'error'])))
  }


  return (
    <form onSubmit={handleSubmit} className="lg:w-9/12 mr-5 my-8" noValidate>
      <div className="group glass">
        <textarea onChange={(e) => setSubText(e.target.value)} className="w-full" value={subText} placeholder="Explore live examples at tasti.github.io/react-linkify/ for a seamless user experience." name="submission" id="sub" rows="7"></textarea>
        <label htmlFor="sub">write you answer</label>
      </div>
      <div className="flex justify-between items-center">
        {maxSub - mySub === 0 
        ? 
          <p>You can't submit any more</p>
        :
          <p>
            You still have a {' '} 
            <span className="purple_gradient font-bold">{maxSub - mySub} from {maxSub} submissions </span>
          </p>
        }
        <button disabled={isLoading} className="purple_gradient_bg ml-auto rounded-lg px-5 py-1.5">Submit</button>
      </div>
    </form>
  );
};




 // try {
      // const formData = new FormData(e.currentTarget);
      // const { submission } = Object.fromEntries(formData);
      // console.log('subText', submission)
// dispatch(setAlert([data.message, 'success']))

    // } catch (error) {
      // console.log('error', error)
      // dispatch(setAlert([error.data.message, 'error']))
    // }