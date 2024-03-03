import { ChallengeCard } from "./parts/ChallengeCard"
import { useOutletContext } from "react-router-dom"


const ChallengesPage = ({authorChallenges}) => {
  const {challenges} = authorChallenges || useOutletContext()
  
  return (
    <div className="grid gap-8 lg:gap-12 grid-cols-12">
      {challenges.map((challenge, i) => 
        <ChallengeCard 
          key={challenge._id} 
          challenge={challenge} 
          i={i} 
        />
      )}
    </div>
  )
}

export default ChallengesPage