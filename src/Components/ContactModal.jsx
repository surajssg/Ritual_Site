import React, { useEffect, useRef, useState } from 'react'

const ContactModal = ({ onClose }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const dialogRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    // trap focus inside modal
    const prev = document.activeElement
    dialogRef.current?.focus()
    return () => prev?.focus()
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const to = 'hello@ritual365.com'
    const subject = encodeURIComponent('Contact from Ritual365 website')
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    // fallback to mailto — opens user's mail client
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
    onClose()
  }

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        ref={dialogRef}
        tabIndex={-1}
        style={styles.card}
      >
        <h3 style={{ margin: 0, marginBottom: 8 }}>Contact Us</h3>
        <p style={{ marginTop: 0, color: '#666' }}>Send us a message and we'll get back to you.</p>
        <form onSubmit={submit}>
          <div style={styles.row}>
            <input
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
            <input
              required
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>
          <div>
            <textarea
              required
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.textarea}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
            <button type="button" onClick={onClose} style={styles.btnSecondary}>Cancel</button>
            <button type="submit" style={styles.btnPrimary}>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  card: {
    width: 640,
    maxWidth: '95%',
    background: '#fff',
    borderRadius: 12,
    padding: 20,
    boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
  },
  row: { display: 'flex', gap: 12, marginTop: 8 },
  input: {
    flex: 1,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #e6e6e6',
    fontSize: 14,
  },
  textarea: {
    width: '100%',
    minHeight: 120,
    padding: 12,
    borderRadius: 8,
    border: '1px solid #e6e6e6',
    marginTop: 8,
    fontSize: 14,
  },
  btnPrimary: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 700,
  },
  btnSecondary: {
    background: '#f3f4f6',
    color: '#111',
    border: 'none',
    padding: '10px 16px',
    borderRadius: 8,
    cursor: 'pointer',
  },
}

export default ContactModal
