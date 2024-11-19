import { useState, useEffect } from 'react';
import './Modal.css';

const UserFormModal = ({ user, onSave, onDelete, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      suite: '',
      city: '',
      zipcode: ''
    },
    phone: '',
    website: '',
    company: {
      name: ''
    }
  });

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedChange = (e, field) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [field]: { ...formData[field], [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{user ? 'Edit User' : 'Add User'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="text" name="street" placeholder="Street" value={formData.address.street} onChange={(e) => handleNestedChange(e, 'address')} />
          <input type="text" name="suite" placeholder="Suite" value={formData.address.suite} onChange={(e) => handleNestedChange(e, 'address')} />
          <input type="text" name="city" placeholder="City" value={formData.address.city} onChange={(e) => handleNestedChange(e, 'address')} />
          <input type="text" name="zipcode" placeholder="Zipcode" value={formData.address.zipcode} onChange={(e) => handleNestedChange(e, 'address')} />
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
          <input type="text" name="website" placeholder="Website" value={formData.website} onChange={handleChange} />
          <input type="text" name="name" placeholder="Company Name" value={formData.company.name} onChange={(e) => handleNestedChange(e, 'company')} />
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            {user && (
              <button type="button" onClick={handleDelete} className="delete-btn">Delete</button>
            )}
            <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
