import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useGetSubmissionsQuery } from "../../../features/submission/submissionSlice"
import Loader from "../../Loader"
import TimeAgo from "timeago-react"
import Empty from "../../Empty"


const SubmissionsPage = () => {
  const navigate = useNavigate()
  const {challengeID} = useParams()

  const { data: submissions, isLoading: submissionsLoading } = useGetSubmissionsQuery(challengeID)
  console.log('submissions', submissions)


  const handleEvaluate = (subID) => {
    navigate(`/author/submission/${subID}`)
  }

  if (submissionsLoading) return <Loader />
  return (
    <>
      <h1 className="text-3xl my-3 purple_gradient capitalize">submissions</h1>
      {submissions.length > 0 ? 
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-sm">
          <tr>
            <th className="px-6 py-3">
              Name
            </th>
            <th className="px-6 py-3">
              Time
            </th>
            <th className="px-6 py-3">
              Rank
            </th>
            <th className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => 
          <tr>
            <td>
              <div className="user">
                <div className="img">s</div>
                <div className="name">
                  <span>{sub.participent.fullname}</span>
                  <p>{sub.participent.email}</p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4"><TimeAgo datetime={sub.createdAt} /></td>
            <td className="px-6 py-4">
              5th <span className="text-green-500">(400pts)</span>
            </td>
            <td className="px-6 py-4">
              <button onClick={() => handleEvaluate(sub._id)} className="status pending">evaluate</button>
            </td>
          </tr>
          )}
        </tbody>
      </table>
      :
      <Empty msg='No new submissions are found.' />
      }
    </>
  )
}

export default SubmissionsPage