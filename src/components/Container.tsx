import React, { ReactElement } from 'react';
import style from '../styles/home.module.scss';

type Props = {
    children: ReactElement;
}

const Container = (props: Props) => {
  return (
    <div className={style.container}>
        {props.children}
    </div>
  )
}

export default Container;