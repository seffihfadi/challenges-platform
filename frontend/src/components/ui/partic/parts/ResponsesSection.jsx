import TimeAgo from 'timeago-react';

export const ResponsesSection = ({submissions}) => {

  return (
    <div className="responses">
      {submissions.map((submission) => 
        <div key={submission._id} className="response bg-glass rounded-lg">
          <div className="flex justify-between items-center p-3 rounded-lg bg-[#353535]">
            <span className="text-green-500">{submission.points} pts</span>
            <span className="text-gray-500"><TimeAgo datetime={submission.createdAt} /></span>
            <span className={`status ${submission.status}`}>{submission.status}</span>
          </div>
          {submission.hint?.length > 0 &&
            <div className="p-4">
              <p className="text-sm leading-6">
                <span className="text-gray-500">Seffih Fadi: </span>
                {submission.hint}
              </p>
            </div>
          }
        </div>
      )}
      <div className="response bg-glass rounded-lg">
        <div className="flex justify-between items-center p-3 rounded-lg bg-[#353535]">
          <span className="text-green-500">0 pts</span>
          <span className="text-gray-500">submission time</span>
          <span className="status purple_gradient_bg">status</span>
        </div>
        <div className="p-4">
          <p className="text-sm leading-6">
            <span className="text-gray-500">Dear Participant: </span>
            Within this interface, you will find a comprehensive overview of all your submissions, including timestamps, status indicators, and point allocations. Additionally, you may receive insightful hints directly from the author to enhance your experience and understanding.
          </p>
        </div>
      </div>
    </div>
  );
};
