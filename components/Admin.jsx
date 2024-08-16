"use client";

import Image from "next/image";
import styles from "../styles/Admin.module.css";
import { useState } from "react";
import axios from "axios";

const Admin = ({ products, orders }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);

  const status = ["preparing", "on the way", "delivered"];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProductList(productList.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatus = async(id) => {
    const item = orderList.filter(order => order._id === id)[0] //from orderlist we extracting the current status
    const currentStatus = item.status;

    // Prevent status from incrementing if it's already at the maximum value
  if (currentStatus >= status.length - 1) {
    return; // Exit the function if the status is already "delivered"
  }
  
    try {
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status: currentStatus +1,
      });
      setOrderList([
        res.data,
        ...orderList.filter((order) => order._id !== id),
      ]);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>

        <table className={styles.table}>
          <thead>
            <tr className={styles.theader}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {productList.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.tableRow}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    alt={"pizza"}
                    style={{ objectFit: 'contain' }}
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>{product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theader}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
            {orderList.map((order) => (
              <tbody key={order._id}>
                <tr className={styles.tableRow}>
                  <td>{order._id.slice(0, 5)}...</td>
                  <td>{order.customer}</td>
                  <td>{order.total}</td>
                  <td>{order.method === 0 ? <span>Cash</span> : <span>Paid</span>}</td>
                  <td>{status[order.status]}</td>
                  <td>
                    <button onClick={() => handleStatus(order._id)}>Next Stage</button>
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      </div>
    </div>
  );
};

export default Admin;
