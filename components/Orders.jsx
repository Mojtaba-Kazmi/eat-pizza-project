import Image from "next/image";
import styles from "../styles/Orders.module.css";

export default function Orders({ order }) {
  const status = order.status;

  const classStatus = (index) => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.theader}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tableRow}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>

                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>

                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>

                <td>
                  <span className={styles.total}>{order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={classStatus(0)}>
            <Image src="/img/paid.png" width={30} height={30} alt="pizza" />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked Icon"
              />
            </div>
          </div>
          <div className={classStatus(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt="bake" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked Icon"
              />
            </div>
          </div>
          <div className={classStatus(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt="bike" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked Icon"
              />
            </div>
          </div>
          <div className={classStatus(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt="delivered" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt="checked Icon"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}> CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b> ${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$00.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total}
          </div>
          <button disabled className={styles.button}>
            PAID
          </button>
        </div>
      </div>
    </div>
  );
}
