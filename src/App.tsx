import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Product from './components/Product';
import Container from './components/Container';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import style from './styles/app.module.scss';
// Images 
import sneakers1 from '../src/sneakers/sneakers_1.png';
import sneakers2 from '../src/sneakers/sneakers_2.png';
import sneakers3 from '../src/sneakers/sneakers_3.png';
import sneakers4 from '../src/sneakers/sneakers_4.png';
import { cleanup } from '@testing-library/react';

function App(): ReactElement {
  const location = useLocation();

  const [loaderVisible, setLoaderVisible] = useState(true);
  setTimeout(() => {
    setLoaderVisible(false);
  }, 5000);


  // Ref hook for custom cursor 
  const cursorRef = useRef<HTMLDivElement>();
  document.addEventListener("mousemove", moveCursor);
  // Function to move cursor 
  function moveCursor(e: any) {
    let x = e.clientX - 13;
    let y = e.clientY - 12;

    if (cursorRef.current !== undefined) {
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    }

  }

  console.log('Location path: ', location.pathname);


  return (
    <>
      <p className={style.text}>
        {location.pathname === '/' && 'Home'}
        {location.pathname === '/Product' && 'Product'}
        {location.pathname === '/Checkout' && 'Checkout'}
        {location.pathname === '/Cart' && 'Cart'}
      </p>
      <Container cursorRef={cursorRef}>
        <>
          {loaderVisible && (<Loader />)}
          {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}> */}
          {
            !loaderVisible && (
              <AnimatePresence exitBeforeEnter>
                <Routes key={location.pathname} location={location}>
                  <Route path='/Checkout' element={<Checkout />} />
                  <Route path='/Cart' element={<Cart />} />
                  <Route path='/' element={<Home />} />
                  <Route path='/Product' element={<Product />} />
                </Routes>
              </AnimatePresence>
            )
          }
          {/* </motion.div> */}
        </>
      </Container>
    </>
  );
}

export default App;
