import React, { useEffect, useState } from 'react';
import style from '../styles/product.module.scss';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import sneakers1 from '../sneakers/sneakers_1.png';
import sneakers2 from '../sneakers/sneakers_2.png';
import sneakers3 from '../sneakers/sneakers_3.png';
import sneakers4 from '../sneakers/sneakers_4.png';
import { Rate } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';


type Props = {

}


const productContainer = {
    exit: {
        scale: 2,
        opacity: 0,
        transition: {
            type: 'spring'
        }
    }
}
const productImgVariant = {
    first: {
        x: -500,
        y: -100,
        scale: 0.4,
        opacity: 0
    },
    second: {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.2,
            type: 'spring',
            // Lower stifness, dull transition
            stiffness: 120,
            when: 'beforeChildren',
            staggerChildren: 2.5
        }
    }
}
const childImgVariant = {
    hover: {
        rotate: -20,
        x: -50,
        y: -16,
        transition: {
            duration: 0.3,
            yoyo: 4
        },
    },
    exit: {
        scale: 1.5,
    }
}
const colorSelection = {
    second: {
        scale: [1.2, 1],
        transition: {
            type: 'tween',
            duration: 0.2,
            yoyo: 10,
        },
    },
    hover: {
        scale: 1.2,
        transition: {
            type: 'spring',
            duration: 0.2,
            // yoyo: 2,
        },
    }
}

