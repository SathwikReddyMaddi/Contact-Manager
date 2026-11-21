
import './index.css'

import {Search, Plus, Bell} from 'lucide-react'

const Header = ({searchValue, onSearchChange, onOpenForm}) => {

  return (
    <header className="dashboard-header">

      <div className="header-title">
        <h1>My Contacts</h1>
        <p>Manage and organize your connections.</p>
      </div>

      <div className="header-actions">

        <div className="search-box">
          <Search size={19} />

          <input
            type="search"
            placeholder="Search contacts..."
            value={searchValue}
            onChange={event => onSearchChange(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="notification-button"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={20} />
        </button>

        <button
          type="button"
          className="add-contact-button"
          onClick={onOpenForm}
        >
          <Plus size={19} />
          Add Contact
        </button>

      </div>

    </header>
  )
}

export default Header
