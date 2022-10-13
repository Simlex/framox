import React, { ReactElement } from 'react';
import style from '../styles/home.module.scss';

type Props = {
    children: ReactElement;
    cursorRef: any;
}

const Container = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.cursor} ref={props.cursorRef}></div>
        {props.children}
    </div>
  )
}

export default Container;