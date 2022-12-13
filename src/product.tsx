import React, { useEffect, useState, Suspense, useRef } from 'react';
import style from './styles/product.module.scss';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import SellerImg from './user/profileImg.png';
// import sneakers1 from '../sneakers/sneakers_1.png';
// import sneakers2 from '../sneakers/sneakers_2.png';
// import sneakers3 from '../sneakers/sneakers_3.png';
// import sneakers4 from '../sneakers/sneakers_4.png';
import { Rate } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SimilarProducts from './components/Product/SimilarProducts';
import { IoMdCart } from 'react-icons/io';


type Props = {

}


const productContainer = {
    exit: {
        scale: 2,
        opacity: 0,
        rotate: 20,
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
// const colorSelection = {
//     second: {
//         scale: [1.2, 1],
//         transition: {
//             type: 'tween',
//             duration: 0.2,
//             yoyo: 10,
//         },
//     },
//     hover: {
//         scale: 1.2,
//         transition: {
//             type: 'spring',
//             duration: 0.2,
//             // yoyo: 2,
//         },
//     }
// }

// Images 

const sneakers1 = 'https://ik.imagekit.io/simlex/sneakers_1.png';
const sneakers2 = 'https://ik.imagekit.io/simlex/sneakers_2.png';
const sneakers3 = 'https://ik.imagekit.io/simlex/sneakers_3.png';
const sneakers4 = 'https://ik.imagekit.io/simlex/sneakers_4.png';

const Product = (props: Props) => {

    //#region states 

    // const sneakers = [sneakers4, sneakers2, sneakers3, sneakers4];
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
        },
        {
            sneakers: sneakers2,
            visibility: false
        },
        {
            sneakers: sneakers4,
            visibility: false
        },
        {
            sneakers: sneakers1,
            visibility: false
        }
    ])
    // Slice main data to only 4 items
    const visibleSneakersData = sneakersData.slice(0, 4);
    // Assign remaining data
    const remainingSneakersData = sneakersData.slice(4,);

    const shoeSizes = [37, 39, 42, 45];

    const [value, setValue] = useState(3);
    const desc = ['terrible', 'bad', 'fair', 'good', 'wonderful'];

    const [moreVisibility, setMoreVisibility] = useState(false);
    const [shoesize, setShoesize] = useState<string | number>(45);
    const [like, setLike] = useState(false);

    // State for Add to cart animation 
    const [cart, setCart] = useState(false);

    // State for Similar products visibility status 
    const [similarProductsVisibility, setSimilarProductsVisibility] = useState(false);

    //#endregion 

    //#region functions 

    // Function to change product to selected product 
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

    const toggleSimilarProducts = () => {
        setSimilarProductsVisibility(!similarProductsVisibility);
    }

    //#endregion 

    //#region hooks

    // Use effect to handl Add to cart animation 
    useEffect(() => {
        if (cart) {
            setTimeout(() => {
                setCart(false)
            }, 2500);
        }
    }, [cart]);

    // Ref hook for similar products component 
    const containerRef = useRef<HTMLDivElement>();


    const productDummyData = [
        {
            img: sneakers2,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers2,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers3,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers4,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers2,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers4,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers2,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers4,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers2,
            name: 'High Swimmer Nike Sneakers',
        },
        {
            img: sneakers3,
            name: 'High Swimmer Nike Sneakers',
        },
    ]

    // let containerRef = props.containerRef;
    let productLength = productDummyData.length;

    useEffect(() => {
        if (containerRef !== undefined && containerRef.current) {
            // @ts-ignore
            // let maxScroll = containerRef.current.scrollLeftMax;
            // let eachMove = maxScroll / productLength;
            console.log(containerRef.current);
            console.log(containerRef.current.scrollLeft);
            console.log(productDummyData.length);
            // scrollCarousel(eachMove);
        }
    }, [containerRef]);

    function scrollCarousel(productNumber: number) {
        // @ts-ignore
        containerRef.current.scrollLeftMax += productNumber;
    }

    //#endregion

    // const shoeSelectRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
    // useEffect(() => {
    // // console.log(shoeSelectRef.current);
    // if(shoeSelectRef.current.id == sneakersData[shoeSelectRef.current.id].visibility) {
    //     shoeSelectRef.current.classList.add(style.selected);
    // }
    // }, [sneakersData])


    return (
        <Suspense fallback={<div>Loading</div>}>
            <motion.div className={style.productContainer}
                variants={productContainer}
                exit='exit'>
                <div className={style.productContainer__top}>
                    FRAMOX
                    <Link to='/'>
                        <p>Back to Home</p>
                    </Link>
                    <Link to='/checkout'>
                        <div className={style.checkout}>
                            <HiOutlineShoppingBag />
                        </div>
                    </Link>
                </div>
                <div className={style.productContainer__product}>
                    <div className={style.productDesc}>
                        <div className={style.productDesc__name}>
                            <div className={style.top}>
                                {/* Brand */}
                                <span>FENDI</span>
                                <span className={style.dash}></span>
                            </div>
                            {/* Product name */}
                            <h3>Runner winter technical sneakers</h3>
                        </div>
                        <div className={style.productDesc__sellerInfo}>
                            <div className={style.sellerImage}>
                                <img src={SellerImg} alt='Seller' loading='lazy' />
                            </div>
                            <div className={style.sellerName}>
                                <p>ProdigyCoder</p>
                                <span>1326 reviews</span>
                            </div>
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
                                                    alt='Sneakers'
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
                            <span>Available sizes</span>
                            <div className={style.sizes}>
                                {
                                    shoeSizes.map((eachSize, index) => {
                                        return (
                                            <div key={index}>
                                                {shoesize === `${eachSize}` ?
                                                    <div className={`${style.sizeNum} ${style.selected}`}>
                                                        {eachSize}
                                                    </div>
                                                    :
                                                    <motion.div className={style.sizeNum} onClick={() => setShoesize(`${eachSize}`)}
                                                        whileHover={{ rotate: 20, scale: 1.1 }}>
                                                        {eachSize}
                                                    </motion.div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={style.productDetails__reviews}>
                            <span>Rating</span>
                            <div className={style.rate}>
                                <Rate tooltips={desc} onChange={setValue} value={value} />
                                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                            </div>
                        </div>
                        <div className={style.productDetails__price}>
                            <span>Price</span>
                            <p>{(450).toLocaleString('en-NG', { style: 'currency', currency: 'NGN', })}</p>
                        </div>
                        {/* <div className={style.productDetails__color}>
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
                        </div> */}
                        {/* Make this a component */}
                        {/* <div className={style.productDetails__cart}>
                            <div className={style.top}>
                                <div className={style.header}>
                                    <p className={style.title}>Selected Items</p>
                                    <span>No selected item</span>
                                </div>
                                <span className={style.num}>0</span>
                            </div>
                            <div className={style.productGrp}>
                                <div className={style.product}>
                                    <div className={style.product__img}>
                                        <img src={sneakers1} alt='Sneakers' />
                                    </div>
                                    <div className={style.product__info}>
                                        <p>Nike Air max 360</p>
                                        <span>$450</span>
                                    </div>
                                    <div className={style.product__count}>
                                        <span>-</span>
                                        1
                                        <span>+</span>
                                    </div>
                                </div>
                                <div className={style.product}>
                                    <div className={style.product__img}>
                                        <img src={sneakers1} alt='Sneakers' />
                                    </div>
                                    <div className={style.product__info}>
                                        <p>Nike Air max 360</p>
                                        <span>$450</span>
                                    </div>
                                    <div className={style.product__count}>
                                        <span>-</span>
                                        1
                                        <span>+</span>
                                    </div>
                                </div>
                                <div className={style.product}>
                                    <div className={style.product__img}>
                                        <img src={sneakers1} alt='Sneakers' />
                                    </div>
                                    <div className={style.product__info}>
                                        <p>Nike Air max 360</p>
                                        <span>$450</span>
                                    </div>
                                    <div className={style.product__count}>
                                        <span>-</span>
                                        1
                                        <span>+</span>
                                    </div>
                                </div>
                                <div className={style.product}>
                                    <div className={style.product__img}>
                                        <img src={sneakers1} alt='Sneakers' />
                                    </div>
                                    <div className={style.product__info}>
                                        <p>Nike Air max 360</p>
                                        <span>$450</span>
                                    </div>
                                    <div className={style.product__count}>
                                        <span>-</span>
                                        1
                                        <span>+</span>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                        <div className={style.images}>
                            {
                                visibleSneakersData.map((eachItem, index) => {
                                    return (
                                        <div className={style.images__img} id={`${index}`} onClick={(e) => changeImg(e)} key={index}>
                                            <img src={eachItem.sneakers} alt='Sneakers' />
                                        </div>
                                    )
                                })
                            }
                            <motion.div
                                className={style.images__more}
                                onClick={() => setMoreVisibility(!moreVisibility)}
                                whileHover={{ rotate: 10 }}>
                                +{remainingSneakersData.length}
                            </motion.div>
                            <AnimatePresence>
                                {
                                    moreVisibility && (
                                        <motion.div className={style.imagesAbs}
                                            exit={{ x: 2, opacity: 0 }}
                                            transition={{ type: 'spring' }}>
                                            {
                                                remainingSneakersData.map((eachItem, index) => {
                                                    return (
                                                        <motion.div className={style.imagesAbs__img}
                                                            onClick={(e) => {
                                                                setMoreVisibility(!moreVisibility)
                                                                changeImg(e)
                                                            }}
                                                            id={`${index + visibleSneakersData.length}`}
                                                            initial={{ y: -10 * index, opacity: 0 }}
                                                            animate={{ y: 0, opacity: 1 }}
                                                            whileHover={{ y: -4 }}
                                                            key={index}>
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
                        {/* <div className={style.actionBtn}>
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
                        </div> */}
                    </div>
                </div>
                <motion.div className={style.bottom} initial={{ opacity: 1, bottom: '-128px' }} animate={{ opacity: 1, bottom: '-48px' }}>
                    <div className={style.bottom__selected}>
                        <div className={style.icon}>
                            <IoMdCart />
                        </div>
                        6 items in cart
                    </div>
                    <div className={style.bottom__navigate}>
                        {/* Show navigations only when similar products are visible */}
                        {
                            similarProductsVisibility &&
                            <div className={style.leftNavigate}><BsChevronLeft /></div>
                        }
                        <span onClick={toggleSimilarProducts}>
                            {
                                similarProductsVisibility ? 'Close' : 'View similar products'
                            }
                        </span>
                        {
                            similarProductsVisibility &&
                            <div className={style.rightNavigate}><BsChevronRight /></div>
                        }
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

                {/* Similar Products */}
                <SimilarProducts
                    containerRef={containerRef}
                    similarProductsVisibility={similarProductsVisibility}
                    setSimilarProductsVisibility={setSimilarProductsVisibility}
                    productDummyData={productDummyData} />
            </motion.div>
        </Suspense>
    )
}

export default Product