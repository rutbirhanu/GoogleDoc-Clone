import { useState } from "react"
import ButtonComp from "../component/buttonComp"
import InputField from "../component/inputField"
import "./signup.css"
import { Link } from "react-router-dom"
import { faUser, faEnvelope, faEye } from '@fortawesome/free-solid-svg-icons'
import { auth, googleProvider } from "../firebase"
import { signInWithPopup } from "firebase/auth"
import SnackBar from "../component/snackBarComp"
// import Cookies from 'js-cookie';

function SignUpPage() {

  const handleSignWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const token = await result.user.getIdToken()
      // Cookies.set('authToken', token, { expires: 10 });
console.log(token)
      const response = await fetch("http://localhost:5001/user/signWithGoogle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        }
      }
      )
      const userData= await response.json()
      console.log(userData)
    }
    catch (err) {
      console.log(err)
    }
 }

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    sendEmail:false
  })

  const [errors, setErrors] = useState({})
  const [showSnackBar, setShowSnackBar]= useState(false)
  // const [isSubmit, setIsSubmit] = useState(false)

  
  const validate = (value) => {
    let tempErrors = {};
    if (!value.firstName) tempErrors.firstName = "Name should be greater than 2 letter";
    if (!value.lastName) tempErrors.lastName = "Name should be greater than 2 letter";
    if (!value.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(value.email)) {
      tempErrors.email = 'Email is invalid';
    }
    if (!value.password) {
      tempErrors.password = 'Password is required';
    } else if (value.password.length < 4) {
      tempErrors.password = 'Password must be at least 4 characters';
    }
    
    return tempErrors
  };

  const onChange = (e) => {
    const { name, value, checked , type} = e.target
    const current = type === "checkbox" ? checked : value
    
    setValues({ ...values, [name]: current })
  }
  

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault()
      setShowSnackBar(false);

      const tempErrors=validate(values)
      setErrors(tempErrors)
      if (Object.keys(tempErrors).length === 0) {
        setShowSnackBar(false)
        const response = await fetch("http://localhost:5001/user/signUp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        });

        const formRes = await response.json()
        console.log(formRes)
        // setIsSubmit(true)
      }
      else {
        setShowSnackBar(true)
      console.log(showSnackBar)
        console.log("Form has validation errors.");
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  
  const handleCloseSnackBar = () => {
    setShowSnackBar(false);
};
  
  return (
    <div className="parent-container">
    <div className="page-container">
        <h2>Sign Up </h2>
        
      <form onSubmit={handleFormSubmit}>
        <div className="row-fields">
          <InputField label="First name" icon={faUser} name="firstName" errorMessage={errors.firstName} pattern="^[A-Za-z]{2,14}$" placeholder="Eyeresualem" value={values.firstName} onChange={onChange} />
          <InputField label="Last name" icon={faUser} name="lastName" placeholder="Birhanu" pattern="^[A-Za-z]{2,14}$" errorMessage={errors.lastName} value={values.lastName} onChange={onChange}/>
        </div>
          <InputField label="Email" name="email" icon={faEnvelope} placeholder="birhanu@gmail.com" pattern="^\S+@\S+\.\S+$" errorMessage={errors.email} value={values.email} onChange={onChange} />
          <InputField label="Password" name="password" icon={faEye} placeholder="12@4%j" pattern="^.{5,}$" value={values.password} errorMessage={errors.password} onChange={onChange} />
        
          <div className="checkbox">
          <input type="checkbox" name="sendEmail" checked={values.sendEmail} onChange={onChange} />
            <label>Send me helpful emails</label>
    </div>
        </form>
        
      <ButtonComp text="Create Account" onClick={handleFormSubmit} />
      <div className="divider">
        <span>or</span>
      </div>
      <div className="google-btn">
        <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" width="44px" height="29px" style={{borderRadius:"5px", margin:"0 3px"}}/>
        <button onClick={handleSignWithGoogle}>continue with Google</button>
      </div>
      <div className="login-link">
        <p>Already have account ? <Link to="/signin"><span>Login</span></Link></p>
        </div>
        {
        showSnackBar && <SnackBar visible={showSnackBar} onClose={handleCloseSnackBar} />}
      </div>
      </div>
  )
}

export default SignUpPage