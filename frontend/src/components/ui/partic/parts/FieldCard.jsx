import { COLORS } from "../../../../utils/helpers";
import { ParticCard } from "./ParticCard";

export const FieldCard = ({ field, i }) => {
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4">
      <div className="field">
        <div className="after" style={{ background: COLORS[i % COLORS.length] }}></div>
        <h1 className='text-xl'>
          {field.challenges.length}
          <span className='text-sm'> Challenges</span>
        </h1>
        <span className='text-gray-500 text-sm'>
          Starts {new Date(field.startsIn).toLocaleString()}
        </span>
        <h2 className='text-xl capitalize mt-8'>{field.name}</h2>
        <p className="text-sm my-2">{field.desc}</p>
        <span className='text-gray-500 text-sm'>
          Ends {new Date(field.endsIn).toLocaleString()}
        </span>
        <ParticCard partics={field.participents} fieldID={field._id} />
      </div>
    </div>
  );
};
