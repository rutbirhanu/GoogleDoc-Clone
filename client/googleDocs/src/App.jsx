import LandingPage from "./page/landingPage"
import SignInPage from "./page/signinPage"
import SignUpPage from "./page/signupPage"
import "./style.css"
import { Navigate, Route, Routes } from "react-router-dom"
import {v4 as uuidV4} from "uuid"
import TextEditor from "./page/TextEditor"


function App() {

  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signin" element={<SignInPage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      <Route path="/doc" exact element={
      <Navigate to={`/document/${uuidV4()}`} replace />
      } />
      <Route path="/document/:id" element={<TextEditor/>} />
    </Routes>
  )
}

export default App
