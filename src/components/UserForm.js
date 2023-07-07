import React, { useEffect, useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown';

const UserForm = ({ addUser, data, saveEditedUser }) => {
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        date_of_birth: '',
        high_education: '',
        role: '',
        gender: '',
        description: '',
        profile: '',
    });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (data) {
            setUserData(() => ({
                ...userData, 
                firstname: data?.firstname,
                lastname: data?.lastname, 
                phone: data?.phone, 
                email: data?.email, 
                date_of_birth: data?.date_of_birth, 
                high_education: data?.high_education,
                role: data?.role, 
                gender: data?.gender, 
                description: data?.description,
                profile: data?.profile,
            }));
            setEdit(true);
        }
    }, [data])

    const [errors, setError] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
    });
    const roles = ['SE', 'SSE', 'ATL', 'TL', 'PH'];
    const education = [
        'High School',
        'Associate Degree',
        'Bachelor\'s Degree',
        'Master\'s Degree',
        'PhD',
        'Other'
    ];

    const handleSubmitForm = (e) => {
        console.log('handleSubmitForm: ');
        e.preventDefault();
        const err = Object.keys(errors).filter((key) => {
            return errors[key] !== '';
        });
        if (err.length === 0 || userData.profile.name !== '') {
            console.log('User Data - ', userData);
            console.log(data);
            if(data === undefined || data === null){
                addUser(userData);
            } else {
                saveEditedUser(userData);
            }
            resetForm();
        } else {
            console.log('Errors in form');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (value) => {
        const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        let phoneLength = false;
        if (value.includes('+91') && value.length === 13) {
            phoneLength = true;
        } else if (value.length === 10) {
            phoneLength = true;
        }
        return phoneRegex.test(value) && phoneLength;
    }

    const validateFormData = (field, value) => {
        if (field === 'firstname' || field == 'lastname') {
            if (value.length < 3) {
                setError((error) => ({
                    ...error,
                    [field]: `${field} too short`
                }));
            } else {
                setError((error) => ({
                    ...error,
                    [field]: ''
                }));
            }
        } else if (field === 'phone') {
            if (!validatePhone(value)) {
                setError((error) => ({
                    ...error,
                    [field]: `${field} number should be of 10 digits`
                }));
            } else {
                setError((error) => ({
                    ...error,
                    [field]: ''
                }));
            }
        } else if (field === 'email') {
            if (!validateEmail(value)) {
                setError((error) => ({
                    ...error,
                    [field]: `${field} invalid`
                }));
            } else {
                setError((error) => ({
                    ...error,
                    [field]: ''
                }));
            }
        }
    };

    const resetForm = () => {
        setUserData({
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            date_of_birth: '',
            high_education: '',
            role: '',
            gender: '',
            description: '',
            profile: '',
        });
        setEdit(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        if (name === 'firstname' || name === 'lastname' || name === 'phone' || name === 'email') {
            validateFormData(name, value);
        }
    };

    const handleFileChange = (e) => {
        if (e.target && e.target.files[0]) {
            const type = e.target.files[0].type.split('/')[0];
            if (type === 'image') {
                const file = e.target && e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : null;
                setUserData(data => ({
                    ...data,
                    profile: file ? URL.createObjectURL(e.target.files[0]) : ''
                }));
                setError((error) => ({
                    ...error,
                    'profile': ''
                }));
            } else {
                setError((error) => ({
                    ...error,
                    'profile': `${type} format not allowed, please select image`
                }));
            }
        } else {
            setError((error) => ({
                ...error,
                'profile': `please select image`
            }));
        }
    };

    return (
        <>
            <div className='container'>
                <Card className='card-box'>
                    <h1>User Form</h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className='card'>
                            <span className="input-box" >
                                <label placeholder="FirstName">FirstName</label>
                                <InputText className={errors.firstname ? "InputText highlight" : "InputText"} id="FirstName" name='firstname' value={userData.firstname} onChange={handleChange} required />
                                <small className='danger'>{errors.firstname}</small>
                            </span>
                            <span className="input-box" >
                                <label htmlFor="LastName">LastName</label>
                                <InputText className={errors.lastname ? "InputText highlight" : "InputText"} id="LastName" name="lastname" value={userData.lastname} onChange={handleChange} required />
                                <small className='danger'>{errors.lastname}</small>
                            </span>
                            <span className="input-box" >
                                <label htmlFor="Phone No.">Phone No.</label>
                                <InputText className={errors.phone ? "InputText highlight" : "InputText"} id="Phone No." type="tel" name='phone' value={userData.phone} onChange={handleChange} required />
                                <small className='danger'>{errors.phone}</small>
                            </span>
                            <span className="input-box" >
                                <label htmlFor="Email">Email</label>
                                <InputText className={errors.email ? "InputText highlight" : "InputText"} id="Email" name='email' value={userData.email} onChange={handleChange} required disabled = {edit}/>
                                <small className='danger'>{errors.email}</small>
                            </span>
                            <span className="input-box" >
                                <label htmlFor="Dob.">Dob</label>
                                <InputText id="Dob" className='InputText' type='date' name='date_of_birth' value={userData.date_of_birth} onChange={handleChange} required />
                            </span>
                            <span className="input-box" >
                                <label htmlFor="Highest Education">Highest Education</label>
                                <Dropdown id="Highest Education" className='Dropdown' name='high_education' options={education} value={userData.high_education} onChange={handleChange} required />
                            </span>
                            <span className="input-box" >
                                <label htmlFor="Role">Role</label>
                                <Dropdown className="Dropdown" id="Role" options={roles} name='role' value={userData.role} onChange={handleChange} required />
                            </span>
                            <span className="radio-box">
                                <label htmlFor="Gender" className='radio'>Gender</label>
                                <span className='radio' >
                                    <input type='radio' id="Male" name="gender" value='Male' checked={userData.gender === 'Male'} onChange={handleChange} required />
                                    <label htmlFor="Male" className="ml-2">Male</label>
                                </span>
                                <span className='radio'>
                                    <input type='radio' id="Female" name="gender" value='Female' checked={userData.gender === 'Female'} onChange={handleChange} />
                                    <label htmlFor="Female" className="ml-2">Female</label>
                                </span>
                            </span>
                            <span className="input-box" >
                                <label htmlFor="Description">Description</label>
                                <InputTextarea id="Description" className='InputText' name='description' value={userData.description} onChange={handleChange} required />
                            </span>
                            <span>
                                <label>Profile picture</label>
                                <br />
                                <input type='file' className={errors.profile ? 'highlight' : ''} name='profile' onChange={handleFileChange} required />
                                <br />
                                <small className='danger'>{errors.profile}</small>
                            </span>
                            <Button type='submit' className='submit'>Submit</Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    )
};

export default UserForm;