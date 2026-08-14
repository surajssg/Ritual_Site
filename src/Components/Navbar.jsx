import React from 'react'

const links = ['Home', 'Categories', 'Offers', 'About', 'Contact']

const Navbar = () => {
  return (
    <nav style={styles.nav} aria-label="Main navigation">
      <ul style={styles.list}>
        {links.map((l) => (
          <li key={l} style={styles.item}>
            <a href={`#${l.toLowerCase()}`} style={styles.link}>
              {l}
            </a>
          </li>
        ))}
      </ul>
      <div style={styles.actions}>
        <input
          aria-label="Search"
          placeholder="Search foods, sweets, snacks..."
          style={styles.search}
        />
        <button style={styles.cart} aria-label="View cart">
          🛒
        </button>
      </div>
    </nav>
  )
}

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: 12,
  },
  item: {},
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 600,
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  search: {
    padding: '8px 12px',
    borderRadius: 20,
    border: '1px solid #e6e6e6',
    width: 220,
  },
  cart: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
  },
}

export default Navbar