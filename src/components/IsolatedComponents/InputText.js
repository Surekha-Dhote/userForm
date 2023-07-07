import React from "react";

const InputText = ({val, handleChange}) => {
    
    return(
        <>
           <label>Name</label>
           <input type='text' value={val} onChange={handleChange} />
        </>
    );
};

export default InputText;