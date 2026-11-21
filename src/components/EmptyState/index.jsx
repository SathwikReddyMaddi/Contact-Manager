
import './index.css'

import {Users, Search, Plus} from 'lucide-react'

const EmptyState = (props) => {

  const {isSearching, onAddContact} = props

  return (
    <div className="empty-state">

      <div className="empty-state-icon">
        {isSearching ? <Search size={34} /> : <Users size={34} />}
      </div>

      <h3>
        {isSearching ? 'No contacts found' : 'No contacts yet'}
      </h3>

      <p>
        {isSearching
          ? 'Try searching with a different name.'
          : 'Start building your contact list by adding someone.'}
      </p>

      {!isSearching && (
        <button
          className="empty-add-button"
          onClick={onAddContact}
        >
          <Plus size={17} />
          Add Your First Contact
        </button>
      )}

    </div>
  )
}

export default EmptyState
