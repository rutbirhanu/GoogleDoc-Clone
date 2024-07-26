/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../style.css"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useEffect} from "react";

function SnackBar({ visible, onClose }) {
    useEffect(() => {
        if (visible) {
            const timeout = setTimeout(() => {
                onClose();
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [visible, onClose]);

    return (
        <>
            {visible &&
                <div className="toast-container">
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "green", height: "18px", paddingLeft: "14px" }} />
                    <span>Sign Up Successfully </span>
                </div>
            }
            </>
    )
}

export default SnackBar