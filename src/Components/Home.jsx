import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import ProductList from './ProductList'
import Offers from './Offers'
import Cart from './Cart'
import AboutUs from './AboutUs'

const categories = ['Frozen Foods', 'Sweets', 'Snacks', 'Namkeens']

const Home = () => {
  const logoSrc = '/logo.png'
  const heroImages = [
    '/ProductList Images/FrozenFoods/Cheese_Ball.jpeg',
    '/ProductList Images/FrozenFoods/Delicious Frozen Momos.jpg',
    '/ProductList Images/FrozenFoods/Frozen_Cutlets.jpg',
    '/ProductList Images/Sweets/Gulab Jamun-1.jpg',
    '/ProductList Images/Sweets/Kaju Katli-1.jpg',
    '/ProductList Images/Snacks and Namkeens/PaneerKurkure.jpeg',
  ]
  const [index, setIndex] = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const intervalRef = useRef(null)

  const addToCart = (product, change = 1) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id)

      if (!existingItem) {
        return change > 0 ? [...items, { ...product, qty: 1 }] : items
      }

      const nextQty = existingItem.qty + change

      if (nextQty <= 0) {
        return items.filter((item) => item.id !== product.id)
      }

      return items.map((item) =>
        item.id === product.id ? { ...item, qty: nextQty } : item
      )
    })
  }

  const updateCartQty = (productId, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty + change } : item
        )
        .filter((item) => item.qty > 0)
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId))
  }

  useEffect(() => {
    if (!heroImages.length) return
    intervalRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [])

  const prev = () => setIndex((i) => (i - 1 + heroImages.length) % heroImages.length)
  const next = () => setIndex((i) => (i + 1) % heroImages.length)

  const categoryImages = {
    'Frozen Foods': '/ProductList Images/FrozenFoods/Cheese_Ball.jpeg',
    Sweets: '/ProductList Images/Sweets/sweets.webp',
    Snacks: '/ProductList Images/Sweets/snacks.webp',
    Namkeens: '/ProductList Images/Snacks and Namkeens/Namkeens.jpg',
    Meals: '/ProductList Images/Snacks and Namkeens/PaneerKurkure.jpeg',
  }

  return (
    <div style={styles.page} className="home-page">
      <style>{responsiveCss}</style>
      <header style={styles.header} className="ritual-header">
        <div style={styles.brand}>
          <img src={logoSrc} alt="Ritual365 logo" style={styles.logo} />
          <div style={styles.brandText}>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#1f2937', letterSpacing: '-0.5px' }}>Ritual365</div>
            <div style={{ fontSize: 11, color: '#999', fontWeight: 500 }}>Quality foods, fast delivery</div>
          </div>
        </div>
        <div style={styles.navWrap} className="nav-wrap">
          <Navbar
            cartCount={cartItems.reduce((total, item) => total + item.qty, 0)}
            onCartClick={() => setIsCartOpen(true)}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        </div>
      </header>

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeFromCart}
      />

      <main style={styles.main} className="home-main">
        <section style={styles.hero} className="home-hero">
          <div style={styles.heroContent} className="home-hero-content">
            <h1 style={styles.title} className="home-title">Fresh & Delicious — Delivered To Your Door</h1>
            <p style={styles.subtitle} className="home-subtitle">
              Explore a wide range of Frozen Foods, Sweets, Snacks, Namkeens and more.
            </p>
            <div style={styles.ctaRow} className="home-cta-row">
              <a href="#products" style={styles.cta} className="home-cta">Shop Now</a>
              <a href="#offers" style={styles.secondary} className="home-secondary">Today's Offers</a>
            </div>
          </div>
          <div style={styles.heroGraphic} aria-hidden className="home-hero-graphic">
            <div style={styles.carousel} className="home-carousel">
              {heroImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Ritual365 ${i + 1}`}
                  loading="lazy"
                  aria-hidden={i === index ? 'false' : 'true'}
                  style={{
                    ...styles.slideImg,
                    opacity: i === index ? 1 : 0,
                  }}
                />
              ))}
              <div style={styles.carouselOverlay} />
              <div style={styles.carouselControls}>
                <button onClick={prev} style={styles.navBtn} aria-label="Previous slide">◀</button>
                <button onClick={next} style={styles.navBtn} aria-label="Next slide">▶</button>
              </div>
              <div style={styles.dots}>
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    style={i === index ? styles.dotActive : styles.dot}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
        <ProductList onAddToCart={addToCart} cartItems={cartItems} searchTerm={searchTerm} />

        <Offers onAddToCart={addToCart} cartItems={cartItems} />

        <section id="categories" style={styles.categoriesSection} className="home-categories-section">
          <h2 style={styles.sectionTitle}>Popular Categories</h2>
          <div style={styles.categoriesGrid} className="home-categories-grid">
            {categories.map((c) => (
              <div key={c} style={styles.categoryCard} className="home-category-card">
                <img
                  src={categoryImages[c]}
                  alt={c}
                  loading="lazy"
                  style={styles.categoryImg}
                />
                <div style={styles.categoryName}>{c}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <AboutUs />
    </div>
  )
}

const responsiveCss = `
  .home-page { overflow-x: hidden; }

  @media (max-width: 900px) {
    .ritual-header {
      flex-wrap: wrap;
      padding: 16px 18px;
      gap: 12px;
    }

    .nav-wrap {
      width: 100%;
    }

    .home-hero {
      flex-direction: column;
      padding: 30px 18px 24px;
    }

    .home-hero-content {
      max-width: 100%;
      text-align: center;
    }

    .home-title {
      font-size: 30px !important;
      line-height: 1.2;
    }

    .home-subtitle {
      font-size: 15px;
    }

    .home-cta-row {
      justify-content: center;
      flex-wrap: wrap;
    }

    .home-hero-graphic {
      width: 100%;
    }

    .home-carousel {
      min-width: 0;
      height: 250px;
    }

    .home-team-section,
    .home-testimonials-section,
    .home-categories-section {
      padding-left: 18px;
      padding-right: 18px;
    }

    .home-footer-container {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  @media (max-width: 600px) {
    .home-title {
      font-size: 26px !important;
    }

    .home-cta-row {
      flex-direction: column;
      width: 100%;
      gap: 10px;
    }

    .home-cta,
    .home-secondary {
      width: 100%;
      text-align: center;
      box-sizing: border-box;
    }

    .home-carousel {
      height: 210px;
    }

    .home-team-grid,
    .home-test-grid,
    .home-categories-grid {
      grid-template-columns: 1fr;
    }

    .home-team-card {
      width: 100%;
      max-width: 260px;
      margin: 0 auto;
    }
  }
`

const styles = {
  page: {
    fontFamily: 'Inter, system-ui, Arial, sans-serif',
    color: '#111',
    background: '#fff',
    paddingBottom: 24,
  },
  main: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 28px',
    borderBottom: '1px solid #f0f0f0',
    background: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 20,
  },
  brand: { display: 'flex', alignItems: 'center', gap: 14 },
  logo: { height: 52, width: 52, objectFit: 'cover', borderRadius: 10, boxShadow: '0 4px 12px rgba(255, 122, 0, 0.15)' },
  brandText: { lineHeight: 1.1 },
  navWrap: { display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' },
  hero: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
    padding: '48px 28px',
    background: 'linear-gradient(90deg, #fff7f0 0%, #fff 100%)',
  },
  heroContent: { flex: 1, maxWidth: 720 },
  title: { fontSize: 38, margin: '0 0 12px', color: '#222' },
  subtitle: { fontSize: 16, margin: '0 0 20px', color: '#555' },
  ctaRow: { display: 'flex', gap: 12 },
  cta: {
    display: 'inline-block',
    background: '#ff7a00',
    color: '#fff',
    padding: '12px 18px',
    borderRadius: 10,
    textDecoration: 'none',
    fontWeight: 700,
  },
  secondary: {
    display: 'inline-block',
    color: '#ff7a00',
    padding: '12px 18px',
    borderRadius: 10,
    textDecoration: 'none',
    border: '1px solid #ffecd8',
    fontWeight: 700,
  },
  heroGraphic: { flex: 1, display: 'flex', justifyContent: 'center' },
  carousel: {
    position: 'relative',
    width: '100%',
    height: 280,
    borderRadius: 12,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 300,
  },
  slide: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 800ms ease',
  },
  slideImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 800ms ease',
    willChange: 'opacity',
  },
  carouselOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(180deg, rgba(0,0,0,0.12), rgba(255,255,255,0.02))',
    pointerEvents: 'none',
  },
  carouselControls: { position: 'absolute', right: 12, top: 12, display: 'flex', gap: 8 },
  navBtn: {
    background: 'rgba(255,255,255,0.85)',
    border: 'none',
    padding: '6px 10px',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 14,
  },
  dots: { position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    background: 'rgba(255,255,255,0.6)',
    border: 'none',
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 12,
    background: '#ff7a00',
    border: 'none',
  },
  footer: {
    borderTop: '1px solid #eee',
    background: '#fff',
    padding: '28px 20px',
  },
  footerContainer: {
    maxWidth: 1100,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  footerBrand: { color: '#222' },
  footerActions: { display: 'flex', alignItems: 'center', gap: 12 },
  contactBtn: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    padding: '12px 18px',
    borderRadius: 8,
    cursor: 'pointer',
    fontWeight: 700,
  },
  link: { color: '#ff7a00', textDecoration: 'none' },
  teamSection: { padding: '36px 28px', background: '#fff' },
  teamGrid: { display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap', marginTop: 16 },
  teamCard: { width: 200, background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 6px 18px rgba(18,18,18,0.04)', textAlign: 'center' },
  avatar: { height: 96, width: 96, borderRadius: 96, background: '#ffe8d6', margin: '0 auto', objectFit: 'cover', border: '1px solid #f0f0f0' },
  testimonialsSection: { padding: '36px 28px', background: '#fafafa' },
  testGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 16 },
  testCard: { background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 6px 18px rgba(18,18,18,0.04)' },
  categoryCard: {
    background: '#fff',
    borderRadius: 12,
    padding: 12,
    boxShadow: '0 6px 18px rgba(18,18,18,0.04)',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 170,
    overflow: 'hidden',
    border: '1px solid #f0e8e1',
  },
  categoriesSection: { padding: '28px', background: '#fafafa' },
  sectionTitle: { fontSize: 22, margin: '0 0 16px' },
  categoriesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 16,
    alignItems: 'stretch',
  },
  categoryImg: {
    width: '100%',
    height: 120,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 8,
    display: 'block',
    background: '#f7f7f7',
  },
  categoryName: { fontWeight: 700, color: '#333' },
}

export default Home