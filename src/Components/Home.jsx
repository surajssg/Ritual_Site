import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Offers from "./Offers";
import Cart from "./Cart";
import AboutUs from "./AboutUs";

const categories = ["Frozen Foods", "Sweets", "Snacks", "Namkeens"];

const announcementText =
  "Tradition Frozen Fresh ✦ Authentic Ukadiche Modak ✦ Premium Maharashtrian Delicacies ✦ Pan India Delivery ✦";

const Home = () => {
  const logoSrc = "/logo.png";

  const heroImages = [
    "/ProductList Images/FrozenFoods/Cheese_Ball.jpeg",
    "/ProductList Images/FrozenFoods/Delicious Frozen Momos.jpg",
    "/ProductList Images/FrozenFoods/Frozen_Cutlets.jpg",
    "/ProductList Images/Sweets/Gulab Jamun-1.jpg",
    "/ProductList Images/Sweets/Kaju Katli-1.jpg",
    "/ProductList Images/Snacks and Namkeens/PaneerKurkure.jpeg",
  ];

  const [index, setIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const intervalRef = useRef(null);

  const addToCart = (product, change = 1) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (!existingItem) {
        return change > 0 ? [...items, { ...product, qty: 1 }] : items;
      }

      const nextQty = existingItem.qty + change;

      if (nextQty <= 0) {
        return items.filter((item) => item.id !== product.id);
      }

      return items.map((item) =>
        item.id === product.id ? { ...item, qty: nextQty } : item
      );
    });
  };

  const updateCartQty = (productId, change) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === productId
            ? { ...item, qty: item.qty + change }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    if (!heroImages.length) return undefined;

    intervalRef.current = setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [heroImages.length]);

  const prev = () => {
    setIndex(
      (currentIndex) =>
        (currentIndex - 1 + heroImages.length) % heroImages.length
    );
  };

  const next = () => {
    setIndex((currentIndex) => (currentIndex + 1) % heroImages.length);
  };

  const categoryImages = {
    "Frozen Foods": "/ProductList Images/FrozenFoods/Cheese_Ball.jpeg",
    Sweets: "/ProductList Images/Sweets/sweets.webp",
    Snacks: "/ProductList Images/Sweets/snacks.webp",
    Namkeens: "/ProductList Images/Snacks and Namkeens/Namkeens.jpg",
    Meals: "/ProductList Images/Snacks and Namkeens/PaneerKurkure.jpeg",
  };

  return (
    <div style={styles.page} className="home-page">
      <style>{responsiveCss}</style>

      <header style={styles.header} className="ritual-header">
        {/* Top scrolling announcement bar */}
        <div className="announcement-bar">
          <div className="announcement-track">
            <div className="announcement-group">
              <span className="announcement-content">{announcementText}</span>
              <span className="announcement-content">{announcementText}</span>
            </div>

            {/* Duplicate group creates the seamless marquee effect */}
            <div className="announcement-group" aria-hidden="true">
              <span className="announcement-content">{announcementText}</span>
              <span className="announcement-content">{announcementText}</span>
            </div>
          </div>
        </div>

        {/* Main navigation area */}
        <div className="header-main">
          <div style={styles.brand}>
            <img
              src={logoSrc}
              alt="Ritual365 logo"
              style={styles.logo}
            />
          </div>

          <div style={styles.navWrap} className="nav-wrap">
            <Navbar
              cartCount={cartItems.reduce(
                (total, item) => total + item.qty,
                0
              )}
              onCartClick={() => setIsCartOpen(true)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
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
            <h1 style={styles.title} className="home-title">
              Fresh & Delicious — Delivered To Your Door
            </h1>

            <p style={styles.subtitle} className="home-subtitle">
              Explore a wide range of Frozen Foods, Sweets, Snacks, Namkeens
              and more.
            </p>

            <div style={styles.ctaRow} className="home-cta-row">
              <a
                href="#products"
                style={styles.cta}
                className="home-cta"
              >
                Shop Now
              </a>

              <a
                href="#offers"
                style={styles.secondary}
                className="home-secondary"
              >
                Today's Offers
              </a>
            </div>
          </div>

          <div
            style={styles.heroGraphic}
            aria-hidden="true"
            className="home-hero-graphic"
          >
            <div style={styles.carousel} className="home-carousel">
              {heroImages.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`Ritual365 ${i + 1}`}
                  loading="lazy"
                  aria-hidden={i === index ? "false" : "true"}
                  style={{
                    ...styles.slideImg,
                    opacity: i === index ? 1 : 0,
                  }}
                />
              ))}

              <div style={styles.carouselOverlay} />

              <div style={styles.carouselControls}>
                <button
                  type="button"
                  onClick={prev}
                  style={styles.navBtn}
                  aria-label="Previous slide"
                >
                  ◀
                </button>

                <button
                  type="button"
                  onClick={next}
                  style={styles.navBtn}
                  aria-label="Next slide"
                >
                  ▶
                </button>
              </div>

              <div style={styles.dots}>
                {heroImages.map((_, i) => (
                  <button
                    type="button"
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

        <ProductList
          onAddToCart={addToCart}
          cartItems={cartItems}
          searchTerm={searchTerm}
        />

        <Offers onAddToCart={addToCart} cartItems={cartItems} />

        <section
          id="categories"
          style={styles.categoriesSection}
          className="home-categories-section"
        >
          <h2 style={styles.sectionTitle}>Popular Categories</h2>

          <div
            style={styles.categoriesGrid}
            className="home-categories-grid"
          >
            {categories.map((category) => (
              <div
                key={category}
                style={styles.categoryCard}
                className="home-category-card"
              >
                <img
                  src={categoryImages[category]}
                  alt={category}
                  loading="lazy"
                  style={styles.categoryImg}
                />

                <div style={styles.categoryName}>{category}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <AboutUs />

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/7038937367"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg
          viewBox="0 0 32 32"
          className="whatsapp-icon"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M19.11 17.21c-.29-.14-1.71-.84-1.98-.93-.27-.1-.47-.14-.67.14-.2.29-.76.93-.93 1.12-.17.2-.34.22-.63.08-.29-.14-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.2.05-.37-.02-.51-.07-.14-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.2 3.02c.14.2 2.07 3.16 5.02 4.43.7.3 1.24.48 1.66.61.7.22 1.34.19 1.84.12.56-.08 1.71-.7 1.95-1.37.24-.67.24-1.24.17-1.37-.07-.12-.26-.2-.55-.34z"
          />

          <path
            fill="currentColor"
            d="M16.02 3C8.83 3 3 8.74 3 15.82c0 2.28.61 4.51 1.77 6.47L3 29l6.89-1.75a13.1 13.1 0 0 0 6.13 1.51h.01C23.21 28.76 29 23.03 29 15.94 29 8.83 23.21 3 16.02 3zm0 23.67h-.01c-1.93 0-3.82-.52-5.47-1.5l-.39-.23-4.09 1.04 1.09-3.98-.25-.41a10.76 10.76 0 0 1-1.65-5.77C5.25 9.18 10.08 5.18 16.03 5.18c5.98 0 10.84 4.79 10.84 10.76 0 5.94-4.87 10.73-10.85 10.73z"
          />
        </svg>
      </a>
    </div>
  );
};

const responsiveCss = `
  .home-page {
    overflow-x: hidden;
  }

  /* =========================================
     ANNOUNCEMENT / MARQUEE BAR
     ========================================= */

  .announcement-bar {
    width: 100%;
    height: 34px;
    overflow: hidden;
    background: #d89b32;
    color: #ffffff;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }

  .announcement-track {
    display: flex;
    width: max-content;
    flex-shrink: 0;
    animation: announcementScroll 28s linear infinite;
    will-change: transform;
  }

  .announcement-group {
    display: flex;
    flex-shrink: 0;
  }

  .announcement-content {
    display: block;
    flex-shrink: 0;
    padding-right: 70px;
    font-size: 16px;
    font-weight: 500;
    line-height: 34px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
  }

  @keyframes announcementScroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }

  .announcement-bar:hover .announcement-track {
    animation-play-state: paused;
  }

  /* =========================================
     MAIN HEADER
     ========================================= */

  .header-main {
    width: 100%;
    min-height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
  }

  .nav-wrap {
    flex: 1;
    min-width: 0;
  }

  /* =========================================
     WHATSAPP FLOATING BUTTON
     ========================================= */

  .whatsapp-float {
    position: fixed;
    right: 22px;
    bottom: 22px;
    width: 58px;
    height: 58px;
    background: #25d366;
    color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    z-index: 9999;
    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.22);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .whatsapp-float:hover {
    transform: scale(1.08);
    box-shadow: 0 7px 22px rgba(0, 0, 0, 0.28);
  }

  .whatsapp-float:active {
    transform: scale(0.95);
  }

  .whatsapp-icon {
    width: 34px;
    height: 34px;
  }

  /* =========================================
     TABLET
     ========================================= */

  @media (max-width: 900px) {
    .header-main {
      flex-wrap: wrap;
    }

    .ritual-header {
      padding: 0;
    }

    .nav-wrap {
      width: 100%;
      flex: none;
    }

    .announcement-bar {
      height: 30px;
    }

    .announcement-content {
      padding-right: 50px;
      font-size: 13px;
      line-height: 30px;
    }

    .announcement-track {
      animation-duration: 22s;
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

  /* =========================================
     MOBILE
     ========================================= */

  @media (max-width: 600px) {
    .announcement-bar {
      height: 28px;
    }

    .announcement-content {
      padding-right: 40px;
      font-size: 11px;
      line-height: 28px;
    }

    .announcement-track {
      animation-duration: 18s;
    }

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

    .whatsapp-float {
      width: 52px;
      height: 52px;
      right: 16px;
      bottom: 16px;
    }

    .whatsapp-icon {
      width: 30px;
      height: 30px;
    }
  }
`;

const styles = {
  page: {
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    color: "#111",
    background: "#fff",
    paddingBottom: 24,
  },

  main: {},

  header: {
    width: "100%",
    background: "#fff",
    borderBottom: "1px solid #f0f0f0",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },

  brand: {
    display: "flex",
    alignItems: "center",
    padding: "0 0 0 28px",
  },

  logo: {
    height: 44,
    width: 44,
    objectFit: "cover",
    borderRadius: 10,
    boxShadow: "0 4px 12px rgba(255, 122, 0, 0.15)",
  },

  navWrap: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },

  hero: {
    display: "flex",
    gap: 24,
    alignItems: "center",
    padding: "48px 28px",
    background: "linear-gradient(90deg, #fff7f0 0%, #fff 100%)",
  },

  heroContent: {
    flex: 1,
    maxWidth: 720,
  },

  title: {
    fontSize: 38,
    margin: "0 0 12px",
    color: "#222",
  },

  subtitle: {
    fontSize: 16,
    margin: "0 0 20px",
    color: "#555",
  },

  ctaRow: {
    display: "flex",
    gap: 12,
  },

  cta: {
    display: "inline-block",
    background: "#ff7a00",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: 10,
    textDecoration: "none",
    fontWeight: 700,
  },

  secondary: {
    display: "inline-block",
    color: "#ff7a00",
    padding: "12px 18px",
    borderRadius: 10,
    textDecoration: "none",
    border: "1px solid #ffecd8",
    fontWeight: 700,
  },

  heroGraphic: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },

  carousel: {
    position: "relative",
    width: "100%",
    height: 280,
    borderRadius: 12,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 300,
  },

  slideImg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "opacity 800ms ease",
    willChange: "opacity",
  },

  carouselOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.12), rgba(255,255,255,0.02))",
    pointerEvents: "none",
  },

  carouselControls: {
    position: "absolute",
    right: 12,
    top: 12,
    display: "flex",
    gap: 8,
  },

  navBtn: {
    background: "rgba(255,255,255,0.85)",
    border: "none",
    padding: "6px 10px",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 14,
  },

  dots: {
    position: "absolute",
    bottom: 10,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: 8,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    background: "rgba(255,255,255,0.6)",
    border: "none",
    cursor: "pointer",
  },

  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 12,
    background: "#ff7a00",
    border: "none",
    cursor: "pointer",
  },

  categoryCard: {
    background: "#fff",
    borderRadius: 12,
    padding: 12,
    boxShadow: "0 6px 18px rgba(18,18,18,0.04)",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 170,
    overflow: "hidden",
    border: "1px solid #f0e8e1",
  },

  categoriesSection: {
    padding: "28px",
    background: "#fafafa",
  },

  sectionTitle: {
    fontSize: 22,
    margin: "0 0 16px",
  },

  categoriesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    alignItems: "stretch",
  },

  categoryImg: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 8,
    display: "block",
    background: "#f7f7f7",
  },

  categoryName: {
    fontWeight: 700,
    color: "#333",
  },
};

export default Home;
