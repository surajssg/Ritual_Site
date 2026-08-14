import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'

const categories = ['Frozen Foods', 'Sweets', 'Snacks', 'Namkeens']

const Home = () => {
  const logoSrc = '/logo.jpeg'
  const heroImages = [
    '/FrozenFoods/Cheese_Ball.jpeg',
    '/FrozenFoods/PaneerKurkure.jpeg',
    '/FrozenFoods/Sabudana_Vada.jpeg'
  ]
  const [index, setIndex] = useState(0)
  const intervalRef = useRef(null)

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
    'Frozen Foods': '/FrozenFoods/Cheese_Ball.jpeg',
    Sweets: '/FrozenFoods/sweets.webp',
    Snacks: '/FrozenFoods/snacks.webp',
    Namkeens: '/FrozenFoods/Namkeens.jpg',
    Meals: '/FrozenFoods/PaneerKurkure.jpeg',
  }

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logoSrc} alt="Ritual365 logo" style={styles.logo} />
          <div style={styles.brandText}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>Ritual365</div>
            <div style={{ fontSize: 12, color: '#666' }}>Quality foods, quick delivery</div>
          </div>
        </div>
        <div style={styles.navWrap}>
          <Navbar />
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <h1 style={styles.title}>Fresh & Delicious — Delivered To Your Door</h1>
            <p style={styles.subtitle}>
              Explore a wide range of Frozen Foods, Sweets, Snacks, Namkeens and more.
            </p>
            <div style={styles.ctaRow}>
              <a href="#categories" style={styles.cta}>Shop Now</a>
              <a href="#offers" style={styles.secondary}>Today's Offers</a>
            </div>
          </div>
          <div style={styles.heroGraphic} aria-hidden>
            <div style={styles.carousel}>
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
        <section id="team" style={styles.teamSection}>
          <h2 style={styles.sectionTitle}>Meet Our Team</h2>
          <div style={styles.teamGrid}>
            {[{
              name: 'Snehal Gaikwad', role: 'Founder & CEO'
            },{
              name: 'Suraj Gaikwad', role: 'Head of Operations'
            },{
              name: 'Neha Gupta', role: 'Head Chef'
            }].map((m) => (
              <div key={m.name} style={styles.teamCard}>
                <div style={styles.avatar} />
                <div style={{ fontWeight: 700, marginTop: 8 }}>{m.name}</div>
                <div style={{ color: '#666', fontSize: 13 }}>{m.role}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="testimonials" style={styles.testimonialsSection}>
          <h2 style={styles.sectionTitle}>What Customers Say</h2>
          <div style={styles.testGrid}>
            {[{
              quote: 'Amazing taste and fast delivery — my family loved the snacks!',
              name: 'Sana K.'
            },{
              quote: 'High quality frozen foods, reheats perfectly.',
              name: 'Amit R.'
            }].map((t, i) => (
              <div key={i} style={styles.testCard}>
                <div style={{ fontStyle: 'italic', color: '#333' }}>&ldquo;{t.quote}&rdquo;</div>
                <div style={{ marginTop: 8, fontWeight: 700 }}>{t.name}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" style={styles.categoriesSection}>
          <h2 style={styles.sectionTitle}>Popular Categories</h2>
          <div style={styles.categoriesGrid}>
            {categories.map((c) => (
              <div key={c} style={styles.categoryCard}>
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
      <footer style={styles.footer}>
        <div style={styles.footerContainer}>
          <div style={styles.footerBrand}>
            <div style={{ fontWeight: 900, fontSize: 18 }}>Ritual365</div>
            <div style={{ marginTop: 8, color: '#444' }}>shop 202 , Gultekdi Market Yard , Pune , 411 042</div>
            <div style={{ marginTop: 6 }}>
              Email: <a href="mailto:hello@ritual365.in" style={styles.link}>hello@ritual365.com</a>
            </div>
            <div>Phone: <a href="tel:+91 9763972505" style={styles.link}>+91 9763972505</a></div>
            <div>Website: <a href="https://ritual365.in" target="_blank" rel="noreferrer" style={styles.link}>ritual365.in</a></div>
          </div>
          <div style={styles.footerActions}>
            <button
              style={styles.contactBtn}
              onClick={() => (window.location.href = 'mailto:hello@ritual365.com')}
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

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
  brand: { display: 'flex', alignItems: 'center', gap: 12 },
  logo: { height: 56, width: 56, objectFit: 'cover', borderRadius: 8 },
  brandText: { lineHeight: 1 },
  navWrap: { display: 'flex', alignItems: 'center' },
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
  teamCard: { width: 200, background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 6px 18px rgba(18,18,18,0.04)' },
  avatar: { height: 96, width: 96, borderRadius: 96, background: '#ffe8d6', margin: '0 auto' },
  testimonialsSection: { padding: '36px 28px', background: '#fafafa' },
  testGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 16 },
  testCard: { background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 6px 18px rgba(18,18,18,0.04)' },
  tileGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 },
  tile: {
    background: '#fff',
    padding: 18,
    borderRadius: 12,
    boxShadow: '0 6px 18px rgba(18,18,18,0.06)',
    fontWeight: 700,
    color: '#333',
    textAlign: 'center',
  },
  categoriesSection: { padding: '28px', background: '#fafafa' },
  sectionTitle: { fontSize: 22, margin: '0 0 16px' },
  categoriesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 16 },
  categoryCard: {
    background: '#fff',
    borderRadius: 12,
    padding: 12,
    boxShadow: '0 6px 18px rgba(18,18,18,0.04)',
    textAlign: 'center',
  },
  categoryImage: {
    height: 96,
    borderRadius: 8,
    background: 'linear-gradient(135deg,#ffe8d6,#fff1e6)',
    marginBottom: 8,
  },
  categoryImg: { width: '100%', height: 96, objectFit: 'cover', borderRadius: 8, marginBottom: 8 },
  categoryName: { fontWeight: 700, color: '#333' },
}

export default Home