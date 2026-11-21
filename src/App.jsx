
import {useEffect, useState} from 'react'

import './App.css'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import ContactCard from './components/ContactCard'
import ContactForm from './components/ContactForm'

import {
  Users,
  UserRound,
  BriefcaseBusiness,
  Star,
  ContactRound,
  SearchX
} from 'lucide-react'

const STORAGE_KEY = 'connectly_contacts'

const initialContacts = [
  {
    id: 1,
    name: 'Rahul Sharma',
    phone: '9876543210',
    email: 'rahul@gmail.com',
    category: 'Personal',
    favorite: true
  },
  {
    id: 2,
    name: 'Priya Reddy',
    phone: '9876501234',
    email: 'priya@gmail.com',
    category: 'Business',
    favorite: false
  },
  {
    id: 3,
    name: 'Arjun Kumar',
    phone: '9123456780',
    email: 'arjun@gmail.com',
    category: 'Personal',
    favorite: true
  },
  {
    id: 4,
    name: 'Sneha Rao',
    phone: '9988776655',
    email: 'sneha@gmail.com',
    category: 'Business',
    favorite: true
  },
  {
    id: 5,
    name: 'Karthik Reddy',
    phone: '9012345678',
    email: 'karthik@gmail.com',
    category: 'Personal',
    favorite: false
  },
  {
    id: 6,
    name: 'Ananya Mehta',
    phone: '9123456789',
    email: 'ananya@gmail.com',
    category: 'Business',
    favorite: false
  },
  {
    id: 7,
    name: 'Varun Patel',
    phone: '9345678120',
    email: 'varun@gmail.com',
    category: 'Personal',
    favorite: false
  },
  {
    id: 8,
    name: 'Meera Iyer',
    phone: '9567890123',
    email: 'meera@gmail.com',
    category: 'Business',
    favorite: true
  }
]

const App = () => {

  // Load contacts from localStorage or use demo contacts

  const [contacts, setContacts] = useState(() => {
    try {
      const savedContacts = localStorage.getItem(STORAGE_KEY)

      return savedContacts !== null
        ? JSON.parse(savedContacts)
        : initialContacts

    } catch {
      return initialContacts
    }
  })

  // Modal state

  const [isFormOpen, setIsFormOpen] = useState(false)

  // Store the contact currently being edited

  const [editingContact, setEditingContact] = useState(null)

  // Search state

  const [searchValue, setSearchValue] = useState('')

  // Category filter state

  const [activeFilter, setActiveFilter] = useState('All')

  // Save contacts whenever contacts change

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
  }, [contacts])

  // Add or update contact

  const onSaveContact = (contactData) => {

    if (editingContact) {

      setContacts(prevContacts =>
        prevContacts.map(each =>
          each.id === contactData.id ? contactData : each
        )
      )

    } else {

      setContacts(prevContacts => [...prevContacts, contactData])

    }

    closeForm()
  }

  // Open add contact modal

  const onOpenForm = () => {
    setEditingContact(null)
    setIsFormOpen(true)
  }

  // Open edit contact modal

  const onEditContact = (contact) => {
    setEditingContact(contact)
    setIsFormOpen(true)
  }

  // Close modal

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingContact(null)
  }

  // Delete contact

  const onDeleteContact = (id) => {

    const shouldDelete = window.confirm(
      'Are you sure you want to delete this contact?'
    )

    if (shouldDelete) {
      setContacts(prevContacts =>
        prevContacts.filter(each => each.id !== id)
      )
    }
  }

  // Toggle favorite

  const onToggleFavorite = (id) => {

    setContacts(prevContacts =>
      prevContacts.map(each =>
        each.id === id
          ? {...each, favorite: !each.favorite}
          : each
      )
    )
  }

  // Search and category filtering

  const filteredContacts = contacts.filter(each => {

    const matchesSearch = each.name
      .toLowerCase()
      .includes(searchValue.trim().toLowerCase())

    const matchesCategory =
      activeFilter === 'All' ||
      (activeFilter === 'Favorites' && each.favorite) ||
      each.category === activeFilter

    return matchesSearch && matchesCategory
  })

  // Statistics

  const totalContacts = contacts.length

  const personalCount = contacts.filter(
    each => each.category === 'Personal'
  ).length

  const businessCount = contacts.filter(
    each => each.category === 'Business'
  ).length

  const favoriteCount = contacts.filter(
    each => each.favorite
  ).length

  return (
    <div className="app-layout">

      <Sidebar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <main className="main-content">

        {/* Header */}

        <Header
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onOpenForm={onOpenForm}
        />

        {/* Statistics */}

        <section className="stats-container">

          <div className="stat-card">
            <div className="stat-icon purple">
              <Users size={22} />
            </div>

            <p>Total Contacts</p>
            <h2>{totalContacts}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue">
              <UserRound size={22} />
            </div>

            <p>Personal</p>
            <h2>{personalCount}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange">
              <BriefcaseBusiness size={22} />
            </div>

            <p>Business</p>
            <h2>{businessCount}</h2>
          </div>

          <div className="stat-card">
            <div className="stat-icon pink">
              <Star size={22} />
            </div>

            <p>Favorites</p>
            <h2>{favoriteCount}</h2>
          </div>

        </section>

        {/* Contacts */}

        <section className="contacts-section">

          <div className="contacts-heading">

            <div>
              <h2>
                {activeFilter === 'All'
                  ? 'All Contacts'
                  : activeFilter === 'Favorites'
                    ? 'Favorite Contacts'
                    : `${activeFilter} Contacts`}
              </h2>

              <p>
                {filteredContacts.length} contacts found
              </p>
            </div>

            <span className="contact-count">
              {filteredContacts.length} / {totalContacts}
            </span>

          </div>

          {filteredContacts.length === 0 ? (

            <div className="empty-placeholder">

              {contacts.length === 0 ? (
                <ContactRound size={48} />
              ) : (
                <SearchX size={48} />
              )}

              <h3>
                {contacts.length === 0
                  ? 'No contacts yet'
                  : 'No matching contacts'}
              </h3>

              <p>
                {contacts.length === 0
                  ? 'Start building your contact list by adding someone.'
                  : 'Try changing your search or category filter.'}
              </p>

              {contacts.length === 0 && (
                <button
                  className="empty-add-button"
                  onClick={onOpenForm}
                >
                  Add Your First Contact
                </button>
              )}

            </div>

          ) : (

            <div className="contacts-grid">

              {filteredContacts.map(eachContact => (

                <ContactCard
                  key={eachContact.id}
                  contact={eachContact}
                  onEdit={onEditContact}
                  onDelete={onDeleteContact}
                  onToggleFavorite={onToggleFavorite}
                />

              ))}

            </div>

          )}

        </section>

      </main>

      {/* Add / Edit Modal */}

      {isFormOpen && (
        <ContactForm
          onClose={closeForm}
          onSaveContact={onSaveContact}
          editingContact={editingContact}
        />
      )}

    </div>
  )
}

export default App
