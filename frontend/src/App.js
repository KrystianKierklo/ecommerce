import Header from './components/Header';
import Footer from './components/Footer';
import './index.css'
import { Container } from 'react-bootstrap'
import HomePage from './screens/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'
 

function App() {
	return (
		<Router>
        <Header />
        <main className="py-5">
          <Container>
            <Routes>
              <Route path='/' element={<HomePage />} exact/>
              <Route path='/product/:id' element={<ProductScreen />}/>
              <Route path='/cart/:id' element={<CartScreen />}/>
            </Routes>
          </Container>
        </main>
        <Footer />
		</Router>
	);
}

export default App;
