import React from 'react'

const Alert = (props) => {

    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    return (
        <div style={{height: '70px'}}>
            {props.alertBox && <div className={`alert alert-${props.alertBox.typ} alert-dismissible fade show`} role="alert">
                <strong>{capitalize(props.alertBox.typ)}</strong>: {props.alertBox.msg}
            </div>}
        </div>
    )
}


export default Alert
