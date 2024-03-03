import { ResponsesSection } from "./parts/ResponsesSection";
import { SubmitForm } from "./parts/SubmitForm";
import { ChallengeDescSection } from "./parts/ChallengeDescSection";

import { useGetChallengeQuery } from "../../../features/challenge/challengeSlice";
import { useGetMySubmissionsQuery } from "../../../features/submission/submissionSlice";
import { useParams } from "react-router-dom";
import Loader from '../../Loader'

const ChallengePage = () => {

  const { challengeID } = useParams()
  const { data: challenge, isLoading: challengeLoading } = useGetChallengeQuery(challengeID)
  const { data: submissions, isLoading: submissionsLoading } = useGetMySubmissionsQuery({ challengeID })
  
  
  if (submissionsLoading || challengeLoading) return <Loader />;
  return (
    <div className="challenge-area ldr">
      <ChallengeDescSection challenge={challenge} />
      <div className="my-10 grid grid-cols-12">
        <div className="col-span-12 lg:col-span-8 lg:border-r-[1px] border-[#353535]">
          <h1 className="text-2xl my-3 purple_gradient">Submit</h1>
          <SubmitForm maxSub={challenge.maxSubmittions} mySub={submissions.length} />
        </div>
        <div className="col-span-12 lg:col-span-4 px-3">
          <h1 className="text-2xl my-3 purple_gradient">Responses</h1>
          <ResponsesSection submissions={submissions} />
        </div>
      </div>
    </div>
  );
};


export default ChallengePage