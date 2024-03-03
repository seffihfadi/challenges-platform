import ChallengeForm from "./ChallengeForm"
import { useOutletContext } from "react-router-dom"

const UpdateChallenge = () => {
  const challenge = useOutletContext()
  return (
    <div className="sign">
      <div className="grid grid-cols-12">
        <ChallengeForm type={"Update"} data={challenge} />
      </div>
    </div>
  )
}

export default UpdateChallenge