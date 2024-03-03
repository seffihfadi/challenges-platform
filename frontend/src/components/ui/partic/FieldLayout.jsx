import { Outlet, useParams } from "react-router-dom"
import { useGetFieldQuery } from "../../../features/field/fieldSlice"
import Loader from "../../Loader"
import { useGetChallengesQuery } from "../../../features/challenge/challengeSlice"


const FieldLayout = () => {

  const {fieldID} = useParams()

  const {data: field, isLoading: fieldLoading} = useGetFieldQuery(fieldID)
  const {data: challenges, isLoading: challengesLoading} = useGetChallengesQuery(fieldID)

  if (fieldLoading || challengesLoading) return <Loader msg='loading' />;

  return (
    <div className="field-area">
      <div className="lg:w-2/3 my-12">
        <h1 className="text-3xl my-3 purple_gradient">{field.name}</h1>
        <p className="text-lg">{field.desc}</p>
      </div>
      <Outlet context={{challenges}} />
    </div>
  )
}

export default FieldLayout