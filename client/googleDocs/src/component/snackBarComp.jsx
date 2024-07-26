import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../style.css"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
// import { useEffect, useState } from "react";

function SnackBar() {

    // const [visible, setVisible] = useState(true);

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setVisible(false);
    //     }, 5000); 

    //     return () => clearTimeout(timeout);
    // }, []);

    return (
        <>
            {/* {visible && */}
                <div className="toast-container">
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "green", height: "18px", paddingLeft: "14px" }} />
                    <span>Sign Up Successfully </span>
                </div>
            {/* } */}
            </>
    )
}

export default SnackBar