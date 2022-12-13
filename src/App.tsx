import React, { ReactElement, useRef, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './home';
import Cart from './cart';
import Checkout from './checkout';
import Product from './product';
import Container from './components/Container';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import style from './styles/app.module.scss';
import useResponsive from './components/custom-hooks/UseResponsive';
import { IoMdConstruct } from 'react-icons/io';
import { IoConstruct } from 'react-icons/io5';
// Images 
// import sneakers1 from '../src/sneakers/sneakers_1.png';
// import sneakers2 from '../src/sneakers/sneakers_2.png';
// import sneakers3 from '../src/sneakers/sneakers_3.png';
// import sneakers4 from '../src/sneakers/sneakers_4.png';

function App(): ReactElement {
  const location = useLocation();
  const onMobile = useResponsive();

  const [loaderVisible, setLoaderVisible] = useState(true);
  setTimeout(() => {
    setLoaderVisible(false);
  }, 5000);

  // useEffect(() => {

  //   // document.onreadystatechange = () => {
  //     if (document.readyState === "interactive" || document.readyState === "loading") {
  //     }
  //     if (document.readyState === "loading") {
  //       setLoaderVisible(true);
  //     }
  //     if (document.readyState === "complete") {
  //       console.log('Document is ready');
  //       setLoaderVisible(false);
  //       return;
  //     }
  //     // document.addEventListener("readystatechange", (event) => {
  //     //   if (event.target.readyState === "interactive") {
  //     //     setLoaderVisible(true);
  //     //   } else if (event.target.readyState === "complete") {
  //     //     initApp();
  //     //   }
  //     // });
  //   // };

  // })


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
      {
        !onMobile && (
          <>
            <p className={style.text}>
              {location.pathname === '/' && 'Home'}
              {location.pathname === '/product' && 'Product'}
              {location.pathname === '/checkout' && 'Checkout'}
              {location.pathname === '/cart' && 'Cart'}
            </p>
            <Container cursorRef={cursorRef}>
              <>
                {loaderVisible && (<Loader />)}
                {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4 }}> */}
                {
                  !loaderVisible && (
                    <AnimatePresence exitBeforeEnter>
                      <Routes key={location.pathname} location={location}>
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='/' element={<Home />} />
                        <Route path='/product' element={<Product />} />
                      </Routes>
                    </AnimatePresence>
                  )
                }
                {/* </motion.div> */}
              </>
            </Container>
          </>
        )
      }
      {
        onMobile && (
          <div className={style.appSizeWarning}>
            <div className={style.appSizeWarning__icon}>
              <IoConstruct fontSize={32} />
            </div>
            <p>Not available on mobile phones at the moment. Please switch to tab devices or higher screen size.</p>
          </div>
        )
      }
    </>
  );
}

export default App;
