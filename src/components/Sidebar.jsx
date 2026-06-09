import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, BarChart2, Tag, LogOut } from 'lucide-react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/categories', label: 'Categories', icon: Tag },
]

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-60 flex flex-col fixed left-0 top-0 bg-[#0e1726] border-r border-white/5">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">ET</span>
          </div>
          <span className="text-white font-semibold text-sm tracking-wide">ExpenseTracker</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">Menu</p>
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all
              ${isActive
                ? 'bg-emerald-500/10 text-emerald-400 font-medium'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-gray-500'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User */}
      <div className="px-3 py-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <span className="text-emerald-400 text-xs font-semibold">H</span>
          </div>
          <div>
            <p className="text-white text-xs font-medium">Hasini</p>
            <p className="text-gray-600 text-[10px]">Student</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 hover:bg-white/5 w-full transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

    </div>
  )
}

export default Sidebar