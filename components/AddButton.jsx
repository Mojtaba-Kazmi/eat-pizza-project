// components/AddButton.js
"use client";
import { useState } from "react";
import Add from "./Add";
import styles from "../styles/Add.module.css";

export default function AddButton() {
  const [close, setClose] = useState(true);

  return (
    <>
      <button onClick={() => setClose(!close)} className={styles.mainAddButton}>Add new Pizza</button>
      {!close && <Add setClose={setClose}/>}
    </>
  );
}

