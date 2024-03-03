import { Link, Route } from "react-router-dom";
import { COLORS } from "../../../../utils/helpers";
import { getDifficultyLevel } from "../../../../utils/helpers";
import { useSelector } from "react-redux"
import { selectCurrentUser } from "../../../../features/auth/authSlice";
import ROLES from "../../../../utils/roles";

export const ChallengeCard = ({ challenge, i }) => {

  const user = useSelector(selectCurrentUser)

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="field">
        <div className="after" style={{ background: COLORS[i % COLORS.length] }}></div>
        <h1 className='text-xl text-green-500'>
          {challenge.mark}
          <span className='text-sm'> Points</span>
        </h1>
        <span className={`difficulty ${getDifficultyLevel(challenge.mark)}`}>
          ({getDifficultyLevel(challenge.mark)})
        </span>
        <h2 className='text-xl capitalize mt-8'>{challenge.name}</h2>
        <p className="text-sm my-2">{challenge.description}</p>
        <span className='text-gray-500 text-sm capitalize'>
          {user.role == ROLES.author ? '3 new submissions' : `created by : ${challenge.author.fullname}`}
        </span>
        <div className="flex gap-3 mt-auto pt-4">
          {user.role == ROLES.author 
          ? 
          <>
            <Link to={`/author/challenge/${challenge._id}/update`}>
              <i className="uil uil-edit-alt"></i>
            </Link>
            <Link to={`/author/challenge/${challenge._id}/submissions`}>
              <i className="uil uil-eye"></i>
            </Link>
          </>
          :
          <Link to={`/partic/challenge/${challenge._id}`}>
            <i className="uil uil-rocket"></i>
          </Link>
          }
        </div>
      </div>
    </div>
  );
};
