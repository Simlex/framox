import React, { ReactElement } from 'react';
import { Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Product from './components/Product';
import Container from './components/Container';

function App(): ReactElement {
  const locaton = useLocation();
  return (
    <>
      <Container>
        <Routes>
          <Route path='/Checkout' element={<Checkout />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/' element={<Home />} />
          <Route path='/Product' element={<Product />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
