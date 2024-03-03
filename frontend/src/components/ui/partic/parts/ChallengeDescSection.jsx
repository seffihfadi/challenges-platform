import { getDifficultyLevel } from '../../../../utils/helpers';
import { useDownloadAssignmentQuery } from '../../../../features/challenge/challengeSlice';
import { selectCurrentUser } from '../../../../features/auth/authSlice';
import { useSelector } from 'react-redux';
import ROLES from '../../../../utils/roles';


export const ChallengeDescSection = ({challenge, side = false}) => {

  const {error, data, isLoading} = useDownloadAssignmentQuery(challenge)
  const user = useSelector(selectCurrentUser)

  const handleDownload = async () => {
    if (!isLoading && !error && data) {
      const blob = new Blob([data], { type: 'application/pdf' });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = challenge.assignment
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error('Error downloading file:', error);
    }
   
  }
  
  return (
    <div className={`grid grid-cols-12 chdsc ${side ? 'side' : ''}`}>
      <div className='left'>
        <h1 className="text-3xl my-3 purple_gradient capitalize">{challenge.name}</h1>
        <span className='text-gray-500 text-lg capitalize'>author: {challenge.author.fullname}</span>
        <p className="text-lg my-2 lg:w-9/12">{challenge.description}</p>
        <div className="flex flex-wrap gap-3 my-3">
          <div className="tag">
            <i className="uil uil-link-alt mr-3 text-[20px]"></i>
            {challenge.maxSubmittions} Submissons
          </div>
          <div className="tag">
            <i className="uil uil-screw mr-3 text-[20px]"></i>
            {getDifficultyLevel(challenge.mark)}
          </div>
          <div className="tag">
            <i className="uil uil-user mr-3 text-[20px]"></i>
            {challenge.author.fullname}
          </div>

        </div>
      </div>
      <div className='right'>
        <h1 className='text-4xl font-bold text-green-500'>
          {challenge.mark}
          <span className='text-lg'>{' '}Pts</span>
        </h1>
        {user.role === ROLES.author[0] 
        ? 
          <button onClick={() => {}} className="down text-sm danger">
            <i className="uil uil-trash-alt mr-3 text-[20px]"></i>
            Delete Challenge
          </button>
        :
          <button onClick={handleDownload} className="down text-sm">
            <i className="uil uil-cloud-download mr-3 text-[20px]"></i>
            Download Assignment
          </button>
        }

      </div>
    </div>
  )
}

