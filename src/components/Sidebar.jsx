"use client";
import {
  BarChart2,
  CreditCard,
  FileText,
  Target,
  Settings,
  Cloud,
  LogOut,
} from "react-feather";

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: "Overview", icon: BarChart2, label: "Overview" },
    { id: "Transactions", icon: FileText, label: "Transactions" },
    { id: "Cards", icon: CreditCard, label: "Cards" },
    { id: "Invoices", icon: FileText, label: "Invoices" },
    { id: "Goals", icon: Target, label: "Goals" },
    { id: "Settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center text-white">
            <Cloud size={20} />
          </div>
          <div className="ml-3">
            <h2 className="text-lg font-semibold text-gray-800">TrustVault</h2>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-4 py-3 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
