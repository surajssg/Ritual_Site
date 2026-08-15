import React, { useState } from 'react'

const links = ['Home', 'Categories', 'Offers', 'About', 'Contact']

const Navbar = () => {
  const [hover, setHover] = useState(null)
  const [q, setQ] = useState('')

  return (
    <nav style={styles.nav} aria-label="Main navigation">
      <ul style={styles.list}>
        {links.map((l, i) => (
          <li key={l} style={styles.item}>
            <a
              href={l === 'Contact' ? '/contact' : `#${l.toLowerCase()}`}
              onClick={(e) => {
                if (l === 'Contact') {
                  e.preventDefault()
                  window.dispatchEvent(new Event('openContactModal'))
                }
              }}
              style={{
                ...styles.link,
                color: hover === i ? '#ff7a00' : styles.link.color,
                transform: hover === i ? 'translateY(-2px)' : 'none',
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      <div style={styles.actions}>
        <div style={styles.searchWrap}>
          <input
            aria-label="Search"
            placeholder="Search foods, sweets, snacks..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={styles.search}
          />
        </div>

        <button style={styles.cart} aria-label="View cart">
          <span style={{ marginRight: 8 }}>🛒</span>
          <span style={styles.badge}>3</span>
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '6px 12px',
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: 18,
    alignItems: 'center',
  },
  item: {},
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 600,
    padding: '8px 10px',
    borderRadius: 8,
    transition: 'all 160ms ease',
  },
  actions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  searchWrap: {
    background: '#fff',
    borderRadius: 999,
    padding: 6,
    boxShadow: '0 6px 18px rgba(18,18,18,0.06)',
  },
  search: {
    padding: '8px 12px',
    borderRadius: 20,
    border: 'none',
    width: 240,
    outline: 'none',
    fontSize: 14,
  },
  cart: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 6px 18px rgba(255,122,0,0.14)',
  },
  badge: {
    background: '#fff',
    color: '#ff7a00',
    borderRadius: 999,
    padding: '2px 8px',
    fontWeight: 800,
    fontSize: 13,
  },
}

export default Navbar