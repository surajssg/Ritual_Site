import React, { useState } from "react";
import Navbar from "./Navbar";
import ProductList from "./ProductList";
import Offers from "./Offers";
import Cart from "./Cart";
import AboutUs from "./AboutUs";

const trustBarItems = [
  "Authentic Taste",
  "Premium Quality",
  "Freshly Packed",
  "Hygienic & Safe",
  "Delivery in Pune & PAN India",
];

const shopCategories = [
  {
    name: "Namkeen",
    href: "#products",
    image: "/ProductList Images/Snacks and Namkeens/Namkeens.jpg",
  },
  {
    name: "Sweets",
    href: "#products",
    image: "/ProductList Images/Sweets/sweets.webp",
  },
  {
    name: "Bakery",
    href: "#products",
    image: "/ProductList Images/Sweets/snacks.webp",
  },
  {
    name: "Frozen Foods",
    href: "#products",
    image: "/ProductList Images/FrozenFoods/Cheese_Ball.jpeg",
  },
  {
    name: "Chutneys & Pickles",
    href: "#products",
    image: "/ProductList Images/Snacks and Namkeens/PaneerKurkure.jpeg",
  },
  {
    name: "Gift Hampers",
    href: "#products",
    image: "/logo.png",
  },
];

const whyPoints = [
  {
    title: "Traditional Recipes",
    text: "Time-honoured recipes prepared with care for every celebration.",
  },
  {
    title: "Premium Ingredients",
    text: "Selected nuts, spices and grains for rich, honest flavour.",
  },
  {
    title: "Hygienic & Safe",
    text: "Clean kitchens and sealed packing you can trust at home.",
  },
  {
    title: "Loved by Thousands",
    text: "Families across Pune and India choose Ritual365 every day.",
  },
];

