import './App.css'
import Header from './components/Common/Header'
import Footer from './components/Common/Footer'
import MainComponent from './components/LandingPage/MainComponeny'

function App() {
  return(
    <>
      <div className='App'>
        <Header/>
        <MainComponent/>
        {/* <Footer/> */}
      </div>
    </>
  )
}

export default App
