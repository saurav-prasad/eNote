import React from 'react'

export default function Alert(props) {
    const { message, type } = props.alert;
    const capital = (text) => {
        let txt = text.toLowerCase();
        return txt.charAt(0).toUpperCase() + txt.slice(1)
    }
    return (
        <div style={{ height: '25px' }}>
            <div className={`alert alert-${type} alert-dismissible fade show`} role="alert">
                <strong>{message}</strong>
            </div>
        </div>
    )
}
