import React from 'react'

export const frozenFoods = [
  {
    id: 1,
    name: 'Cheese Corn Ball',
    category: 'Frozen Foods',
    price: 249,
    image: '/ProductList%20Images/FrozenFoods/Cheese_Ball.jpeg',
    description: 'Crispy, cheesy and perfect for quick family snacking.',
  },
  {
    id: 2,
    name: 'Paneer Kurkure',
    category: 'Frozen Foods',
    price: 289,
    image: '/ProductList%20Images/Snacks%20and%20Namkeens/PaneerKurkure.jpeg',
    description: 'Golden fried paneer bites with a crunchy, savory finish.',
  },
  {
    id: 3,
    name: 'Sabudana Vada',
    category: 'Frozen Foods',
    price: 199,
    image: '/ProductList%20Images/FrozenFoods/Sabudana_Vada.jpeg',
    description: 'Traditional taste, ready in minutes for a quick bite.',
  },
  {
    id: 4,
    name: 'Frozen Samosa',
    category: 'Frozen Foods',
    price: 219,
    image: '/ProductList%20Images/FrozenFoods/Frozen%20Samosa%20Img-3.jpg',
    description: 'Flaky, savory and ideal for a crispy evening snack.',
  },
  {
    id: 5,
    name: 'Frozen Momos',
    category: 'Frozen Foods',
    price: 269,
    image: '/ProductList%20Images/FrozenFoods/Frozen%20Momo%20img-2.jpg',
    description: 'Soft dumplings with a rich filling, ready to steam or fry.',
  },
]

const FrozenFoods = ({ onAddToCart, cartItems = [], searchTerm = '' }) => {
  const getQty = (productId) => {
    const found = cartItems.find((item) => item.id === productId)
    return found ? found.qty : 0
  }

  const filteredProducts = searchTerm
    ? frozenFoods.filter((product) => {
        const text = `${product.name} ${product.category} ${product.description}`.toLowerCase()
        return text.includes(searchTerm.toLowerCase())
      })
    : frozenFoods

  if (!filteredProducts.length) {
    return <div style={styles.emptyState}>No frozen food items match your search.</div>
  }

  return (
    <div style={styles.grid} className="product-grid">
      {filteredProducts.map((product) => {
        const qty = getQty(product.id)

        return (
          <article key={product.id} style={styles.card} className="product-card">
            <div style={styles.imageWrap}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <span style={styles.badge}>{product.category}</span>
            </div>

            <div style={styles.cardBody}>
              <div style={styles.metaRow}>
                <span style={styles.categoryText}>{product.category}</span>
                <span style={styles.rating}>★ 4.8</span>
              </div>

              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>

              <div style={styles.footerRow}>
                <div>
                  <div style={styles.priceLabel}>Price</div>
                  <div style={styles.price}>₹{product.price}</div>
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
  )
}

const styles = {
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
    minHeight: 420,
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
  footerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    gap: 12,
    marginTop: 'auto',
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
    background: '#fff',
    color: '#ff7a00',
    borderRadius: 999,
    padding: '4px 8px',
    fontSize: 11,
    fontWeight: 800,
    minWidth: 40,
    textAlign: 'center',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  price: {
    color: '#111827',
    fontSize: 24,
    fontWeight: 800,
  },
  addButton: {
    border: 'none',
    background: '#ff7a00',
    color: '#fff',
    borderRadius: 10,
    padding: '10px 14px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 8px 20px rgba(255, 122, 0, 0.2)',
  },
}

const responsiveCss = `
  @media (max-width: 1024px) {
    .product-grid {
      grid-template-columns: repeat(3, minmax(180px, 1fr)) !important;
      gap: 14px !important;
    }
  }

  @media (max-width: 900px) {
    .product-grid {
      grid-template-columns: repeat(3, minmax(160px, 1fr)) !important;
      gap: 12px !important;
    }
  }

  @media (max-width: 768px) {
    .product-grid {
      grid-template-columns: repeat(2, minmax(140px, 1fr)) !important;
      gap: 10px !important;
    }
  }

  @media (max-width: 600px) {
    .product-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 10px !important;
    }
  }
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.innerHTML = responsiveCss
  document.head.appendChild(style)
}

export default FrozenFoods