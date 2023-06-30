import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea'
import { Dropdown } from 'primereact/dropdown';

const UserForm = () => {
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
        e.preventDefault();
        const err = Object.keys(errors).filter((key) => {
            return errors[key] !== '';
        });
        if (err.length === 0) {
            console.log('User Data - ', userData);
            resetForm();
        } else {
            console.log('Errors in form');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
        return phoneRegex.test(phone) && phone.length > 9;
    }

    const validateFormData = (field) => {
        if (field === 'firstname' || field == 'lastname') {
            if (userData[field].length < 3) {
                setError((error) => ({
                    ...error,
                    [field]: `${field} too short length should be more than 3`
                }));
            } else {
                setError((error) => ({
                    ...error,
                    [field]: ''
                }));
            }
        } else if (field === 'phone') {
            if (!validatePhone(userData[field])) {
                console.log(!validatePhone(userData[field]));
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
            if (!validateEmail(userData[field])) {
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
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        })
        if (name === 'firstname' || name === 'lastname' || name === 'phone' || name === 'email') {
            validateFormData(name);
        }
    };

    return (
        <>
            <div className='container'>
                <Card className='card-box'>
                    <h1>User Form</h1>
                    <form onSubmit={handleSubmitForm}>
                        <div className='card'>
                            <span className="p-float-label" >
                                <InputText className="InputText" id="FirstName" name='firstname' value={userData.firstname} onChange={handleChange} required />
                                <label placeholder="FirstName">FirstName</label>
                                <p className='danger'>{errors.firstname}</p>
                            </span>
                            <span className="p-float-label" >
                                <InputText className="InputText" id="LastName" name="lastname" value={userData.lastname} onChange={handleChange} required />
                                <label htmlFor="LastName">LastName</label>
                                <p className='danger'>{errors.lastname}</p>
                            </span>
                            <span className="p-float-label" >
                                <InputText className="InputText" id="Phone No." type="tel" name='phone' value={userData.phone} onChange={handleChange} required />
                                <label htmlFor="Phone No.">Phone No.</label>
                                <p className='danger'>{errors.phone}</p>
                            </span>
                            <span className="p-float-label" >
                                <InputText className="InputText" id="Email" name='email' value={userData.email} onChange={handleChange} required />
                                <label htmlFor="Email">Email</label>
                                <p className='danger'>{errors.email}</p>
                            </span>
                            <span className="p-float-label" >
                                <InputText className="InputText" id="Dob" type='date' name='date_of_birth' value={userData.date_of_birth} onChange={handleChange} required />
                                <label htmlFor="Dob.">Dob</label>
                            </span>
                            <span className="p-float-label" >
                                <Dropdown className="Dropdown" id="Highest Education" name='high_education' options={education} value={userData.high_education} onChange={handleChange} required />
                                <label htmlFor="Highest Education">Highest Education</label>
                            </span>
                            <span className="p-float-label" >
                                <Dropdown className="Dropdown" id="Role" options={roles} name='role' value={userData.role} onChange={handleChange} required />
                                <label htmlFor="Role">Role</label>
                            </span>
                            <span>
                                <div className="InputText">
                                    <label htmlFor="Gender" className='radio'>Gender</label>
                                    <span className='radio' >
                                        <input type='radio' id="Male" name="gender" value='Male' checked={userData.gender === 'Male'} onChange={handleChange} required />
                                        <label htmlFor="Male" className="ml-2">Male</label>
                                    </span>
                                    <span className='radio'>
                                        <input type='radio' id="Female" name="gender" value='Female' checked={userData.gender === 'Female'} onChange={handleChange} />
                                        <label htmlFor="Female" className="ml-2">Female</label>
                                    </span>
                                </div>
                            </span>
                            <span className="p-float-label" >
                                <InputTextarea className="InputText" id="Description" name='description' value={userData.description} onChange={handleChange} required />
                                <label htmlFor="Description">Description</label>
                            </span>
                            <span >
                                <label>Profile picture</label>
                                <br />
                                <input type='file' name='profile' value={userData.profile} onChange={handleChange} required />
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