import Image from "next/image";
import styles from "../styles/PizzaCard.module.css";
import Link from "next/link";

export default function PizzaCard({ pizza }) {
  return (
    <div className={styles.container}>
      <Link href={`product/${pizza._id}`}>
        <Image src={pizza.img} alt="pizza" width={200} height={200}   />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
}
