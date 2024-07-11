import TextEditor from "./TextEditor"
import "./style.css"
import { Navigate, Route, Routes } from "react-router-dom"
import {v4 as uuidV4} from "uuid"


function App() {

  return (
    <Routes>
      <Route path="/" exact element={
      <Navigate to={`/document/${uuidV4()}`} replace />
      } />
      <Route path="/document/:id"  element={ <TextEditor/>} />
    </Routes>
  )
}

export default App
