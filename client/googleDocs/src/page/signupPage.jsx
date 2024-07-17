import ButtonComp from "../component/buttonComp"
import Checkbox from "../component/checkbox"
import InputField from "../component/inputField"
import "./signup.css"
import {Link} from "react-router-dom"

function SignUpPage() {
  // const navigate = useNavigate()
  
  // const navigateToLogin = () => {
  //   navigate("/signin")
  // }
  return (
    <div className="parent-container">
    <div className="page-container">
      <h2>Sign Up </h2>
      <form>
        <div className="row-fields">
          <InputField label="First name" />
        <InputField label="Last name"/>
        </div>
       <InputField label="Email"/>
        <InputField label="Password" />
        <Checkbox />
      </form>
      <ButtonComp text="Create Account" />
      <div className="divider">
        <span>or</span>
      </div>
      <div className="google-btn">
        <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" width="44px" height="29px" style={{borderRadius:"5px", margin:"0 3px"}}/>
        <button>continue with Google</button>
      </div>
      <div className="login-link">
        <p>Already have account ? <Link to="/"><span>Login</span></Link></p>
      </div>
      </div>
      </div>
  )
}

export default SignUpPage