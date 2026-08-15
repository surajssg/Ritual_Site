import React from 'react'

const formatPrice = (value) => new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
}).format(value)

const Cart = ({ items = [], isOpen = false, onClose, onUpdateQty, onRemoveItem }) => {
  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const deliveryCharge = items.length > 0 ? 49 : 0
  const total = subtotal + deliveryCharge

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <div>
            <div style={styles.kicker}>Your cart</div>
            <h3 style={styles.title}>{items.length} item{items.length === 1 ? '' : 's'}</h3>
          </div>
          <button type="button" style={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🛒</div>
            <p style={styles.emptyText}>Your cart is empty.</p>
            <p style={styles.emptySubtext}>Add products to see them here.</p>
          </div>
        ) : (
          <>
            <div style={styles.list}>
              {items.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <div style={styles.itemInfo}>
                    <div style={styles.itemThumb}>
                      <img src={item.image} alt={item.name} style={styles.itemImage} />
                    </div>
                    <div style={styles.itemText}>
                      <div style={styles.itemName}>{item.name}</div>
                      <div style={styles.itemPrice}>{formatPrice(item.price)}</div>
                    </div>
                  </div>

                  <div style={styles.qtyBlock}>
                    <button
                      type="button"
                      style={styles.qtyBtn}
                      onClick={() => onUpdateQty(item.id, -1)}
                      aria-label={`Decrease quantity for ${item.name}`}
                    >
                      −
                    </button>
                    <span style={styles.qtyValue}>{item.qty}</span>
                    <button
                      type="button"
                      style={styles.qtyBtn}
                      onClick={() => onUpdateQty(item.id, 1)}
                      aria-label={`Increase quantity for ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <div style={styles.rightCol}>
                    <div style={styles.itemTotal}>{formatPrice(item.price * item.qty)}</div>
                    <button
                      type="button"
                      style={styles.removeBtn}
                      onClick={() => onRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.summaryBox}>
              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <strong>{formatPrice(deliveryCharge)}</strong>
              </div>
              <div style={{ ...styles.summaryRow, ...styles.totalRow }}>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <button type="button" style={styles.checkoutBtn}>Proceed to checkout</button>
          </>
        )}
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(17, 24, 39, 0.45)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 100,
  },
  drawer: {
    width: '100%',
    maxWidth: 430,
    background: '#fff',
    height: '100vh',
    boxShadow: '-8px 0 30px rgba(15, 23, 42, 0.15)',
    padding: 20,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 16,
    borderBottom: '1px solid #f1f5f9',
  },
  kicker: {
    color: '#ff7a00',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  title: {
    margin: '6px 0 0',
    fontSize: 24,
    color: '#111827',
  },
  closeBtn: {
    border: 'none',
    background: '#fff7f0',
    color: '#111827',
    width: 36,
    height: 36,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: '#4b5563',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 700,
    color: '#111827',
    margin: 0,
  },
  emptySubtext: {
    margin: '8px 0 0',
    color: '#6b7280',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 14,
    borderBottom: '1px solid #f3f4f6',
  },
  itemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },
  itemThumb: {
    width: 54,
    height: 54,
    borderRadius: 12,
    overflow: 'hidden',
    background: '#fff7f0',
    flexShrink: 0,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  itemText: {
    minWidth: 0,
  },
  itemName: {
    fontWeight: 700,
    color: '#111827',
    marginBottom: 4,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemPrice: {
    fontSize: 13,
    color: '#ff7a00',
    fontWeight: 700,
  },
  qtyBlock: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #f1f5f9',
    borderRadius: 999,
    overflow: 'hidden',
  },
  qtyBtn: {
    border: 'none',
    background: '#fff7f0',
    color: '#111827',
    width: 28,
    height: 28,
    cursor: 'pointer',
    fontSize: 18,
    fontWeight: 700,
  },
  qtyValue: {
    width: 32,
    textAlign: 'center',
    fontWeight: 700,
    color: '#111827',
  },
  rightCol: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 8,
    minWidth: 96,
  },
  itemTotal: {
    minWidth: 76,
    textAlign: 'right',
    fontWeight: 800,
    color: '#111827',
  },
  removeBtn: {
    border: 'none',
    background: 'transparent',
    color: '#ef4444',
    cursor: 'pointer',
    fontWeight: 700,
    padding: 0,
    fontSize: 12,
  },
  summaryBox: {
    background: '#fffaf5',
    borderRadius: 16,
    padding: 16,
    marginTop: 18,
    border: '1px solid #ffe7ce',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    color: '#374151',
  },
  totalRow: {
    marginBottom: 0,
    paddingTop: 10,
    borderTop: '1px solid #fcd7b0',
    fontSize: 18,
    color: '#111827',
  },
  checkoutBtn: {
    marginTop: 18,
    width: '100%',
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '14px 16px',
    fontWeight: 800,
    fontSize: 16,
    cursor: 'pointer',
  },
}

export default Cart
