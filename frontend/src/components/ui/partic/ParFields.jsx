import { useGetFieldsQuery } from "../../../features/field/fieldSlice"
import { FieldCard } from "./parts/FieldCard"
import Loader from "../../Loader"


const ParFields = () => {
  const {data: fields, isLoading} = useGetFieldsQuery()
  
  if(isLoading) return <Loader msg='loading tracks' />
  
  const content = fields.map((field, i) => <FieldCard key={field._id} field={field} i={i} />)

  return (
    <div className="fields ldr">
      <div className="lg:w-2/3 my-12">
        <h1 className="text-3xl my-3 purple_gradient">Our Tracks</h1>
        <p className="text-lg">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur esse ab placeat perferendis quo nihil sunt accusantium? Consectetur a, fugiat libero modi quasi, perferendis alias tenetur quos perspiciatis ad veniam.</p>
      </div>
      <div className="grid gap-8 lg:gap-12 grid-cols-12">
        {content}
      </div>
    </div>
  )
}

export default ParFields