import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import style from './styles/checkout.module.scss';
import { IoIosCloseCircleOutline, IoMdAdd } from 'react-icons/io';
import { IoChevronBack } from 'react-icons/io5';
// import sneakers1 from '../sneakers/sneakers_1.png';
import BlueBg from './backgrounds/blue_abstract.jpg';
import Whitey from './backgrounds/white_abstract.jpg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsCheck2Circle, BsCircle } from 'react-icons/bs';


const Checkout = () => {

  const arr = ['1', '2', '3', '4', '5', '1', '2', '3', '4', '5'];

  const [bankPaymentChoice, setBankPaymentChoice] = useState<boolean>(true);

  const [cardNumber, setCardNumber] = useState(1320);

  const cardCarousel = useRef<HTMLDivElement>();

  useEffect(() => {
    console.log('Client X: ', cardCarousel);
    console.log('Client X scroll: ', cardCarousel.current?.scrollLeft);
  }, [cardCarousel]);

  
// Images 
const sneakers1 = 'https://ik.imagekit.io/simlex/sneakers_1.png';

  useEffect(() => {

    function scrollFunc() {
      if (cardCarousel.current) {
        console.log(cardCarousel.current?.scrollLeft);        
        if (cardCarousel.current?.scrollLeft > 0 && cardCarousel.current?.scrollLeft < 160) {
          setCardNumber(1320);
        }
        if (cardCarousel.current?.scrollLeft > 160 && cardCarousel.current?.scrollLeft < 280) {
          setCardNumber(2023);
        }
      }
    }

    cardCarousel.current?.addEventListener('scroll', scrollFunc);
  }, [cardCarousel]);

  return (
    <div className={style.checkoutContainer}>
      <div className={style.cartArea}>
        <h2>Shopping Cart</h2>
        <div className={style.productList}>
          {
            arr.map((each, index) => {
              return (
                <motion.li className={style.product}
                  initial={{ x: 40 + `${index * 8}` }}
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 100, duration: 2, damping: 10 }}>
                  <div className={style.product__img}>
                    <img src={sneakers1} alt='Sneakers' />
                  </div>
                  <div className={style.product__name}>
                    <p>Burdock</p>
                    <span>Yellow metal</span>
                  </div>
                  <div className={style.product__price}>
                    <p>$18.00</p>
                    <span>NGN</span>
                  </div>
                  <motion.div
                    className={style.product__removeItem}
                    whileHover={{ scale: 1.5 }}>
                    <IoIosCloseCircleOutline />
                  </motion.div>
                </motion.li>
              )
            })
          }
        </div>
        <div className={style.bottom}>
          <Link to='/product'>
            <motion.p className={style.backNav}
              whileHover={{ backgroundColor: '#000', color: '#fff' }}>
              <IoChevronBack /> View products
            </motion.p>
          </Link>
          <div className={style.total}>
            Total <p>138.00 GBP</p>
          </div>
        </div>
      </div>
      <div className={style.checkoutArea}>
        <div className={style.checkoutArea__title}>
          <h2>Checkout</h2>
          <button><IoMdAdd /> Add new</button>
        </div>
        <div className={style.checkoutArea__cardsSection}
          ref={cardCarousel as MutableRefObject<HTMLDivElement>}
        >
          <div className={style.card}>
            <img src={BlueBg} alt='Card background' />
            <h2 className={style.card__type}>VISA</h2>
            <div className={style.cardNumber}>
              <h5>Card Number:</h5>
              <p className={style.number}>0000 0000 0000 0000</p>
            </div>
            <div className={style.cardExpDate}>
              <h5>Expiry date:</h5>
              <p className={style.expDate}>12/09</p>
            </div>
          </div>
          <div className={style.card}>
            <img src={Whitey} alt='Card background' />
            <h2 className={style.card__type}>VISA</h2>
            <div className={style.cardNumber}>
              <h5>Card Number:</h5>
              <p className={style.number}>0000 0000 0000 0000</p>
            </div>
            <div className={style.cardExpDate}>
              <h5>Expiry date:</h5>
              <p className={style.expDate}>12/09</p>
            </div>
          </div>
        </div>
        <div className={style.checkoutArea__paymentArea}>
          <div className={style.options}>
            <li onClick={() => setBankPaymentChoice(true)} style={bankPaymentChoice ? { color: '#000' } : {}}>

              <h4>Pay with card ({cardNumber})</h4>
              {
                bankPaymentChoice ? (
                  <BsCheck2Circle />
                ) : (
                  <BsCircle />
                )
              }
            </li>
            <li onClick={() => setBankPaymentChoice(false)} style={!bankPaymentChoice ? { color: '#000' } : {}}>
              <h4>Bank transfer</h4>
              {
                bankPaymentChoice ? (
                  <BsCircle />
                ) : (
                  <BsCheck2Circle />
                )
              }
            </li>
            {
              !bankPaymentChoice && (
                <div className={style.note}>
                  <p>Kindly make payment to any of the accounts below using “dQ345” as your reference.</p>
                  <div className={style.accountDetails}>
                    <p>Bank: Gtb</p>
                    <p>Account Number: 0458718077</p>
                  </div>
                </div>
              )
            }
          </div>
          <button>
            Buy
            <span>Buy</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout