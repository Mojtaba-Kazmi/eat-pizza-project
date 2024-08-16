import styles from "@/styles/OrderDetails.module.css";
import { useState } from "react";

export default function OrderDetails({ total, createOrder}) {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  function handleClick() {
    createOrder({customer, address, total, method: 0})
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{`You will pay ${total} after the delivery`}</h1>
        <div className={styles.item}>
          <label> Name Surname </label>
          <input 
            type="text" 
            placeholder="John Doe" 
            className={styles.input}
            value={customer}
            onChange={(e) => setCustomer(e.target.value)} 
          />
          <label>Phone number</label>
          <input
            type="number"
            placeholder="+61 45 19 45 996"
            className={styles.input}
          />
          <label> Address </label>
          <textarea 
            type="text" 
            rows={5}
            value={address}
            onChange={(e) => setAddress(e.target.value)}  
          />
        </div>
        <button className={styles.button} onClick={handleClick}>Order</button>
      </div>
    </div>
  );
}
