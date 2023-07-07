import { Card } from "primereact/card";
import React from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UserTable = ({ userList, deleteUser, editUser }) => {
    console.log(userList,'userList IN TABLE');

    const profileImage = (rowData) => {
        return <img src={rowData.profile}/>;
    }

    const editIcon = (rowData) => {
        const editRow = () => {
            console.log(rowData,'editrow');
            editUser(rowData);
        }

        return <i className="success fa fa-2x fa-pencil" aria-hidden="true" onClick={editRow}></i>;
    };

    const deleteIcon = (rowData) => {
        const deleteRow = () => {
            console.log(rowData,'deleteRow');
            deleteUser(rowData);
        };

        return <i className="danger fa fa-2x fa-trash" aria-hidden="true" onClick={deleteRow}></i>;
    };    

    return (
        <>
            <div className="table-container">
                <Card>
                    <h1>User Data</h1>
                    <DataTable value={userList} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="firstname" header="Firstname"></Column>
                        <Column field="lastname" header="Lastname"></Column>
                        <Column field="phone" header="Phone"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="date_of_birth" header="Date of Birth"></Column>
                        <Column field="high_education" header="High Education"></Column>
                        <Column field="role" header="Role"></Column>
                        <Column field="gender" header="Gender"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column body={profileImage} header="Profile" className="profile"></Column>
                        <Column body={editIcon} header="Edit"></Column>
                        <Column body={deleteIcon} header="Delete"></Column>
                    </DataTable>
                </Card>
            </div>
        </>
    );
}

export default UserTable;