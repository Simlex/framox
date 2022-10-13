import React from 'react';
import { motion } from 'framer-motion';
import style from '../styles/loader.module.scss';

type Props = {}

const loaderVariants = {
    animationOne: {
        x: [-20, 20],
        y: [0, -30],
        transition: {
            x: {
                yoyo: Infinity,
                duration: 0.5
            },
            y: {
                yoyo: Infinity,
                duration: 0.25,
                ease: 'easeOut'
            }
        }
    }
}

const Loader = (props: Props) => {
    return (
        <>
            <div className={style.loaderContainer}>
                <motion.div
                    className={style.loader}
                    variants={loaderVariants}
                    animate="animationOne">
                </motion.div>
            </div>
        </>
    )
}

export default Loader