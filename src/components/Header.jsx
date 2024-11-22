import React from 'react';

function Header({ activeTab, setActiveTab }) {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">RBAC Dashboard</h1>
        <nav>
          <button
            className={`mr-4 ${activeTab === 'users' ? 'font-bold' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={activeTab === 'roles' ? 'font-bold' : ''}
            onClick={() => setActiveTab('roles')}
          >
            Roles
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;

