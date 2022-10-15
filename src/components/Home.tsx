import React from 'react';
import style from '../styles/home.module.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BsCartCheck, BsCart } from 'react-icons/bs';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { AiOutlineShopping } from 'react-icons/ai';

const headerVariants = {
    first: {
        x: -100,
        opacity: 0
    },
    second: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring'
        }
    }
}
const paragraphVariants = {
    first: {
        x: 100,
        opacity: 0
    },
    second: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring'
        }
    }
}
const homeContainer = {
    exit: {
        x: '-100%',
        opacity: 0,
        transition: {
            type: 'tween',
        }
    }
}

const linkBtn = {
    first: {
        y: -60,
        opacity: 0,
    },
    second: {
        y: 0,
        opacity: 1,
        transition: {
            delay: 0.4,
        }
    },
    hover: {
        y: -5,
        transition: {
            delay: 0,
        }
    }
}

const Home = () => {
    return (
        <motion.div className={style.homeContainer}
            variants={homeContainer}
            exit='exit'>
            <motion.p
                variants={headerVariants}
                initial="first"
                animate="second">
                Welcome
            </motion.p>

            <motion.span
                // We wouldn't have to rewrite the first initial and animate state if the parent points to that already.
                variants={paragraphVariants}
                initial="first"
                animate="second">
                Let's cop some kicks!!
            </motion.span>

            <div className={style.quickLinks}>
                <motion.div className={style.link}
                    variants={linkBtn}
                    initial='first'
                    animate='second'
                    transition={{ type: 'spring' }}>
                    <motion.span
                        variants={linkBtn}
                        whileHover='hover'>
                        <BsCartCheck />
                    </motion.span>
                    <p>My Orders</p>
                </motion.div>
                <motion.div className={style.link}
                    variants={linkBtn}
                    initial='first'
                    animate='second'
                    transition={{ type: 'spring' }}>
                    <motion.span
                        variants={linkBtn}
                        whileHover='hover'>
                        <BsCart />
                    </motion.span>
                    <p>My Cart</p>
                </motion.div>
                <motion.div className={style.link}
                    variants={linkBtn}
                    initial='first'
                    animate='second'
                    transition={{ type: 'spring' }}>
                    <motion.span
                        variants={linkBtn}
                        whileHover='hover'>
                        <IoMdNotificationsOutline />
                    </motion.span>
                    <p>Notification</p>
                </motion.div>

                <Link to='/Product'>
                    <motion.div className={style.bigLink}
                        variants={linkBtn}
                        initial='first'
                        animate='second'
                        transition={{ type: 'spring' }}>
                        <motion.span
                            variants={linkBtn}
                            whileHover='hover'>
                            <AiOutlineShopping />
                        </motion.span>
                        <p>Shop Now</p>
                    </motion.div>
                </Link>
            </div>
        </motion.div>
    )
}

export default Home