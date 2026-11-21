
import './index.css'

import {
  Phone,
  Mail,
  Star,
  Pencil,
  Trash2
} from 'lucide-react'

const ContactCard = ({
  contact,
  onEdit,
  onDelete,
  onToggleFavorite
}) => {

  const {id, name, phone, email, category, favorite} = contact

  const initial = name.charAt(0).toUpperCase()

  return (
    <article className="contact-card">

      <div className="contact-card-top">

        <div className={`contact-avatar ${category.toLowerCase()}`}>
          {initial}
        </div>

        <button
          type="button"
          className={`favorite-button ${favorite ? 'is-favorite' : ''}`}
          onClick={() => onToggleFavorite(id)}
          aria-label={favorite ? 'Remove favorite' : 'Add favorite'}
          title={favorite ? 'Remove favorite' : 'Add favorite'}
        >
          <Star size={19} fill={favorite ? 'currentColor' : 'none'} />
        </button>

      </div>

      <div className="contact-info">

        <div className="contact-name-row">
          <h3>{name}</h3>
        </div>

        <span className={`category-badge ${category.toLowerCase()}`}>
          {category}
        </span>

        <div className="contact-detail">
          <Phone size={15} />
          <span>{phone}</span>
        </div>

        <div className="contact-detail">
          <Mail size={15} />
          <span>{email}</span>
        </div>

      </div>

      <div className="contact-card-footer">

        <span className="contact-id">ID: {String(id).slice(-6)}</span>

        <div className="contact-actions">

          <button
            type="button"
            className="edit-button"
            onClick={() => onEdit(contact)}
            title="Edit contact"
            aria-label="Edit contact"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(id)}
            title="Delete contact"
            aria-label="Delete contact"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </article>
  )
}

export default ContactCard
