import { Link } from "react-router-dom"
import {useEffect} from "react"
import "./landing.css"

function LandingPage() {

  useEffect(() => {
    const fetchData = async () => {
    const req = await fetch("http://localhost:5001/doc/") 
      
    }
  }, [])
  return (
    <div className="landing-parent-cont">
    <div className="landing-container">
      <div className="new-doc">
          <p>New doc</p>
          <Link to="/doc">
          <div className="rectangle">
            <img src="https://thumbs.dreamstime.com/b/plus-sign-isolated-white-background-clip-art-addition-rainbow-colorful-illustration-flat-lay-math-symbol-icon-to-add-176776532.jpg"/>
            </div>
          </Link>
    
        </div>
        <p>Existing doc</p>
      <div className="existing-doc">
          <div className="rectangle"></div>
          <div className="rectangle"></div>
          <div className="rectangle"></div>
      </div>
      </div>
      </div>
  )
}

export default LandingPage