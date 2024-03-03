import { lazy, Suspense } from 'react'
import {Routes, Route} from 'react-router-dom'
import ROLES from './utils/roles'

import PrivateRoute from './components/PrivateRoute'
import NotFound from './pages/NotFound'
import Backdrop from './components/ui/Backdrop'
import Loader from './components/Loader'

const Signin = lazy(() => import('./pages/Signin'));
const Signup = lazy(() => import('./pages/Signup'));
const FieldLayout = lazy(() => import('./components/ui/partic/FieldLayout'));
const ChallengesPage = lazy(() => import('./components/ui/partic/ChallengesPage'));
const ChallengePage = lazy(() => import('./components/ui/partic/ChallengePage'));
const ParBoard = lazy(() => import('./components/ui/partic/ParBoard'));
const ParFields = lazy(() => import('./components/ui/partic/ParFields'));
const AdminLayout = lazy(() => import('./pages/AdminLayout'));
const Home = lazy(() => import('./components/ui/admin/Home'));
const ParticipantLayout = lazy(() => import('./pages/ParticipantLayout'));
const AuthorLayout = lazy(() => import('./pages/AuthorLayout'));
const Participants = lazy(() => import('./components/ui/admin/Participants'));
const Fields = lazy(() => import('./components/ui/admin/Fields'));
const AddField = lazy(() => import('./components/ui/admin/AddField'));
const SubmissionPage = lazy(() => import('./components/ui/author/SubmissionPage'));
const SubmissionsPage = lazy(() => import('./components/ui/author/SubmissionsPage'));
const CreateChallenge = lazy(() => import('./components/ui/author/parts/CreateChallenge'));
const UpdateChallenge = lazy(() => import('./components/ui/author/parts/UpdateChallenge'));
const AuthorChallenges = lazy(() => import('./components/ui/author/AuthorChallenges'));
const ChallengeLayout = lazy(() => import('./components/ui/author/ChallengeLayout'));


// import Signin from './pages/Signin'
// import Signup from './pages/Signup'
// import FieldLayout from './components/ui/partic/FieldLayout'
// import ChallengesPage from './components/ui/partic/ChallengesPage'
// import ChallengePage from './components/ui/partic/ChallengePage'
// import ParBoard from './components/ui/partic/ParBoard'
// import ParFields from './components/ui/partic/ParFields'
// import AdminLayout from './pages/AdminLayout'
// import Home from './components/ui/admin/Home'
// import ParticipantLayout from './pages/ParticipantLayout'
// import AuthorLayout from './pages/AuthorLayout'
// import Participants from './components/ui/admin/Participants'
// import Fields from './components/ui/admin/Fields'
// import AddField from './components/ui/admin/AddField'
// import SubmissionPage from './components/ui/author/SubmissionPage'
// import SubmissionsPage from './components/ui/author/SubmissionsPage'
// import CreateChallenge from './components/ui/author/parts/CreateChallenge'
// import UpdateChallenge from './components/ui/author/parts/UpdateChallenge'
// import AuthorChallenges from './components/ui/author/AuthorChallenges'
// import ChallengeLayout from './components/ui/author/ChallengeLayout'

const App = () => {
  return (
    <>
    
      <Backdrop />
      <Suspense fallback={<Loader msg='waiting' />}>
      <Routes>
        {/* public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* admin routes */}
        <Route
          path='dashboard'
          element={<PrivateRoute element={<AdminLayout />} allowed={ROLES.admin} />}
        >
          <Route path="home" element={<Home />} />
          <Route path="participants" element={<Participants />} />
          <Route path="fields" element={<Fields />} />
          <Route path="fields/add-field" element={<AddField />} />
        </Route>

        {/* participant routes */}
        <Route
          path="partic"
          element={<PrivateRoute element={<ParticipantLayout />} allowed={ROLES.participant} />}
        >
          
          <Route index element={<Home />} />
          <Route path="fields" element={<ParFields />} />

          <Route path="field" element={<FieldLayout />} >
            <Route path=':fieldID/board' element={<ParBoard />} />
            <Route path=":fieldID/challenges" element={<ChallengesPage />} />
          </Route>

          <Route path="challenge/:challengeID" element={<ChallengePage />} />

        </Route>

        {/* author routes */}
        <Route
          path="author"
          element={<PrivateRoute element={<AuthorLayout />} allowed={ROLES.author} />}
        >
          
          <Route index element={<Home />} />
          <Route path="challenges" element={<AuthorChallenges />} />

          <Route path="challenge" element={<ChallengeLayout />} >
            <Route path=':challengeID/update' element={<UpdateChallenge />} />
            <Route path=":challengeID/submissions" element={<SubmissionsPage />} />
          </Route>
          <Route path="challenge/create" element={<CreateChallenge />} />

          <Route path="submission/:subID" element={<SubmissionPage />} />

        </Route>
        <Route path="*" element={<NotFound />} />
        
      </Routes>
      </Suspense>
    </>
  )
}

export default App