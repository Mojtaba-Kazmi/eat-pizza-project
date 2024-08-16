"use client";

import Image from "next/image";
import styles from "../../styles/Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { reset } from "../../redux/cartSlice";
import { useRouter } from "next/navigation";
import OrderDetails from "@/components/OrderDetails";

export default function Cart() {
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const cart = useSelector((state) => state.cart);

  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" };

  const createOrder = async (data) => {
    try {
      const res = await axios.post('http://localhost:3000/api/orders', data);
      console.log("API Response:", res.data); // Check the structure of the response
      if (res.status === 201) {
        dispatch(reset());
        const orderId = res.data.order._id;
        if (orderId) {
          router.push(`/orders/${orderId}`);
        } else {
          console.error("Order ID is undefined");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  function onApprove(data, actions) {
    console.log('Data:', data); // Log the data received from PayPal
    // replace this url with your server
    return actions.order.capture().then(function (details) {
      const shipping = details.purchase_units[0].shipping;
      createOrder({
        customer: shipping.name.full_name,
        address: shipping.address.address_line_1,
        total: cart.total,
        method: 1,
      });
    })
  }

  // Custom component to wrap the PayPalButtons and show loading spinner
  const ButtonWrapper = ({ showSpinner }) => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[style]}
          fundingSource="paypal"
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={onApprove}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.theader}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tableRow} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      layout="fill"
                      alt="pizza"
                      objectFit="cover"
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extra}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text},</span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal</b> ${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount</b> $00.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total</b> ${cart.total}
          </div>

          {open ? (
            <div className={styles.paymentMethods}>

              <button className={styles.payButton} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
              <PayPalScriptProvider
                options={{
                  clientId:
                    "AYJPYEyleszf1QOdfwPpYGKc1kzSSWeALDMuIVAs3CbeFT_H5_i-edduJhUXowRWRWioyIYioGrfW9ia",
                  components: "buttons",
                  currency: "USD",
                }}
              >
                <ButtonWrapper showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              className={styles.checkoutButton}
              onClick={() => setOpen(true)}
            >
              Checkout Now
            </button>
          )}
        </div>

      </div>
      { cash && <OrderDetails total={cart.total} createOrder={createOrder}/>}
    </div>
  );
}
