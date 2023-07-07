import React from "react";

const RadioInput = ({val, handleChange}) => {
    return (
        <>
            <label>Gender</label>
            <br />
            <label>Male</label>
            <input type='radio' name="gender" value='male' onChange={handleChange} />
            <label>Female</label>
            <input type='radio' name="gender" value='female' onChange={handleChange} />
        </>
    );
}

export default RadioInput;
