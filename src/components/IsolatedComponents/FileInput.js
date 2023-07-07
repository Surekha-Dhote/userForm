import React from "react";

const FileInput = ({val, handleChange}) => {
    
    return(
        <>
           <label>File</label>
           <input type='file' onChange={handleChange} />
        </>
    );
};

export default FileInput;