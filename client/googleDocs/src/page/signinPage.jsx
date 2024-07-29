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

  const [formValues, setFormValues] = useState({
    password: "",
    email: ""
  })

  const [errors, setErrors] = useState({})


  const onChange = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validate = (formValue) => {
    let tempErrors = {}
    if (!formValue.email) {
      tempErrors.email = "Should be valid email"
    }
    if (!formValue.password) {
      tempErrors.password = "Password should be more then 4 character"
    }
    return tempErrors
  }

  const handleLogin = async (e) => {
    try {
      e.preventDefault()

      const tempErrors = validate(formValues)
      setErrors(tempErrors)

      console.log(tempErrors)
      if (Object.keys(tempErrors).length === 0) {
        const request = await fetch("http://localhost:5001/user/signIn", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
          credentials: "include" 
        })
        const res = await request.json()
        console.log(res)
        if (res.message === "login successfully") {
          navigate('/'); // Redirect to the home page
      }
      }
    }

    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className="signin-page-container">
        <div className="signin-card">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <InputField label="Email" placeholder="ruth@gmail.com" icon={faEnvelope} name="email" value={formValues.email} pattern="^\S+@\S+\.\S+$" errorMessage={errors.email} onChange={onChange} />
            <InputField label="Password" placeholder="12e456" icon={faEnvelope} name="password" value={formValues.password} pattern="^.{5,}$" errorMessage={errors.password} onChange={onChange} />
            <ButtonComp text="Continue" onChange={handleLogin} />
          </form>
          <div className="divider">
            <span>or</span>
          </div>
          <div className="google-btn">
            <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" width="40px" height="30px" style={{ borderRadius: "6px", margin: "0 3px" }} />
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