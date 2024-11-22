import React, { useState } from 'react';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import Header from './components/Header';
import './styles/globals.css';

// Mock data
const initialUsers = [
  { id: 1, name: 'SRIMAN', email: 'sriman@gmail.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Ram', email: 'ram@example.com', role: 'user', status: 'active' },
];

const initialRoles = [
  { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'user', permissions: ['read'] },
  { id: 3, name: 'editor', permissions: ['read', 'write'] },
];

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [activeTab, setActiveTab] = useState('users');

  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const addRole = (role) => {
    setRoles([...roles, { ...role, id: roles.length + 1 }]);
  };

  const updateRole = (updatedRole) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role));
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto mt-8 p-4">
        {activeTab === 'users' ? (
          <UserManagement
            users={users}
            roles={roles}
            addUser={addUser}
            updateUser={updateUser}
            deleteUser={deleteUser}
          />
        ) : (
          <RoleManagement
            roles={roles}
            addRole={addRole}
            updateRole={updateRole}
            deleteRole={deleteRole}
          />
        )}
      </main>
    </div>
  );
}

export default App;

