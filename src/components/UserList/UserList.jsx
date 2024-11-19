import './UserList.css';

const UserList = ({ users, onEdit, onDelete, openForm }) => {
  return (
    <div className="user-list">
      <button onClick={openForm} className="add-btn">Add User</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="button-container">
                <button onClick={() => onEdit(user)} className="edit-btn">Edit</button>
                <button onClick={() => onDelete(user.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
