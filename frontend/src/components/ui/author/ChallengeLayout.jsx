import { Outlet } from "react-router-dom"
import { ChallengeDescSection } from "../partic/parts/ChallengeDescSection";

import { useGetChallengeQuery } from "../../../features/challenge/challengeSlice";
import { useParams } from "react-router-dom";
import Loader from '../../Loader'

const ChallengeLayout = () => {
  const { challengeID } = useParams()
  const { data: challenge, isLoading: challengeLoading } = useGetChallengeQuery(challengeID)
  if (challengeLoading) return <Loader />

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <Outlet context={challenge} />
      </div>
      <div className="col-span-4">
        <ChallengeDescSection challenge={challenge} side={true} />
      </div>

    </div>
  )
}

export default ChallengeLayout