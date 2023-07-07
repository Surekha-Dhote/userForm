import React from "react";

const SelectInput = ({val, handleChange}) => {
    const city = ['pune', 'bangalore', 'goa', 'bhopal', 'indore'];

    const Options = () => {
        return (
            <>
                {
                    city.map((ct) => {
                        return <option>{ct}</option>
                    })
                }
            </>
        )
    };

    return (
        <>
                <label>City - </label>
                <select name="city" onChange={handleChange} value={val} >
                    <Options />
                </select>               
        </>
    )
}

export default SelectInput;