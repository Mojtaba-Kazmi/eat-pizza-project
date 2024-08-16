import Image from 'next/image';
import styles from '../styles/Footer.module.css';
import bg from "../public/img/bg.png";

export default function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src={bg} alt="fort and knife"/>
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h2 className={styles.motto}>
                        OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA
                    </h2>
                </div>
               <div className={styles.card}>
                    <h3 className={styles.title}>FIND OUR RESTAURANTS</h3>
                    <p className={styles.text}>1645,Don Road #304 <br /> NewYork, 85022 <br />(602) 867-1010</p>
                    <p className={styles.text}>1645,Don Road #304 <br /> NewYork, 85022 <br />(602) 867-1010</p>
                    <p className={styles.text}>1645,Don Road #304 <br /> NewYork, 85022 <br />(602) 867-1010</p>
               </div>
               <div className={styles.card}>
                    <h3 className={styles.title}>WORKING HOURS</h3>
                    <p className={styles.text}>MONDAY UNTIL FRIDAY <br /> 9:00 - 22:00</p>
                    <p className={styles.text}>SATURDAY - SUNDAY <br /> 12:00 - 24:00</p>
               </div>
            </div>
        </div>
    )
}