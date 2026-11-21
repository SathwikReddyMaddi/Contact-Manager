
import './index.css'

import {useState} from 'react'

import {
  X,
  User,
  Phone,
  Mail,
  Briefcase
} from 'lucide-react'

const ContactForm = ({
  onClose,
  onSaveContact,
  editingContact
}) => {

  const [name, setName] = useState(editingContact?.name || '')
  const [phone, setPhone] = useState(editingContact?.phone || '')
  const [email, setEmail] = useState(editingContact?.email || '')
  const [category, setCategory] = useState(
    editingContact?.category || 'Personal'
  )

  const onSubmitForm = (event) => {
    event.preventDefault()

    const contactData = {
      id: editingContact?.id || Date.now(),
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      category,
      favorite: editingContact?.favorite || false
    }

    onSaveContact(contactData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="contact-modal"
        onClick={event => event.stopPropagation()}
      >

        <div className="modal-header">

          <div>
            <h2>
              {editingContact ? 'Edit Contact' : 'Add New Contact'}
            </h2>

            <p>
              {editingContact
                ? 'Update your contact information.'
                : 'Enter the details of your new contact.'}
            </p>
          </div>

          <button
            type="button"
            className="close-modal"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={21} />
          </button>

        </div>

        <form onSubmit={onSubmitForm}>

          <div className="form-group">

            <label htmlFor="contact-name">Full Name</label>

            <div className="form-input">
              <User size={18} />

              <input
                id="contact-name"
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={event => setName(event.target.value)}
                required
                maxLength={60}
                autoFocus
              />
            </div>

          </div>

          <div className="form-group">

            <label htmlFor="contact-phone">Phone Number</label>

            <div className="form-input">
              <Phone size={18} />

              <input
                id="contact-phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={event => setPhone(event.target.value)}
                required
                maxLength={20}
              />
            </div>

          </div>

          <div className="form-group">

            <label htmlFor="contact-email">Email Address</label>

            <div className="form-input">
              <Mail size={18} />

              <input
                id="contact-email"
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={event => setEmail(event.target.value)}
                required
                maxLength={100}
              />
            </div>

          </div>

          <div className="form-group">

            <label htmlFor="contact-category">Category</label>

            <div className="form-input">
              <Briefcase size={18} />

              <select
                id="contact-category"
                value={category}
                onChange={event => setCategory(event.target.value)}
              >
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
              </select>

            </div>

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="save-button">
              {editingContact ? 'Update Contact' : 'Save Contact'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}

export default ContactForm
