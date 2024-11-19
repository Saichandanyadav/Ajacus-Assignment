import { useEffect, useState } from 'react';
import axios from 'axios';
import UserList from './components/UserList/UserList';
import UserFormModal from './components/Modal/Modal';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const localUsers = JSON.parse(localStorage.getItem('users'));
        if (localUsers && localUsers.length > 0) {
          setUsers(localUsers);
        } else {
          const response = await axios.get('https://jsonplaceholder.typicode.com/users');
          setUsers(response.data);
          localStorage.setItem('users', JSON.stringify(response.data));
        }
      } catch (err) {
        setError('Failed to fetch users.');
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users && users.length > 0) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users]);

  const handleAddUser = (newUser) => {
    const id = users.length ? users[users.length - 1].id + 1 : 1;
    const updatedUsers = [...users, { ...newUser, id }];
    setUsers(updatedUsers);
  };

  const handleEditUser = (updatedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    setSelectedUser(null);
    setIsFormOpen(false);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div className="app">
      <h1>User Management Dashboard</h1>
      <a href='https://www.linkedin.com/in/saichandanyadav/' className='dev'>Follow Me</a>
      {error && <p className="error">{error}</p>}
      <UserList
        users={users}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsFormOpen(true);
        }}
        onDelete={handleDeleteUser}
        openForm={() => {
          setSelectedUser(null);
          setIsFormOpen(true);
        }}
      />
      {isFormOpen && (
        <UserFormModal
          user={selectedUser}
          onSave={selectedUser ? handleEditUser : handleAddUser}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
