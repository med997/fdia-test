import { LayoutDashboard, ShoppingBag, ShoppingCart, Users, Settings, HelpCircle, LogOut, Package2, X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentView, onNavigate }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 z-40 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between px-8 py-8">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-lg text-white">
                <Package2 className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-none">UltimateAdmin</span>
                <span className="text-xs text-gray-400 mt-1">Inventory System</span>
              </div>
            </div>
            <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
            <div className="mb-8">
              <button 
                onClick={() => onNavigate('Dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  currentView === 'Dashboard' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </button>
              
              <button 
                onClick={() => onNavigate('Products')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors mt-1 ${
                  currentView === 'Products' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <ShoppingBag className="w-5 h-5" />
                Products
              </button>
              
              <button 
                onClick={() => onNavigate('Orders')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors mt-1 ${
                  currentView === 'Orders' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                Orders
              </button>
              
              <button 
                onClick={() => onNavigate('Users')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors mt-1 ${
                  currentView === 'Users' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Users className="w-5 h-5" />
                Users
              </button>
            </div>

            <div className="mt-8">
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Settings</h3>
              
              <button 
                onClick={() => onNavigate('Configuration')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  currentView === 'Configuration' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Settings className="w-5 h-5" />
                Configuration
              </button>
              
              <button 
                onClick={() => onNavigate('Help Center')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors mt-1 ${
                  currentView === 'Help Center' 
                    ? 'bg-indigo-600 text-white shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <HelpCircle className="w-5 h-5" />
                Help Center
              </button>
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                  alt="Avatar" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">Mohammed Adnan</p>
                <p className="text-xs text-gray-500 truncate">Senior Software Eng</p>
              </div>
              <LogOut className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
