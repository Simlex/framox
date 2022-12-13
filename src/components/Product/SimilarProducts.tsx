import React, { useEffect } from 'react';
import style from '../../styles/similarProducts.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
    similarProductsVisibility: boolean,
    setSimilarProductsVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    containerRef: any,
    productDummyData: {
        img: string;
        name: string;
    }[]
}

const sneakers2 = 'https://ik.imagekit.io/simlex/sneakers_2.png';
const sneakers3 = 'https://ik.imagekit.io/simlex/sneakers_3.png';
const sneakers4 = 'https://ik.imagekit.io/simlex/sneakers_4.png';

const SimilarProducts = (props: Props) => {


    return (
        <>
            <AnimatePresence>
                {
                    props.similarProductsVisibility && (
                        <motion.div
                            className={style.similarProducts}
                            exit={{ y: 40, opacity: 0 }}
                            transition={{
                                type: 'ease-in',
                                y: { duration: 0.3 }
                            }}>
                            <div className={style.productsBox}>
                                <div className={style.container}></div>
                                <div className={style.productsCarouselContainer}
                                    ref={props.containerRef as React.MutableRefObject<HTMLDivElement>} >
                                    <div
                                        className={style.productCarousel}>
                                        {
                                            props.productDummyData.map((eachProduct, index) => (
                                                <motion.div className={style.eachProduct} key={index}
                                                    initial={{ y: -100 * (index + 1), opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}>
                                                    <img src={eachProduct.img} alt='product' />
                                                    <p>{eachProduct.name}</p>
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default SimilarProducts;