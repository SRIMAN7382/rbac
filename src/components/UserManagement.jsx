import React, { useState } from 'react';

function UserManagement({ users, roles, addUser, updateUser, deleteUser }) {
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '', status: 'active' });
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = (e) => {
    e.preventDefault();
    addUser(newUser);
    setNewUser({ name: '', email: '', role: '', status: 'active' });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    updateUser(editingUser);
    setEditingUser(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      
      {/* Add User Form */}
      <form onSubmit={handleAddUser} className="mb-8 bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Add New User</h3>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        >
          <option value="">Select Role</option>
          {roles.map(role => (
            <option key={role.id} value={role.name}>{role.name}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add User</button>
      </form>

      {/* User List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">User List</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.status}</td>
                <td>
                  <button
                    onClick={() => setEditingUser(user)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleUpdateUser} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Edit User</h3>
            <input
              type="text"
              placeholder="Name"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            />
            <select
              value={editingUser.role}
              onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
            <select
              value={editingUser.status}
              onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
            <button type="button" onClick={() => setEditingUser(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default UserManagement;