const Home = () => {
  const logoSrc = "/logo.png";
  const heroBannerSrc = "/Home_Page_Banner.png";
  const singleOrderBg = "/Single_Order_Background_Image.png";
  const bulkOrderBg = "/Bul_Order_Background_Image.png";

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
          item.id === productId ? { ...item, qty: item.qty + change } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const openContact = () => {
    window.dispatchEvent(new Event("openContactModal"));
  };

  return (
    <div style={styles.page} className="home-page" id="home">
      <style>{responsiveCss}</style>

      <header style={styles.header} className="ritual-header">
        <div className="trust-bar">
          {trustBarItems.map((item) => (
            <span key={item} className="trust-bar-item">
              {item}
            </span>
          ))}
        </div>

        <div className="header-main">
          <div style={styles.brand}>
            <img src={logoSrc} alt="Ritual365 logo" style={styles.logo} />
            <div>
              <div className="brand-name">Ritual365</div>
              <div className="brand-tagline">Celebrate Every Moment</div>
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
        </div>
      </header>

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQty={updateCartQty}
        onRemoveItem={removeFromCart}
      />

      <main className="home-main">
        <section
          className="home-hero"
          style={{ backgroundImage: `url("${heroBannerSrc}")` }}
        >
          <div className="home-hero-copy">
            <h1 className="home-title">
              Authentic Flavors, Delivered with{" "}
              <span className="home-title-accent">Love</span>
            </h1>
            <p className="home-subtitle">
              From traditional snacks to festive sweets, we bring you the
              best – fresh, pure & delicious.
            </p>
            <div className="hero-badges">
              <span>100% Fresh & Pure</span>
              <span>No Added Preservatives</span>
              <span>Made with Love & Care</span>
            </div>
            <a href="#products" className="hero-cta">
              Explore Products →
            </a>
          </div>
        </section>

        <section className="order-section" id="order-type">
          <h2 className="section-heading">What are you looking for today?</h2>
          <p className="section-kicker">Choose the best way to shop with us.</p>

          <div className="order-grid">
            <article
              className="order-card"
              style={{ backgroundImage: `url("${singleOrderBg}")` }}
            >
              <div className="order-card-copy">
                <div className="order-icon order-icon-orange" aria-hidden="true">
                  🛍️
                </div>
                <h3>Single Order</h3>
                <p className="order-label">For Home & Personal Use</p>
                <p>
                  Perfect for daily cravings, family treats or gifting your
                  loved ones.
                </p>
                <a href="#products" className="order-btn order-btn-orange">
                  Shop Now →
                </a>
              </div>
            </article>

            <article
              className="order-card"
              style={{ backgroundImage: `url("${bulkOrderBg}")` }}
            >
              <div className="order-card-copy">
                <div className="order-icon order-icon-green" aria-hidden="true">
                  📦
                </div>
                <h3>Bulk Order</h3>
                <p className="order-label">For Business & Corporate</p>
                <p>
                  Special pricing for bulk orders, events, retailers &
                  corporate gifting.
                </p>
                <button
                  type="button"
                  className="order-btn order-btn-green"
                  onClick={openContact}
                >
                  Order in Bulk →
                </button>
              </div>
            </article>
          </div>
        </section>

        <section id="categories" className="shop-section">
          <h2 className="section-heading">Shop by Category</h2>
          <div className="shop-grid">
            {shopCategories.map((category) => (
              <a
                key={category.name}
                href={category.href}
                className="shop-item"
              >
                <img src={category.image} alt={category.name} />
                <div className="shop-item-name">{category.name}</div>
                <span className="shop-item-link">View All →</span>
              </a>
            ))}
          </div>
        </section>

        <ProductList
          onAddToCart={addToCart}
          cartItems={cartItems}
          searchTerm={searchTerm}
        />

        <Offers onAddToCart={addToCart} cartItems={cartItems} />

        <section className="service-strip">
          <div className="service-item">
            <strong>Free Delivery</strong>
            <span>On orders above ₹499</span>
          </div>
          <div className="service-item">
            <strong>Secure Packaging</strong>
            <span>Safe & hygienic delivery</span>
          </div>
          <div className="service-item">
            <strong>Pan India Delivery</strong>
            <span>Fast & reliable shipping</span>
          </div>
          <div className="service-item">
            <strong>Easy & Secure Payment</strong>
            <span>Multiple payment options</span>
          </div>
        </section>

        <section className="why-section">
          <div className="why-copy">
            <h2 className="section-heading why-title">
              Bringing <span>Tradition</span> to Your Table
            </h2>
            <p>
              Ritual365 is built around everyday celebrations — snacks,
              sweets and frozen favourites made to taste homemade, stay
              fresh, and arrive ready to share.
            </p>
            <div className="why-points">
              {whyPoints.map((point) => (
                <div key={point.title} className="why-point">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            className="why-image"
            src={singleOrderBg}
            alt="Ritual365 snacks and sweets arranged for sharing"
          />
        </section>
      </main>

      <AboutUs hideFooter />

      <section className="platform-strip">
        <span>ORDER ON YOUR FAVOURITE PLATFORMS</span>
        <div className="platform-links">
          <a
            href="https://www.swiggy.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Swiggy
          </a>
          <a
            href="https://www.zomato.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Zomato
          </a>
        </div>
      </section>

      <section className="contact-strip">
        <div className="social-row">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            Facebook
          </a>
          <a
            href="https://wa.me/7038937367"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            WhatsApp
          </a>
        </div>
        <div className="contact-row">
          <a href="tel:+919763972505">+91 9763972505</a>
          <a href="mailto:hello@ritual365.com">hello@ritual365.com</a>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-grid">
          <div>
            <img src={logoSrc} alt="" className="footer-logo" />
            <strong>Ritual365</strong>
            <p>Celebrate Every Moment.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#categories">Categories</a>
            <a href="#offers">Offers</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <button type="button" onClick={openContact}>
              Bulk Order
            </button>
            <button type="button" onClick={openContact}>
              Contact Us
            </button>
          </div>
          <div>
            <h4>Help</h4>
            <a href="#about">Shipping & Delivery</a>
            <a href="#about">Returns & Refunds</a>
            <a href="#about">FAQs</a>
          </div>
          <div>
            <h4>Stay Updated</h4>
            <p>Subscribe to get special offers & updates</p>
            <form
              className="subscribe-form"
              onSubmit={(event) => event.preventDefault()}
            >
              <input type="email" placeholder="Your email" aria-label="Email" />
              <button type="submit" aria-label="Subscribe">
                →
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Ritual365. All Rights Reserved.</span>
          <span>Made with ❤️ for Every Celebration</span>
        </div>
      </footer>

      <a
        href="https://wa.me/7038937367"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <svg viewBox="0 0 32 32" className="whatsapp-icon" aria-hidden="true">
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
    background: #fffaf4;
  }

  .trust-bar {
    display: flex;
    justify-content: center;
    gap: 0;
    background: #f6efe6;
    color: #5b4636;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
    border-bottom: 1px solid #eadfce;
  }

  .trust-bar-item {
    padding: 8px 18px;
    border-right: 1px solid #eadfce;
    white-space: nowrap;
  }

  .trust-bar-item:last-child {
    border-right: none;
  }

  .header-main {
    width: 100%;
    min-height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    padding-right: 8px;
  }

  .brand-name {
    font-family: "Playfair Display", Georgia, serif;
    font-size: 22px;
    font-weight: 700;
    color: #2b2118;
    line-height: 1.1;
  }

  .brand-tagline {
    font-size: 11px;
    color: #8a7462;
    letter-spacing: 0.04em;
  }

  .nav-wrap {
    flex: 1;
    min-width: 0;
  }

  .home-hero {
    position: relative;
    min-height: 560px;
    background-size: cover;
    background-position: center right;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    padding: 64px 7vw;
  }

  .home-hero::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, rgba(250,244,236,0.94) 0%, rgba(250,244,236,0.72) 34%, rgba(250,244,236,0.12) 58%, transparent 72%);
  }

  .home-hero-copy {
    position: relative;
    z-index: 1;
    max-width: 560px;
  }

  .home-title {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(36px, 5vw, 58px);
    line-height: 1.15;
    color: #3a2a1d;
    margin: 0 0 16px;
  }

  .home-title-accent {
    color: #e06b1a;
  }

  .home-subtitle {
    font-size: 17px;
    color: #5c4a3b;
    line-height: 1.7;
    margin-bottom: 22px;
  }

  .hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 16px;
    margin-bottom: 28px;
    color: #4d3c2e;
    font-size: 13px;
    font-weight: 700;
  }

  .hero-cta {
    display: inline-block;
    background: #e06b1a;
    color: #fff;
    text-decoration: none;
    font-weight: 800;
    padding: 14px 22px;
    border-radius: 10px;
    box-shadow: 0 10px 22px rgba(224, 107, 26, 0.28);
  }

  .order-section,
  .shop-section,
  .why-section {
    padding: 56px 7vw 20px;
  }

  .section-heading {
    font-family: "Playfair Display", Georgia, serif;
    font-size: clamp(28px, 3vw, 40px);
    text-align: center;
    color: #2f241b;
    margin: 0 0 8px;
  }

  .section-kicker {
    text-align: center;
    color: #7a6757;
    margin-bottom: 28px;
  }

  .order-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .order-card {
    min-height: 280px;
    border-radius: 22px;
    background-size: cover;
    background-position: right center;
    overflow: hidden;
    box-shadow: 0 12px 30px rgba(40, 24, 12, 0.08);
    display: flex;
    align-items: center;
    padding: 32px;
  }

  .order-card-copy {
    max-width: 280px;
    color: #3a2a1d;
  }

  .order-card h3 {
    margin: 10px 0 4px;
    font-size: 28px;
    font-family: "Playfair Display", Georgia, serif;
  }

  .order-label {
    font-weight: 800;
    margin-bottom: 8px;
  }

  .order-card p {
    color: #5c4a3b;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .order-icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
  }

  .order-icon-orange { background: #f4d3b0; }
  .order-icon-green { background: #d7ead8; }

  .order-btn {
    display: inline-block;
    background: #fff;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 800;
    text-decoration: none;
    cursor: pointer;
    font: inherit;
  }

  .order-btn-orange {
    color: #e06b1a;
    border: 1px solid #e06b1a;
  }

  .order-btn-green {
    color: #2f6b3a;
    border: 1px solid #2f6b3a;
  }

  .shop-grid {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 18px;
    margin-top: 28px;
  }

  .shop-item {
    text-align: center;
    text-decoration: none;
    color: inherit;
  }

  .shop-item img {
    width: 132px;
    height: 132px;
    margin: 0 auto 12px;
    object-fit: cover;
    border-radius: 50%;
    border: 6px solid #fff;
    box-shadow: 0 10px 24px rgba(40, 24, 12, 0.12);
    background: #fff;
  }

  .shop-item-name {
    font-weight: 800;
    color: #2f241b;
  }

  .shop-item-link {
    color: #e06b1a;
    font-size: 13px;
    font-weight: 700;
  }

  .service-strip {
    margin: 36px 0 0;
    padding: 28px 7vw;
    background: #c9ae86;
    color: #3a2a1d;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .service-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .why-section {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 36px;
    align-items: center;
    padding-bottom: 48px;
  }

  .why-title {
    text-align: left;
  }

  .why-title span {
    color: #e06b1a;
  }

  .why-copy > p {
    color: #5c4a3b;
    line-height: 1.7;
    margin: 12px 0 24px;
  }

  .why-points {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
  }

  .why-point h3 {
    margin: 0 0 6px;
    font-size: 16px;
  }

  .why-point p {
    color: #6b5848;
    font-size: 14px;
    line-height: 1.55;
  }

  .why-image {
    width: 100%;
    height: 420px;
    object-fit: cover;
    object-position: right center;
    border-radius: 20px;
  }

  .platform-strip {
    background: #1f4d32;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
    padding: 16px 24px;
    font-weight: 800;
    letter-spacing: 0.08em;
    font-size: 13px;
  }

  .platform-links {
    display: flex;
    gap: 12px;
  }

  .platform-links a {
    background: #fff;
    color: #1f4d32;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 8px;
    font-weight: 800;
  }

  .contact-strip {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 7vw;
    background: #f3eadf;
    color: #3a2a1d;
    font-weight: 700;
  }

  .social-row,
  .contact-row,
  .footer-grid a,
  .footer-grid button {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .contact-strip a,
  .footer-grid a,
  .footer-grid button {
    color: inherit;
    text-decoration: none;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }

  .site-footer {
    background: #3a2618;
    color: #f3eadf;
    padding: 42px 7vw 18px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 1fr 1.3fr;
    gap: 24px;
  }

  .footer-grid h4 {
    margin: 0 0 12px;
    color: #fff;
  }

  .footer-grid a,
  .footer-grid button,
  .footer-grid p {
    display: block;
    margin-bottom: 8px;
    color: #e7d8c6;
  }

  .footer-logo {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 10px;
  }

  .subscribe-form {
    display: flex;
    margin-top: 10px;
  }

  .subscribe-form input {
    flex: 1;
    border: none;
    padding: 10px 12px;
    border-radius: 8px 0 0 8px;
  }

  .subscribe-form button {
    background: #e06b1a;
    color: #fff;
    border: none;
    padding: 10px 14px;
    border-radius: 0 8px 8px 0;
    cursor: pointer;
    font-weight: 800;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 28px;
    padding-top: 16px;
    border-top: 1px solid rgba(255,255,255,0.12);
    font-size: 13px;
  }

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
  }

  .whatsapp-icon {
    width: 34px;
    height: 34px;
  }

  @media (max-width: 1100px) {
    .shop-grid,
    .service-strip,
    .footer-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .why-section,
    .order-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 900px) {
    .header-main {
      flex-wrap: wrap;
    }

    .nav-wrap {
      width: 100%;
      flex: none;
    }

    .trust-bar {
      overflow-x: auto;
      justify-content: flex-start;
    }

    .home-hero {
      min-height: 460px;
      padding: 40px 18px;
      background-position: 70% center;
    }

    .order-section,
    .shop-section,
    .why-section,
    .service-strip,
    .contact-strip,
    .site-footer {
      padding-left: 18px;
      padding-right: 18px;
    }

    .shop-item img {
      width: 110px;
      height: 110px;
    }
  }

  @media (max-width: 600px) {
    .shop-grid,
    .service-strip,
    .why-points,
    .footer-grid {
      grid-template-columns: 1fr;
    }

    .platform-strip,
    .contact-strip,
    .footer-bottom {
      flex-direction: column;
      text-align: center;
    }

    .order-card {
      min-height: 240px;
      padding: 22px;
      background-position: 80% center;
    }

    .why-image {
      height: 240px;
    }

    .whatsapp-float {
      width: 52px;
      height: 52px;
      right: 16px;
      bottom: 16px;
    }
  }
`;

const styles = {
  page: {
    fontFamily: "Inter, system-ui, Arial, sans-serif",
    color: "#111",
    background: "#fffaf4",
  },
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
    gap: 10,
    padding: "8px 0 8px 22px",
    minWidth: 180,
  },
  logo: {
    height: 46,
    width: 46,
    objectFit: "cover",
    borderRadius: 10,
  },
  navWrap: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-end",
  },
};

export default Home;
