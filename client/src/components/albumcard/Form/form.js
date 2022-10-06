import React from 'react'
export const Form = ({onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor='name'>Name</label>
            </div>
        </form>
    )
}
export default Form