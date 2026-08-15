import React, { useState } from 'react'
import { frozenFoods } from './Foods/FrozenFoods'
import { sweets } from './Foods/Sweets'
import { snacks } from './Foods/Snacks'
import { namkeens } from './Foods/Namkeens'

// Add discount info to products
const addDiscounts = (products) => {
  return products.map((p) => ({
    ...p,
    originalPrice: p.price,
    discount: p.id % 3 === 0 ? 20 : p.id % 2 === 0 ? 15 : 10,
  }))
}

const frozenFoodsWithDiscount = addDiscounts(frozenFoods)
const sweetsWithDiscount = addDiscounts(sweets)
const snacksWithDiscount = addDiscounts(snacks)
const namkeemsWithDiscount = addDiscounts(namkeens)

// Get only products with discount >= 15%
const discountedProducts = [
  ...frozenFoodsWithDiscount.filter((p) => p.discount >= 15),
  ...sweetsWithDiscount.filter((p) => p.discount >= 15),
  ...snacksWithDiscount.filter((p) => p.discount >= 15),
  ...namkeemsWithDiscount.filter((p) => p.discount >= 15),
]

const Offers = ({ onAddToCart, cartItems = [] }) => {
  const getQty = (productId) => {
    const found = cartItems.find((item) => item.id === productId)
    return found ? found.qty : 0
  }

  return (
    <section id="offers" style={styles.section} className="offers-section">
      <style>{responsiveCss}</style>
      <div style={styles.headerRow}>
        <div>
          <div style={styles.kicker}>Limited Time</div>
          <h2 style={styles.title}>Hot Deals & Discounts</h2>
          <p style={styles.subtitle}>Save up to 20% on selected items</p>
        </div>
      </div>

      {discountedProducts.length === 0 ? (
        <div style={styles.emptyState}>No discounted items available right now.</div>
      ) : (
        <div style={styles.grid} className="offers-grid">
          {discountedProducts.map((product) => {
            const qty = getQty(product.id)
            const discountedPrice = Math.round(
              product.originalPrice * (1 - product.discount / 100)
            )

            return (
              <article key={product.id} style={styles.card} className="offer-card">
                <div style={styles.imageWrap}>
                  <img src={product.image} alt={product.name} style={styles.image} />
                  <span style={styles.badge}>{product.category}</span>
                  <span style={styles.discountBadge}>{product.discount}% OFF</span>
                </div>

                <div style={styles.cardBody}>
                  <div style={styles.metaRow}>
                    <span style={styles.categoryText}>{product.category}</span>
                    <span style={styles.rating}>★ 4.8</span>
                  </div>

                  <h3 style={styles.productName}>{product.name}</h3>
                  <p style={styles.description}>{product.description}</p>

                  <div style={styles.priceRow}>
                    <div>
                      <div style={styles.priceLabel}>Price</div>
                      <div style={styles.priceWrap}>
                        <span style={styles.originalPrice}>₹{product.originalPrice}</span>
                        <span style={styles.salePrice}>₹{discountedPrice}</span>
                      </div>
                    </div>

                    <div style={styles.actionWrap}>
                      {qty > 0 ? (
                        <div style={styles.qtyStepper}>
                          <button
                            type="button"
                            style={styles.stepBtn}
                            onClick={() => onAddToCart(product, -1)}
                            aria-label={`Decrease quantity for ${product.name}`}
                          >
                            −
                          </button>
                          <span style={styles.qtyBadge}>{qty}</span>
                          <button
                            type="button"
                            style={styles.stepBtn}
                            onClick={() => onAddToCart(product, 1)}
                            aria-label={`Increase quantity for ${product.name}`}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          style={styles.addButton}
                          onClick={() => onAddToCart(product, 1)}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

const responsiveCss = `
  @media (max-width: 1024px) {
    .offers-grid {
      grid-template-columns: repeat(3, minmax(180px, 1fr)) !important;
      gap: 14px !important;
    }
  }

  @media (max-width: 900px) {
    .offers-section {
      padding: 30px 18px !important;
    }

    .offers-grid {
      grid-template-columns: repeat(3, minmax(160px, 1fr)) !important;
      gap: 12px !important;
    }

    .offers-grid {
      gap: 12px !important;
    }
  }

  @media (max-width: 768px) {
    .offers-grid {
      grid-template-columns: repeat(2, minmax(140px, 1fr)) !important;
      gap: 10px !important;
    }
  }

  @media (max-width: 600px) {
    .offers-section {
      padding: 24px 14px !important;
    }

    .offer-card {
      min-width: 0;
    }

    .offers-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 10px !important;
    }
  }
`

const styles = {
  section: {
    padding: '40px 28px 28px',
    background: '#fff',
  },
  headerRow: {
    marginBottom: 22,
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
    margin: 0,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(200px, 1fr))',
    gap: 16,
    marginTop: 16,
    alignItems: 'stretch',
    width: '100%',
  },
  card: {
    background: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    boxShadow: '0 10px 24px rgba(15, 23, 42, 0.08)',
    border: '1px solid #f1f5f9',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 450,
    width: '100%',
  },
  imageWrap: {
    position: 'relative',
    height: 180,
    background: '#fff7f0',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    background: 'rgba(255, 122, 0, 0.92)',
    color: '#fff',
    padding: '6px 10px',
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 700,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: '#e63946',
    color: '#fff',
    padding: '8px 12px',
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 800,
    boxShadow: '0 4px 12px rgba(230, 57, 70, 0.3)',
  },
  cardBody: {
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#ff7a00',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  },
  rating: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: 700,
  },
  productName: {
    margin: '0 0 8px',
    fontSize: 20,
    color: '#111827',
  },
  description: {
    margin: '0 0 16px',
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 1.5,
    minHeight: 60,
    height: 60,
    overflow: 'hidden',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: 12,
    marginTop: 'auto',
  },
  priceLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  priceWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    textDecoration: 'line-through',
    color: '#999',
    fontSize: 14,
  },
  salePrice: {
    fontSize: 18,
    fontWeight: 800,
    color: '#e63946',
  },
  actionWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 6,
  },
  qtyStepper: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    border: '1px solid #f1f5f9',
    borderRadius: 999,
    padding: '4px',
    background: '#fff7f0',
  },
  stepBtn: {
    border: 'none',
    background: '#ff7a00',
    color: '#fff',
    width: 26,
    height: 26,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 16,
  },
  qtyBadge: {
    minWidth: 24,
    textAlign: 'center',
    fontWeight: 700,
  },
  addButton: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: 999,
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 13,
    boxShadow: '0 4px 12px rgba(255, 122, 0, 0.2)',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999',
    fontSize: 16,
  },
}

export default Offers
