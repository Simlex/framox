import React, { useState } from 'react';
import style from '../styles/product.module.scss';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import sneakers1 from '../sneakers/sneakers_1.png';
import sneakers2 from '../sneakers/sneakers_2.png';
import sneakers3 from '../sneakers/sneakers_3.png';
import sneakers4 from '../sneakers/sneakers_4.png';
import { Rate } from 'antd';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


type Props = {

}

const Product = (props: Props) => {
    const sneakers = [sneakers1, sneakers2, sneakers3, sneakers4];
    const [value, setValue] = useState(3);
    const desc = ['terrible', 'bad', 'fair', 'good', 'wonderful'];

    const [moreVisibility, setMoreVisibility] = useState(false);
    // function toggleMoreOptions() {

    // }

    return (
        <div className={style.productContainer}>
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
                            sneakers.map((eachItem, key) => {
                                return (
                                    <div className={style.images__img}>
                                        <img src={eachItem} alt='Sneakers image' />
                                    </div>
                                )
                            })
                        }
                        <div className={style.images__more} onClick={() => setMoreVisibility(!moreVisibility)}>
                            +4
                        </div>
                        {
                            moreVisibility && (
                                <div className={style.imagesAbs}>
                                    {
                                        sneakers.map((eachItem, key) => {
                                            return (
                                                <motion.div className={style.imagesAbs__img}
                                                    onClick={() => setMoreVisibility(!moreVisibility)}
                                                    initial={{ y: -10 * key, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    whileHover={{ y: -4 }}>
                                                    <img src={eachItem} alt='Sneakers image' />
                                                </motion.div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
                <motion.div className={style.productImg}
                    initial={{ x: -500, y: -100, scale: 0.4, opacity: 0 }}
                    animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    // Lower stifness, dull transition
                    transition={{ delay: 0.2, type: 'spring', stiffness: 120}}
                    whileHover={{ rotate: -20, x: -50, y:-16 }}>
                    <img src={sneakers1} alt='Sneakers image' loading='lazy' />
                </motion.div>
                <div className={style.productDetails}>
                    <div className={style.productDetails__size}>
                        <span>Size</span>
                        <div className={style.sizes}>
                            <div className={style.sizeNum}>37</div>
                            <div className={style.sizeNum}>39</div>
                            <div className={`${style.sizeNum} ${style.selected}`}>42</div>
                            <div className={style.sizeNum}>45</div>
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
                            <div className={`${style.colorBlack} ${style.cSelected}`}></div>
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
                    <div className={style.addItemBtn}>
                        Add to cart
                    </div>
                    <div className={style.favIconBtn}>
                        <AiOutlineHeart />
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Product