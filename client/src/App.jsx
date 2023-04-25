import{Loader,
Footer,
Navbar,
Services,
Transaccion,
Welcome,} from '../src/components';

export default function App() {
  return (
    <div className="min-h-screen">
      <div className='gradient-bg-welcome'>
      <Navbar/>
      <Welcome/>
      </div>
      <Services/>
      <Transaccion/>
      <Footer/>
    </div>
  )
}