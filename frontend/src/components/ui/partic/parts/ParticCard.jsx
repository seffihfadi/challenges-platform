import { Link } from "react-router-dom";
import { getFirstLetter } from "../../../../utils/helpers";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../features/auth/authSlice";
import { COLORS } from "../../../../utils/helpers";



export const ParticCard = ({ partics, fieldID }) => {
  const { _id: sessionID } = useSelector(selectCurrentUser)
  const showNum = 2
  const randNum = Math.floor(Math.random() * (partics.length - showNum))

  return (
    <div className="flex justify-between mt-auto pt-4">
      <div className="flex">
        {partics.slice(randNum, showNum).map((participent, i) => <div key={participent._id} title={participent.fullname} className="user">
          <div className="img" style={{ background: COLORS[i % COLORS.length] }}>
            {getFirstLetter(participent.fullname)}
          </div>
        </div>
        )}
        {partics.length > showNum &&
          <div className="user">
            <div className="img plus text-sm">
              +{partics.length - 2}
            </div>
          </div>}
      </div>
      <div className="flex gap-2">
        {partics.some((participant) => participant._id === sessionID) && (
          <Link to={`../field/${fieldID}/challenges`}>
            <i className="uil uil-brackets-curly"></i>
          </Link>
        )}
        <Link to={`../field/${fieldID}/board`}>
          <i className="uil uil-award"></i>
        </Link>
      </div>
    </div>
  );
};
