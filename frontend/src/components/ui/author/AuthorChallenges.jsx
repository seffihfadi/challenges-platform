import ChallengesPage from "../partic/ChallengesPage"
import { useGetChallengesQuery } from "../../../features/challenge/challengeSlice"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../features/auth/authSlice"
import Loader from "../../Loader"

const AuthorChallenges = () => {
  const {field: fieldID} = useSelector(selectCurrentUser)
  const {data: authorChallenges, isLoading: challengesLoading} = useGetChallengesQuery(fieldID)


  if (challengesLoading) return <Loader msg='loading' />;

  return (
    <div className="challenges-area">
      <div className="lg:w-2/3 my-12">
        <h1 className="text-3xl my-3 purple_gradient">Good Mornign Seffih Fadi</h1>
        <p className="text-lg">Here is a comprehensive list of challenges curated within the realm of web development that you have initiated.</p>
      </div>
      <ChallengesPage authorChallenges={{challenges: authorChallenges}} />
    </div>
  )
}

export default AuthorChallenges