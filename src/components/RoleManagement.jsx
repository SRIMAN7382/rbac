import React, { useState } from 'react';

function RoleManagement({ roles, addRole, updateRole, deleteRole }) {
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null);

  const allPermissions = ['read', 'write', 'delete'];

  const handleAddRole = (e) => {
    e.preventDefault();
    addRole(newRole);
    setNewRole({ name: '', permissions: [] });
  };

  const handleUpdateRole = (e) => {
    e.preventDefault();
    updateRole(editingRole);
    setEditingRole(null);
  };

  const handlePermissionChange = (permission, roleState, setRoleState) => {
    const updatedPermissions = roleState.permissions.includes(permission)
      ? roleState.permissions.filter(p => p !== permission)
      : [...roleState.permissions, permission];
    setRoleState({ ...roleState, permissions: updatedPermissions });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Role Management</h2>
      
      {/* Add Role Form */}
      <form onSubmit={handleAddRole} className="mb-8 bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Add New Role</h3>
        <input
          type="text"
          placeholder="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          className="block w-full p-2 mb-2 border rounded"
          required
        />
        <div className="mb-2">
          <p className="font-semibold">Permissions:</p>
          {allPermissions.map(permission => (
            <label key={permission} className="block">
              <input
                type="checkbox"
                checked={newRole.permissions.includes(permission)}
                onChange={() => handlePermissionChange(permission, newRole, setNewRole)}
                className="mr-2"
              />
              {permission}
            </label>
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Role</button>
      </form>

      {/* Role List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold mb-2">Role List</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Permissions</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map(role => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(', ')}</td>
                <td>
                  <button
                    onClick={() => setEditingRole(role)}
                    className="text-blue-500 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRole(role.id)}
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

      {/* Edit Role Modal */}
      {editingRole && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <form onSubmit={handleUpdateRole} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Edit Role</h3>
            <input
              type="text"
              placeholder="Role Name"
              value={editingRole.name}
              onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
              className="block w-full p-2 mb-2 border rounded"
              required
            />
            <div className="mb-2">
              <p className="font-semibold">Permissions:</p>
              {allPermissions.map(permission => (
                <label key={permission} className="block">
                  <input
                    type="checkbox"
                    checked={editingRole.permissions.includes(permission)}
                    onChange={() => handlePermissionChange(permission, editingRole, setEditingRole)}
                    className="mr-2"
                  />
                  {permission}
                </label>
              ))}
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
            <button type="button" onClick={() => setEditingRole(null)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default RoleManagement;

