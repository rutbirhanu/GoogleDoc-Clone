/* eslint-disable react/prop-types */
import "../page/signup.css"

function ButtonComp(props) {
  return (
      <div className="button-container">
          <button className="signup-btn">{props.text}</button>
    </div>
  )
}

export default ButtonComp