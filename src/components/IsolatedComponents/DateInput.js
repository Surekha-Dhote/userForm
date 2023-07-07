import React from "react";

const DateInput = ({val, handleChange}) => { 
   
    return(
        <>
           <label>Date</label>
           <input type='date' value={val} onChange={handleChange} />
        </>
    );
};

export default DateInput;