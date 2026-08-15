import React, { useEffect, useState } from 'react'

const teamMembers = [
  {
    name: 'Snehal Gaikwad',
    role: 'Founder & CEO',
    image: '/Team/Snehal%20Gaikwad_Photo.jpeg',
    info: 'Food Technologist and food industry professional with 5+ years of experience in food quality control, research and development, nutrition, and food consulting. She focuses on maintaining product quality, developing new food products, and ensuring that every Ritual365 product meets high standards of taste, quality, and nutrition.',
  },
  {
    name: 'Suraj Gaikwad',
    role: 'Head of Technology & Operations',
    image: '/Team/Suraj_Gaikwad_Photo.jpeg',
    info: 'Technology professional with a strong background in full-stack application development and digital solutions. Currently focused on React-based applications, with over 3 years of professional experience working with .NET technologies including ASP.NET, .NET Core, C#, and SQL Server. At Ritual365, he contributes to technology, digital operations, website development, and building scalable solutions to support the brand’s growth.',
  },
  {
    name: 'Neha Gupta',
    role: 'Head Chef',
    image: '/Team/girl.jpg',
    info: 'Passionate chef focused on creating delicious, consistent, and flavourful food products. She brings creativity and attention to detail to recipe development while ensuring that every product delivers a satisfying taste experience.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Head of Supply & Procurement',
    image: '/Team/Arjun%20Mehta%20IMG.jpg',
    info: 'Responsible for sourcing quality ingredients, coordinating with suppliers, and maintaining an efficient supply chain. He focuses on ensuring the availability of high-quality raw materials while keeping procurement processes reliable and cost-effective.',
  },
  {
    name: 'Kavya Sharma',
    role: 'Brand & Customer Experience Lead',
    image: '/Team/Kavya%20Sharma%20IMG.jpg',
    info: 'Focused on building the Ritual365 brand and creating a great customer experience. She works across branding, customer engagement, and product presentation to make every interaction with Ritual365 simple, memorable, and enjoyable.',
  },
]

const testimonials = [
  {
    quote: 'Amazing taste and fast delivery — my family loved the snacks!',
    name: 'Sana K.',
  },
  {
    quote: 'The taste was genuinely amazing! Everything felt fresh, flavorful, and perfectly prepared. My whole family enjoyed it, and we will definitely be ordering again.',
    name: 'Sana K.',
  },
  {
    quote: 'Ritual365 has become our go-to option for evening snacks. The flavors are delicious, the packaging is neat, and the quality is much better than what we have tried elsewhere.',
    name: 'Priya S.',
  },
  {
    quote: 'I was pleasantly surprised by the freshness and taste of the frozen foods. They cook up quickly and taste like they were made from scratch. Highly recommend!',
    name: 'Amit R.',
  },
  {
    quote: 'Ordered snacks for a family get-together and everyone loved them! The taste was delicious, portions were good, and everything arrived well-packed and fresh. Will definitely order again.',
    name: 'Rohan M.',
  },
  {
    quote: 'What I liked most was the combination of taste and convenience. The snacks are quick to prepare but still have that fresh, homemade-style flavor. Highly recommended!',
    name: 'Neha P.',
  },
]

