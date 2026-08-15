import React, { useState } from 'react'

const user = {
  name: 'Snehal Gaikwad',
  email: 'hello@ritual365.com',
  phone: '+91 9763972505',
  city: 'Pune',
  address: 'Gultekdi Market Yard, Pune',
  memberSince: '2024',
}

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsOpen(false)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
    setIsOpen(false)
  }

  return (
    <div style={styles.wrapper}>
      <button
        type="button"
        style={{
          ...styles.profileButton,
          ...(isLoggedIn ? {} : styles.loginButton),
        }}
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isLoggedIn ? 'Open user profile' : 'Open login panel'}
      >
        {isLoggedIn ? (
          <span style={styles.avatar}>
            {/* <span style={{ fontSize: 14, marginRight: 3 }}>👤</span> */}
            {initials}
          </span>
        ) : (
          <span style={styles.loginText}>👤 Login</span>
        )}
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          {isLoggedIn ? (
            <>
              <div style={styles.headerRow}>
                <span style={styles.avatarLarge}>{initials}</span>
                <div>
                  <div style={styles.name}>{user.name}</div>
                  <div style={styles.role}>Logged in</div>
                </div>
              </div>

              <div style={styles.infoList}>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Email</span>
                  <span style={styles.value}>{user.email}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Phone</span>
                  <span style={styles.value}>{user.phone}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>City</span>
                  <span style={styles.value}>{user.city}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Address</span>
                  <span style={styles.value}>{user.address}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Member since</span>
                  <span style={styles.value}>{user.memberSince}</span>
                </div>
              </div>

              <div style={styles.actionRow}>
                <button type="button" style={styles.editButton}>
                  Edit
                </button>
                <button type="button" style={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div style={styles.loginPanel}>
              <div style={styles.loginTitle}>Welcome back</div>
              <div style={styles.loginTextSecondary}>Please login to view your account details.</div>
              <button type="button" style={styles.loginPrimaryButton} onClick={handleLogin}>
                Login
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrapper: {
    position: 'relative',
  },
  profileButton: {
    border: '2px solid #fff7f0',
    background: '#fff',
    width: 44,
    height: 44,
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(255, 122, 0, 0.15)',
    padding: 0,
    transition: 'all 160ms ease',
  },
  loginButton: {
    width: 'auto',
    minWidth: 78,
    padding: '0 14px',
    borderRadius: 999,
    background: '#fff7f0',
    border: '1px solid #ffd7b2',
  },
  loginText: {
    color: '#ff7a00',
    fontWeight: 800,
    fontSize: 12,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #ff7a00 0%, #ff9433 100%)',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 11,
    fontWeight: 800,
    gap: 2,
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 12px)',
    right: 0,
    width: 280,
    background: '#fff',
    borderRadius: 14,
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
    border: '1px solid #f0e8e1',
    padding: 16,
    zIndex: 50,
    maxHeight: 'calc(100vh - 100px)',
    overflowY: 'auto',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 12,
    borderBottom: '1px solid #f1f5f9',
    marginBottom: 12,
  },
  avatarLarge: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    background: '#ff7a00',
    color: '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: 13,
  },
  name: {
    fontWeight: 800,
    color: '#111827',
    fontSize: 16,
  },
  role: {
    color: '#ff7a00',
    fontSize: 12,
    fontWeight: 700,
    marginTop: 2,
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    paddingBottom: 8,
    borderBottom: '1px solid #f9fafb',
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    fontWeight: 700,
  },
  value: {
    fontSize: 13,
    color: '#111827',
    fontWeight: 600,
    lineHeight: 1.5,
  },
  actionRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    background: '#fff7f0',
    color: '#ff7a00',
    border: '1px solid #ffd7b2',
    borderRadius: 10,
    padding: '10px 12px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  logoutButton: {
    flex: 1,
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '10px 12px',
    fontWeight: 700,
    cursor: 'pointer',
  },
  loginPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  loginTitle: {
    fontSize: 18,
    fontWeight: 800,
    color: '#111827',
  },
  loginTextSecondary: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  loginPrimaryButton: {
    background: '#ff7a00',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '10px 14px',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: 8,
  },
}

export default UserProfile
