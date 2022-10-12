import React from 'react';
import style from '../styles/home.module.scss';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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

const Home = () => {
    return (
        <div className={style.homeContainer}>
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

            <Link to='/Product'>
                <motion.div className={style.homeContainer__btn}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}>
                    {/* <span></span> */}
                    Shop Now
                </motion.div>
            </Link>
        </div>
    )
}

export default Home