const AboutUs = () => {
  const [teamIndex, setTeamIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    const teamTimer = setInterval(() => {
      setTeamIndex((current) => (current + 1) % teamMembers.length)
    }, 3500)

    return () => clearInterval(teamTimer)
  }, [])

  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setTestimonialIndex((current) => (current + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(testimonialTimer)
  }, [])

  const prevTeam = () => {
    setTeamIndex((current) => (current - 1 + teamMembers.length) % teamMembers.length)
  }

  const nextTeam = () => {
    setTeamIndex((current) => (current + 1) % teamMembers.length)
  }

  const prevTestimonial = () => {
    setTestimonialIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const nextTestimonial = () => {
    setTestimonialIndex((current) => (current + 1) % testimonials.length)
  }

  const currentMember = teamMembers[teamIndex]
  const currentTestimonial = testimonials[testimonialIndex]

  return (
    <section id="about" style={styles.wrapper} className="about-us-section">
      <style>{responsiveCss}</style>

      <div style={styles.inner}>
        <div style={styles.headingBlock}>
          <span style={styles.kicker}>About us</span>
          <h2 style={styles.title}>Bringing fresh, honest food to your home</h2>
          <p style={styles.description}>
            Ritual365 is a family-driven food brand focused on quality, freshness, and convenience.
            From frozen essentials to sweets, snacks, and namkeens, we bring food that feels warm,
            dependable, and proudly homemade.
          </p>
        </div>

        <section id="team" style={styles.teamSection} className="about-team-section">
          <h3 style={styles.sectionTitle}>Meet Our Team</h3>
          <div style={styles.teamCarousel} className="about-team-carousel">
            <button type="button" onClick={prevTeam} style={styles.carouselButton} aria-label="Previous team member">
              ‹
            </button>

            <div style={styles.teamCard} className="about-team-card">
              <img src={currentMember.image} alt={currentMember.name} style={styles.avatar} />
              <div style={styles.memberName}>{currentMember.name}</div>
              <div style={styles.memberRole}>{currentMember.role}</div>
              <p style={styles.memberInfo}>{currentMember.info}</p>
            </div>

            <button type="button" onClick={nextTeam} style={styles.carouselButton} aria-label="Next team member">
              ›
            </button>
          </div>

          <div style={styles.dots}>
            {teamMembers.map((member, index) => (
              <button
                key={member.name}
                type="button"
                onClick={() => setTeamIndex(index)}
                style={{
                  ...styles.dot,
                  ...(index === teamIndex ? styles.dotActive : {}),
                }}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section id="testimonials" style={styles.testimonialsSection} className="about-testimonials-section">
          <h3 style={styles.sectionTitle}>What Customers Say</h3>
          <div style={styles.carouselWrap} className="about-testimonials-carousel">
            <button type="button" onClick={prevTestimonial} style={styles.carouselButton} aria-label="Previous testimonial">
              ‹
            </button>

            <div style={styles.testCard} className="about-test-card">
              <div style={styles.quote}>&ldquo;{currentTestimonial.quote}&rdquo;</div>
              <div style={styles.author}>{currentTestimonial.name}</div>
            </div>

            <button type="button" onClick={nextTestimonial} style={styles.carouselButton} aria-label="Next testimonial">
              ›
            </button>
          </div>

          <div style={styles.dots}>
            {testimonials.map((item, index) => (
              <button
                key={item.name + index}
                type="button"
                onClick={() => setTestimonialIndex(index)}
                style={{
                  ...styles.dot,
                  ...(index === testimonialIndex ? styles.dotActive : {}),
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </section>
      </div>

      <footer style={styles.footer}>
        <div style={styles.footerContainer} className="about-footer-container">
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>Ritual365</div>
            <div style={styles.footerAddress}>shop 202, Gultekdi Market Yard, Pune, 411 042</div>
            <div style={styles.footerMeta}>
              Email: <a href="mailto:hello@ritual365.in" style={styles.link}>hello@ritual365.com</a>
            </div>
            <div style={styles.footerMeta}>
              Phone: <a href="tel:+91 9763972505" style={styles.link}>+91 9763972505</a>
            </div>
            <div style={styles.footerMeta}>
              Website: <a href="https://ritual365.in" target="_blank" rel="noreferrer" style={styles.link}>ritual365.in</a>
            </div>
          </div>
          <div style={styles.footerActions}>
            <button
              style={styles.contactBtn}
              onClick={() => {
                window.dispatchEvent(new Event('openContactModal'))
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </footer>
    </section>
  )
}

const responsiveCss = `
  .about-us-section {
    width: 100%;
  }

  @media (max-width: 900px) {
    .about-team-grid,
    .about-test-grid,
    .about-footer-container {
      grid-template-columns: 1fr !important;
      flex-direction: column !important;
    }
  }
`

const styles = {
  wrapper: {
    width: '100%',
    background: '#fffaf6',
    padding: '52px 0 0',
    marginTop: 12,
  },
  inner: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px 20px',
  },
  headingBlock: {
    textAlign: 'center',
    maxWidth: 760,
    margin: '0 auto 32px',
  },
  kicker: {
    display: 'inline-block',
    background: '#fff0e3',
    color: '#ff7a00',
    padding: '6px 12px',
    borderRadius: 999,
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  title: {
    fontSize: 'clamp(28px, 4vw, 44px)',
    margin: '0 0 12px',
    color: '#171717',
  },
  description: {
    color: '#555',
    lineHeight: 1.8,
    fontSize: 16,
  },
  teamSection: {
    padding: '8px 0 28px',
  },
  sectionTitle: {
    fontSize: 'clamp(22px, 3vw, 34px)',
    color: '#171717',
    marginBottom: 20,
    textAlign: 'center',
  },
  teamCarousel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
    maxWidth: 980,
    margin: '0 auto',
  },
  teamCard: {
    background: '#fff',
    border: '1px solid #f4e5d9',
    borderRadius: 20,
    padding: '28px 24px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(20, 20, 20, 0.04)',
    flex: 1,
    maxWidth: 760,
    minHeight: 440,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 180,
    height: 180,
    objectFit: 'cover',
    borderRadius: '50%',
    border: '4px solid #fff2e7',
    boxShadow: '0 10px 22px rgba(255,122,0,0.12)',
  },
  memberName: {
    fontWeight: 800,
    marginTop: 18,
    color: '#1c1c1c',
    fontSize: 22,
  },
  memberRole: {
    color: '#ff7a00',
    fontSize: 14,
    marginTop: 6,
    fontWeight: 700,
  },
  memberInfo: {
    color: '#555',
    lineHeight: 1.8,
    fontSize: 15,
    marginTop: 12,
    maxWidth: 620,
  },
  testimonialsSection: {
    padding: '12px 0 36px',
  },
  carouselWrap: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    maxWidth: 780,
    margin: '0 auto',
  },
  testCard: {
    flex: 1,
    background: '#fff',
    border: '1px solid #f2e6db',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0 10px 26px rgba(20, 20, 20, 0.04)',
    minHeight: 180,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  quote: {
    fontStyle: 'italic',
    color: '#333',
    lineHeight: 1.7,
    minHeight: 72,
    fontSize: 17,
  },
  author: {
    marginTop: 14,
    fontWeight: 800,
    color: '#1c1c1c',
  },
  carouselButton: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    border: '1px solid #ffd7b2',
    background: '#fff7f0',
    color: '#ff7a00',
    fontSize: 28,
    cursor: 'pointer',
    lineHeight: 1,
  },
  dots: {
    display: 'flex',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
    border: 'none',
    background: '#f4d8bc',
    cursor: 'pointer',
    padding: 0,
  },
  dotActive: {
    background: '#ff7a00',
    transform: 'scale(1.15)',
  },
  footer: {
    background: '#fff',
    borderTop: '1px solid #f1e7de',
    marginTop: 8,
    padding: '30px 0 50px',
  },
  footerContainer: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  footerBrand: {
    color: '#222',
    lineHeight: 1.8,
    fontSize: 15,
  },
  footerLogo: {
    fontWeight: 900,
    fontSize: 22,
    marginBottom: 8,
  },
  footerAddress: {
    marginBottom: 6,
    color: '#444',
  },
  footerMeta: {
    color: '#444',
  },
  link: {
    color: '#ff7a00',
    textDecoration: 'none',
    fontWeight: 700,
  },
  footerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  contactBtn: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    borderRadius: 12,
    padding: '12px 18px',
    cursor: 'pointer',
    fontWeight: 800,
    boxShadow: '0 10px 18px rgba(255, 122, 0, 0.18)',
  },
}

export default AboutUs
