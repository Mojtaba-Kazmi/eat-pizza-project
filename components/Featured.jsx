"use client"

import Image from "next/image";
import styles from "../styles/Featured.module.css";
import { useState } from "react";

export default function Featured() {
  const [index, setIndex] = useState(0);

  const images = [
    "/img/pizza.jpg", 
    "/img/pizza2.jpg", 
    "/img/pizza3.jpg"
  ];

  function handleArrow(direction) {
    if(direction === 'left') {
        setIndex( index !== 0 ? index -1  : 2)
    }

    if(direction === 'right') {
        setIndex ( index !== 2 ?  index + 1 : 0)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{ left: 0 }} onClick={() => handleArrow('left')}>
        <Image src="/img/arrowl.png" alt="arrow"  width={24} height={24} />
      </div>
      <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
        {images.map((img, id) => (
          <div className={styles.imgContainer} key={id}>
            <Image
              src={img}
              alt="pizza"
              layout="fill"
            />
          </div>
        ))}
      </div>
      <div className={styles.arrowContainer} style={{ right: 0 }} onClick={() => handleArrow('right')}>
        <Image src="/img/arrowr.png" alt="arrow"  width={24} height={24} />
      </div>
    </div>
  );
}
