import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { About } from './components/About'
import { Regions } from './components/Regions'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import './App.css'

export default function App() {
  return <>
    <a className="skip-link" href="#main">İçeriğe geç</a>
    <Header />
    <main id="main" tabIndex={-1}><Hero /><Services /><About /><Regions /><Contact /></main>
    <Footer />
  </>
}
