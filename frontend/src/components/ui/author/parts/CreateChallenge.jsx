import ChallengeForm from "./ChallengeForm"
const CreateChallenge = () => {

  return (
    <div className="sign h-[calc(100vh-6rem)]">
      <div className="flex w-full justify-center items-center">
        <ChallengeForm type={"Create"} />
      </div>
    </div>
  )
}

export default CreateChallenge