import React, { useState } from 'react'
import FrozenFoods from './Foods/FrozenFoods'
import Namkeens from './Foods/Namkeens'
import Snacks from './Foods/Snacks'
import Sweets from './Foods/Sweets'

const categoryConfig = [
  { key: 'frozen-foods', label: 'Frozen Foods', Component: FrozenFoods },
  { key: 'sweets', label: 'Sweets', Component: Sweets },
  { key: 'snacks', label: 'Snacks', Component: Snacks },
  { key: 'namkeens', label: 'Namkeens', Component: Namkeens },
]

const ProductList = ({ onAddToCart, cartItems = [], searchTerm = '' }) => {
  const [openCategory, setOpenCategory] = useState({})

  const toggleCategory = (categoryKey) => {
    setOpenCategory((prev) => ({
      ...prev,
      [categoryKey]: !prev[categoryKey],
    }))
  }

  const normalizedSearch = searchTerm.trim().toLowerCase()

  return (
    <section id="products" style={styles.section} className="product-section">
      <style>{responsiveCss}</style>
      <div style={styles.headerRow}>
        <div>
          <div style={styles.kicker}>Fresh picks</div>
          <h2 style={styles.title}>Popular food items</h2>
        </div>
        <a href="#categories" style={styles.viewAll}>View all categories</a>
      </div>

      <div style={styles.categoryList} className="product-category-list">
        {categoryConfig.map(({ key, label, Component }) => {
          const isOpen = !!openCategory[key]

          return (
            <div key={key} style={styles.categoryBlock} className="product-category-block">
              <button
                type="button"
                style={styles.categoryToggle}
                onClick={() => toggleCategory(key)}
                aria-expanded={isOpen}
              >
                <span>{label}</span>
                <span style={styles.toggleIcon}>{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen || !normalizedSearch ? (
                <div style={styles.categoryContent}>
                  <Component
                    onAddToCart={onAddToCart}
                    cartItems={cartItems}
                    searchTerm={normalizedSearch}
                  />
                </div>
              ) : (
                <div style={styles.collapsedNote}>Expand on clicking + to View Products</div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

const responsiveCss = `
  @media (max-width: 900px) {
    .product-section {
      padding: 30px 18px !important;
    }

    .product-category-list {
      gap: 12px !important;
    }
  }

  @media (max-width: 600px) {
    .product-section {
      padding: 24px 14px !important;
    }

    .product-card {
      min-width: 0;
    }
  }
`

const styles = {
  section: {
    padding: '40px 28px 28px',
    background: '#fff',
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: 16,
    marginBottom: 22,
    flexWrap: 'wrap',
  },
  kicker: {
    color: '#ff7a00',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 800,
    color: '#1f2937',
  },
  viewAll: {
    color: '#ff7a00',
    textDecoration: 'none',
    fontWeight: 700,
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  categoryBlock: {
    border: '1px solid #f1f5f9',
    borderRadius: 18,
    background: '#fff',
    overflow: 'hidden',
    boxShadow: '0 8px 20px rgba(15, 23, 42, 0.04)',
  },
  categoryToggle: {
    width: '100%',
    border: 'none',
    background: '#fff7f0',
    color: '#1f2937',
    padding: '18px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 800,
    cursor: 'pointer',
    textAlign: 'left',
  },
  toggleIcon: {
    width: 28,
    height: 28,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: '#ff7a00',
    color: '#fff',
    fontSize: 22,
    fontWeight: 700,
    lineHeight: 1,
  },
  categoryContent: {
    padding: '0 18px 18px',
    background: '#fff',
  },
  collapsedNote: {
    padding: '0 20px 18px',
    color: '#6b7280',
    fontSize: 13,
    background: '#fff',
    fontStyle: 'italic',
  },
}

export default ProductList
