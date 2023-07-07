import React, {useState} from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

const Dashboard = () => {
    const [dataList, setDataList] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState();

    const addUser = (userData) => {
        setDataList(prevList => [
            ...prevList,
            userData
        ]);
    };

    const deleteUser = (userData) => {
        const selectedData = dataList.filter((user) => user.email !== userData.email);
        setDataList(selectedData);
    }

    const editUser = (userData) => {
        setEdit(true);
        setEditData(userData);
        console.log(userData,'uysg');
    }

    const saveEditedUser = (editedData) => {
        const updatedList = dataList.map((user) => {
            if (user.email === editedData.email) {
              return editedData;
            }
            return user;
          });
          setDataList(updatedList);
          setEditData(null);
    }

    return (
    <>
        <div>
            <UserForm addUser={addUser} data={editData} saveEditedUser={saveEditedUser} />
            <UserTable userList={dataList} deleteUser={deleteUser} editUser={editUser} />
        </div>
    </>
    );
};

export default Dashboard;