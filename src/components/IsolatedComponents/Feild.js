import InputText from './InputText';
import React, { useState }from "react";
import DateInput from './DateInput';
import FileInput from './FileInput';
import RadioInput from './RadioInput';
import SelectInput from './SelectInput';

const Feild = () => {
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [file, setFile] = useState();
    const [gender, setGender] = useState();
    const [city, setCity] = useState();

    const handleDateChange = (e) => {
        setDate(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleGenderChange = (e) => {
        setGender(e.target.value);
    }

    const handleCityChange = (e) => {
        setCity(e.target.value);
    }

    const handleFileChange = (e) => {
        if(e.target && e.target.files[0]) {
            setFile(URL.createObjectURL(e.target.files[0]));
        }       
    }

    const Values = () => {
        return (
            <>
                <p>name - {name}</p>
                <p>date - {date}</p>
                <p>gender - {gender}</p>
                <p>city - {city}</p>
                <p>file - <img src={file} /></p>
            </>
        )
    }

    return(
        <>
            <InputText val={name} handleChange={handleNameChange} /><br />
            <DateInput val={date} handleChange={handleDateChange} /><br />
            <FileInput val={file} handleChange={handleFileChange} /><br />
            <RadioInput val={gender} handleChange={handleGenderChange} /><br />
            <SelectInput val={city} handleChange={handleCityChange} /><br />
            <h1>
                Your Values
            </h1>
            <div>
                <Values />
            </div>
        </>
    );
};

export default Feild;