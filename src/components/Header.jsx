"use client"

import { Bell, User, LogOut } from "react-feather"

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-end px-6">
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
        </button>
        <div className="flex items-center">
          <div className="mr-2 text-sm font-medium">{user ? `${user.firstName} ${user.lastName}` : "Guest"}</div>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
        {user && (
          <button
            onClick={onLogout}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 flex items-center"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
