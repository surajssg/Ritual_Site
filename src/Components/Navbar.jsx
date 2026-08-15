import React, { useState } from 'react'
import UserProfile from './UserProfile'
import { frozenFoods } from './Foods/FrozenFoods'
import { sweets } from './Foods/Sweets'
import { snacks } from './Foods/Snacks'
import { namkeens } from './Foods/Namkeens'

const allProducts = [...frozenFoods, ...sweets, ...snacks, ...namkeens]

const links = ['Home', 'Categories', 'Offers', 'About', 'Contact']

const Navbar = ({ cartCount = 0, onCartClick, searchTerm = '', onSearchChange }) => {
  const [hover, setHover] = useState(null)
  const [q, setQ] = useState(searchTerm)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activePage, setActivePage] = useState('home')

  const closeMenu = () => setMobileOpen(false)

  const getActivePage = (link) => {
    if (link === 'Home') return activePage === 'home'
    if (link === 'Categories') return activePage === 'categories'
    if (link === 'Offers') return activePage === 'offers'
    if (link === 'About') return activePage === 'about'
    return false
  }

  React.useEffect(() => {
    setQ(searchTerm)
  }, [searchTerm])

  return (
    <>
      <style>{responsiveCss}</style>
      <nav style={styles.nav} className="main-nav" aria-label="Main navigation">
        <button
          type="button"
          className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((value) => !value)}
          style={styles.menuButton}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-panel ${mobileOpen ? 'open' : ''}`} style={styles.navPanel}>
          <ul style={styles.list} className="nav-list">
            {links.map((l, i) => {
              const isActive = getActivePage(l)
              const isOffers = l === 'Offers'
              return (
                <li key={l} style={styles.item}>
                  <a
                    href={l === 'Contact' ? '/contact' : l === 'About' ? '#about' : `#${l.toLowerCase()}`}
                    onClick={(e) => {
                      if (l === 'Contact') {
                        e.preventDefault()
                        window.dispatchEvent(new Event('openContactModal'))
                      }
                      if (l === 'About') {
                        e.preventDefault()
                        const section = document.getElementById('about')
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }
                      }
                      setActivePage(l.toLowerCase())
                      closeMenu()
                    }}
                    style={{
                      ...styles.link,
                      ...(isActive ? styles.linkActive : {}),
                      color: isActive ? '#ff7a00' : hover === i ? '#ff7a00' : styles.link.color,
                      transform: hover === i ? 'translateY(-2px)' : 'none',
                      background: isActive ? 'rgba(255, 122, 0, 0.08)' : hover === i ? 'rgba(255, 122, 0, 0.04)' : 'transparent',
                    }}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                  >
                    {isOffers ? `${l} 🔥` : l}
                  </a>
                </li>
              )
            })}
          </ul>

          <div style={styles.actions} className="nav-actions">
            <div style={styles.searchForm} className="nav-search-form">
              <div style={styles.searchWrap} className="nav-search-wrap">
                <span style={styles.searchIcon}>🔍</span>
                <input
                  aria-label="Search"
                  placeholder="Search products..."
                  value={q}
                  onChange={(e) => {
                    const val = e.target.value
                    setQ(val)
                    if (onSearchChange) {
                      onSearchChange(val.trim())
                    }
                  }}
                  style={styles.search}
                  className="nav-search"
                  autoComplete="off"
                />
              </div>
              {q.trim() && (
                <div style={styles.searchResults}>
                  {allProducts
                    .filter((p) =>
                      `${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase())
                    )
                    .slice(0, 5)
                    .map((product) => (
                      <div key={product.id} style={styles.resultItem}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={styles.resultImg}
                        />
                        <div style={styles.resultInfo}>
                          <div style={styles.resultName}>{product.name}</div>
                          <div style={styles.resultMeta}>
                            {product.category} • ₹{product.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  {allProducts.filter((p) =>
                    `${p.name} ${p.category}`.toLowerCase().includes(q.toLowerCase())
                  ).length === 0 && (
                    <div style={styles.noResults}>No products found</div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              style={styles.cart}
              aria-label="View cart"
              onClick={onCartClick}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)' )}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)' )}
            >
              <span style={{ marginRight: 6, fontSize: 18 }}>🛒</span>
              <span style={styles.cartLabel}>Cart</span>
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </button>

            <UserProfile />
          </div>
        </div>
      </nav>
    </>
  )
}

const responsiveCss = `
  .main-nav {
    position: relative;
  }

  .nav-toggle {
    display: none;
  }

  .nav-panel {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 20px;
  }

  @media (max-width: 900px) {
    .nav-panel {
      display: none !important;
    }

    .nav-panel.open {
      display: flex !important;
    }

    .main-nav {
      width: 100%;
    }

    .nav-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 5px;
      width: 42px;
      height: 42px;
      border: 1px solid #f1e2d5;
      border-radius: 10px;
      background: #fff7f0;
      cursor: pointer;
      padding: 0;
      margin-left: auto;
      z-index: 30;
    }

    .nav-toggle span {
      display: block;
      width: 20px;
      height: 2px;
      background: #222;
      border-radius: 2px;
      transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .nav-toggle.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }

    .nav-toggle.open span:nth-child(2) {
      opacity: 0;
    }

    .nav-toggle.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .nav-panel {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: min(300px, 90vw);
      background: rgba(255,255,255,0.99);
      border: 1px solid #f2e7dc;
      border-radius: 16px;
      box-shadow: 0 14px 30px rgba(20,20,20,0.15);
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
      padding: 14px 12px;
      z-index: 100;
      max-height: calc(100vh - 80px);
      overflow-y: auto;
    }

    .nav-panel.open {
      display: flex;
    }

    .nav-list {
      display: flex;
      flex-direction: column;
      align-items: stretch;
      width: 100%;
      gap: 8px;
    }

    .nav-list li {
      width: 100%;
    }

    .nav-list a {
      display: block;
      width: 100%;
      box-sizing: border-box;
      padding: 10px 12px;
      font-size: 14px !important;
    }

    .nav-actions {
      width: 100%;
      margin-left: 0;
      flex-direction: column;
      align-items: stretch;
      gap: 10px;
    }

    .nav-search-wrap,
    .nav-search {
      width: 100%;
      box-sizing: border-box;
    }

    .nav-search {
      min-width: 0;
    }

    .nav-search-form {
      position: relative;
      width: 100%;
    }
  }

  @media (max-width: 600px) {
    .nav-list a {
      padding: 8px 10px !important;
      font-size: 13px !important;
    }

    .nav-search-wrap {
      padding: 6px 8px !important;
    }

    .nav-search-wrap input {
      font-size: 13px !important;
      padding: 8px 10px !important;
    }
  }
`

const styles = {
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: '6px 12px',
    width: '100%',
    justifyContent: 'flex-end',
  },
  navPanel: {
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  list: {
    display: 'flex',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    gap: 18,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  item: {},
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 700,
    padding: '8px 14px',
    borderRadius: 8,
    transition: 'all 160ms ease',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  linkActive: {
    color: '#ff7a00',
    fontWeight: 800,
    borderBottom: '2px solid #ff7a00',
    paddingBottom: '6px',
  },
  actions: {
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    position: 'relative',
    width: 'fit-content',
  },
  searchWrap: {
    background: '#fff',
    borderRadius: 12,
    padding: '8px 12px',
    boxShadow: '0 4px 16px rgba(18,18,18,0.08)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: '1px solid #f0e8e1',
    transition: 'all 160ms ease',
  },
  searchIcon: {
    fontSize: 16,
    cursor: 'pointer',
  },
  search: {
    padding: '6px 8px',
    border: 'none',
    width: 220,
    outline: 'none',
    fontSize: 14,
    background: 'transparent',
  },
  searchResults: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    minWidth: 320,
    background: '#fff',
    border: '1px solid #f1f5f9',
    borderRadius: 12,
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.12)',
    zIndex: 50,
    maxHeight: 360,
    overflowY: 'auto',
  },
  resultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 12px',
    borderBottom: '1px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'background 160ms ease',
  },
  resultImg: {
    width: 48,
    height: 48,
    borderRadius: 8,
    objectFit: 'cover',
    background: '#fff7f0',
  },
  resultInfo: {
    flex: 1,
    minWidth: 0,
  },
  resultName: {
    fontSize: 14,
    fontWeight: 600,
    color: '#111827',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  resultMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  noResults: {
    padding: '20px 12px',
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
  },
  cart: {
    background: 'linear-gradient(135deg, #ff7a00 0%, #ff9433 100%)',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    boxShadow: '0 6px 20px rgba(255, 122, 0, 0.25)',
    fontWeight: 700,
    transition: 'all 160ms ease',
    transform: 'scale(1)',
  },
  cartLabel: {
    fontWeight: 800,
    fontSize: 13,
  },
  badge: {
    background: '#fff',
    color: '#ff7a00',
    borderRadius: 999,
    padding: '2px 8px',
    fontWeight: 800,
    fontSize: 13,
  },
  menuButton: {},
}

export default Navbar