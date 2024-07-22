import { useNavigate } from "react-router-dom"
import ButtonComp from "../component/buttonComp"
import InputField from "../component/inputField"
import "../page/signin.css"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function SignInPage() {
  const navigate = useNavigate()
  const navigateToSignup = () => {
    navigate("/signup")
  }
  const [email, setEmail]= useState("")
  return (
    <div>
      <div className="signin-page-container">
        <div className="signin-card">
          <h2>Login</h2>
          <form>
          <InputField label="Email" placeholder="ruth@gmail.com" icon={faEnvelope} name="email" value={email} pattern="^\S+@\S+\.\S+$" errorMessage="Should be valid email" onChange={(e)=> setEmail(e.target.value)} />
            <ButtonComp text="Continue" />
            </form>
          <div className="divider">
            <span>or</span>
          </div>
          <div className="google-btn">
              <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" width="40px" height="30px" style={{borderRadius:"6px", margin:"0 3px"}}/>
             <button>continue with Google</button>
          </div>
          <div className="divider">
            <span>Don&apos;t have an Account ?</span>
          </div>
          <div className="transparent-btn">
            <button onClick={navigateToSignup}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage