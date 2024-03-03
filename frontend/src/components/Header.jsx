import { NavLink } from "react-router-dom"
import Signout from "./Signout"
import Admin from "./ui/header/Admin"
import Participant  from "./ui/header/Participant"
import Author from "./ui/header/Author"
import { selectCurrentHeader } from "../features/ui/headerSlice"
import { useSelector } from "react-redux"
import AlertModel from "./AlertModel"

const Header = () => {
  const headerType = useSelector(selectCurrentHeader)
  const headerLinksComponents = {
    admin: Admin,
    participant: Participant,
    author: Author
  }

  const HeaderLinksComponent = headerLinksComponents[headerType]
  // console.log('headerType', headerType)

  return (
    <>
      <header>
        <HeaderLinksComponent />
        <div className="logo absolute hidden md:flex left-[calc(50%-1rem)]">
          <img className="w-8 aspect-square" src="/vite.svg" alt="" />
        </div>
        <Signout />
      </header>
      <AlertModel />
    </>
  )
}

export default Header