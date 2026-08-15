import { useEffect, useState } from 'react'
import './App.css'
import Home from './Components/Home'
import Contactus from './Components/Contactus'
import ContactModal from './Components/ContactModal'

function App() {
  const [path, setPath] = useState(window.location.pathname)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    const openListener = () => setShowModal(true)
    window.addEventListener('openContactModal', openListener)
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('openContactModal', openListener)
    }
  }, [])

  return (
    <>
      {path === '/contact' ? <Contactus /> : <Home />}
      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('openContactModal', ()=>{ window.dispatchEvent(new Event('openContactModalInternal')) })
      ` }} />
      <script dangerouslySetInnerHTML={{ __html: `
        window.addEventListener('openContactModalInternal', ()=>{})
      ` }} />
    </>
  )
}

export default App
