
import './index.css'

import {
  Users,
  UserRound,
  BriefcaseBusiness,
  Star,
  ContactRound,
  Settings
} from 'lucide-react'

const Sidebar = ({activeFilter, onFilterChange}) => {

  const menuItems = [
    {label: 'All Contacts', value: 'All', icon: Users},
    {label: 'Personal', value: 'Personal', icon: UserRound},
    {label: 'Business', value: 'Business', icon: BriefcaseBusiness},
    {label: 'Favorites', value: 'Favorites', icon: Star}
  ]

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-icon">
          <ContactRound size={23} />
        </div>
        <h2>Connectly</h2>
      </div>

      <div className="sidebar-section">

        <p className="sidebar-label">MENU</p>

        {menuItems.map(each => {
          const Icon = each.icon

          return (
            <button
              key={each.value}
              className={`sidebar-item ${
                activeFilter === each.value ? 'active' : ''
              }`}
              onClick={() => onFilterChange(each.value)}
            >
              <Icon size={19} />
              <span>{each.label}</span>
            </button>
          )
        })}

      </div>

      <div className="sidebar-bottom">

        <div className="sidebar-profile">
          <div className="profile-avatar">S</div>

          <div>
            <h4>My Workspace</h4>
            <p>Contact Manager</p>
          </div>
        </div>

        <div className="sidebar-footer">
          <Settings size={16} />
          <span>Version 1.0.0</span>
        </div>

      </div>

    </aside>
  )
}

export default Sidebar
