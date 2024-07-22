/* eslint-disable react/prop-types */
import "../page/signup.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function InputField(props) {
    return (
        
        <div className="field-container">
            {/* <i className="fa-solid fa-user"></i> */}
            <FontAwesomeIcon icon={props.icon} className="icon"/>
            <label>{props.label}</label>
            <input type="text" id="text-input" value={props.value} onChange={props.onChange} placeholder={props.placeholder} name={props.name} required pattern={props.pattern} />
            <span>{props.errorMessage}</span>
        </div>
    )
}

export default InputField