const Product = (props: Props) => {
    // const sneakers = [sneakers1, sneakers2, sneakers3, sneakers4];
    const [sneakersData, setSneakersData] = useState([
        {
            sneakers: sneakers1,
            visibility: true
        },
        {
            sneakers: sneakers2,
            visibility: false
        },
        {
            sneakers: sneakers3,
            visibility: false
        },
        {
            sneakers: sneakers4,
            visibility: false
        }
    ])
    const shoeSizes = [37, 39, 42, 45];

    const [value, setValue] = useState(3);
    const desc = ['terrible', 'bad', 'fair', 'good', 'wonderful'];

    const [moreVisibility, setMoreVisibility] = useState(false);
    const [shoesize, setShoesize] = useState<string | number>(45);
    const [like, setLike] = useState(false);

    const [cart, setCart] = useState(false);
    useEffect(() => {
        if (cart) {
            setTimeout(() => {
                setCart(false)
            }, 2500);
        }
    }, [cart]);

    const changeImg = (e: any) => {
        // Iterate over sneaker data array
        for (let i = 0; i < sneakersData.length; i++) {
            // If anyone is visible, set to false
            if (sneakersData[i].visibility) {
                sneakersData[i].visibility = false;
            }
        }
        // Set the current target to true
        sneakersData[e.currentTarget.id].visibility = true;
        // Populate date into new array 
        const newSneakersData = [...sneakersData];
        // set state 
        setSneakersData(newSneakersData);
        
        return;
    }

    // const shoeSelectRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // useEffect(() => {
    // // console.log(shoeSelectRef.current);
    // if(shoeSelectRef.current.id == sneakersData[shoeSelectRef.current.id].visibility) {
    //     shoeSelectRef.current.classList.add(style.selected);
    // }
    // }, [sneakersData])


    return (
        <motion.div className={style.productContainer}
            variants={productContainer}
            exit='exit'>
            <div className={style.productContainer__top}>
                FRAMOX
                <Link to='/'>
                    <p>Back to Home</p>
                </Link>
                <div className={style.checkout}>
                    <HiOutlineShoppingBag />
                </div>
            </div>
            <div className={style.productContainer__product}>
                <div className={style.productDesc}>
                    <div className={style.productDesc__name}>
                        <div className={style.top}>
                            <span>FENDI</span>
                            <span className={style.dash}></span>
                        </div>
                        <h3>Black technical knit fabric high-tops</h3>
                    </div>
                    <p>Running sneakers with thin elastic laces.</p>
                    <div className={style.images}>
                        {
                            sneakersData.map((eachItem, key) => {
                                return (
                                    <div className={style.images__img} id={`${key}`} onClick={(e) => changeImg(e)}>
                                        <img src={eachItem.sneakers} alt='Sneakers' />
                                    </div>
                                )
                            })
                        }
                        <motion.div
                            className={style.images__more}
                            onClick={() => setMoreVisibility(!moreVisibility)}
                            whileHover={{ rotate: 10 }}>
                            +4
                        </motion.div>
                        <AnimatePresence>
                            {
                                moreVisibility && (
                                    <motion.div className={style.imagesAbs}
                                        exit={{ x: 2, opacity: 0 }}
                                        transition={{ type: 'spring' }}>
                                        {
                                            sneakersData.map((eachItem, key) => {
                                                return (
                                                    <motion.div className={style.imagesAbs__img}
                                                        onClick={() => setMoreVisibility(!moreVisibility)}
                                                        initial={{ y: -10 * key, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        whileHover={{ y: -4 }}>
                                                        <img src={eachItem.sneakers} alt='Sneakers' />
                                                    </motion.div>
                                                )
                                            })
                                        }
                                    </motion.div>
                                )
                            }
                        </AnimatePresence>
                    </div>
                </div>
                <motion.div className={style.productImg}
                    variants={productImgVariant}
                    initial='first'
                    animate='second'>

                    {
                        sneakersData.map((each, key) => {
                            return (
                                <AnimatePresence>
                                    <>
                                        {sneakersData[key].visibility && (
                                            <motion.img
                                                src={each.sneakers}
                                                alt='Sneakers image'
                                                loading='lazy'
                                                variants={childImgVariant}
                                                whileHover="hover"
                                            />
                                        )}
                                    </>
                                </AnimatePresence>
                            )
                        })
                    }
                </motion.div>
                <div className={style.productDetails}>
                    <div className={style.productDetails__size}>
                        <span>Size</span>
                        <div className={style.sizes}>
                            {
                                shoeSizes.map((eachSize, key) => {
                                    return (
                                        <>
                                            {shoesize === `${eachSize}` ?
                                                <div className={`${style.sizeNum} ${style.selected}`} onClick={(e) => setShoesize(e.currentTarget.innerHTML)}>
                                                    {eachSize}
                                                </div>
                                                :
                                                <motion.div className={style.sizeNum} onClick={(e) => setShoesize(e.currentTarget.innerHTML)}
                                                    whileHover={{ rotate: 20, scale: 1.1 }}>
                                                    {eachSize}
                                                </motion.div>
                                            }
                                        </>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={style.productDetails__reviews}>
                        <span>Reviews</span>
                        <div className={style.rate}>
                            <Rate tooltips={desc} onChange={setValue} value={value} />
                            {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                        </div>
                    </div>
                    <div className={style.productDetails__price}>
                        <span>Price</span>
                        <p>{(450).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', })}</p>
                    </div>
                    <div className={style.productDetails__color}>
                        <span>Color</span>
                        <div className={style.color}>
                            <div className={`${style.colorBlack} ${style.cSelected}`}>
                                <motion.span
                                    variants={colorSelection}
                                    animate='second'
                                    whileHover='hover'></motion.span>
                            </div>
                            <div className={style.colorOrange}></div>
                            <div className={style.colorGrey}></div>
                        </div>
                    </div>
                </div>
            </div>
            <motion.div className={style.bottom} initial={{ opacity: 1, bottom: '-128px' }} animate={{ opacity: 1, bottom: '-48px' }}>
                <div className={style.bottom__selected}>
                    1 item selected
                </div>
                <div className={style.bottom__navigate}>
                    <div className={style.leftNavigate}><BsChevronLeft /></div>
                    <div className={style.rightNavigate}><BsChevronRight /></div>
                </div>
                <div className={style.bottom__actionBtn}>
                    {cart &&
                        (
                            <motion.p
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 150 }}
                                className={style.added}>Added to cart!</motion.p>
                        )
                    }
                    <div className={style.addItemBtn} onClick={() => setCart(true)}>
                        Add to cart
                    </div>
                    <div className={style.favIconBtn} onClick={() => setLike(!like)}>
                        <motion.svg whileHover={{ scale: 1.2 }} width="20" height="17" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.4999 4.12207L11.4244 3.01657C8.89993 0.421573 4.27093 1.31707 2.59993 4.57957C1.81543 6.11407 1.63843 8.32957 3.07093 11.1571C4.45093 13.8796 7.32193 17.1406 12.4999 20.6926C17.6779 17.1406 20.5474 13.8796 21.9289 11.1571C23.3614 8.32807 23.1859 6.11407 22.3999 4.57957C20.7289 1.31707 16.0999 0.420073 13.5754 3.01507L12.4999 4.12207ZM12.4999 22.5001C-10.4996 7.30207 5.41843 -4.55993 12.2359 1.71457C12.3259 1.79707 12.4144 1.88257 12.4999 1.97107C12.5846 1.88265 12.6726 1.79759 12.7639 1.71607C19.5799 -4.56293 35.4994 7.30057 12.4999 22.5001Z" fill="red" />
                            {
                                like && (
                                    <AnimatePresence>
                                        <motion.path
                                            initial={{ scale: 1 }}
                                            animate={{ scale: 1.2 }}
                                            exit={{ scale: 0 }}
                                            d="M12.4999 4.12207L11.4244 3.01657C8.89993 0.421573 4.27093 1.31707 2.59993 4.57957C1.81543 6.11407 1.63843 8.32957 3.07093 11.1571C4.45093 13.8796 7.32193 17.1406 12.4999 20.6926C17.6779 17.1406 20.5474 13.8796 21.9289 11.1571C23.3614 8.32807 23.1859 6.11407 22.3999 4.57957C20.7289 1.31707 16.0999 0.420073 13.5754 3.01507L12.4999 4.12207Z" fill="red" />
                                    </AnimatePresence>
                                )
                            }
                        </motion.svg>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Product