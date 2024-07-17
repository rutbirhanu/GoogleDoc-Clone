/* eslint-disable react/prop-types */
import "../page/signup.css"

function InputField(props) {
    return (
        <div className="field-container">
            <label>{props.label}</label>
            <input type="text" id="text-input" />
        </div>
    )
}

export default InputField