import Orders from "@/components/Orders";
import axios from "axios";

async function fetchOrderById(id) {
  const result = await axios.get(`http://localhost:3000/api/orders/${id}`);
  return result.data;
}

export default async function OrdersPage({ params }) {
  console.log("Order params:", params); // Log the params

  const { id } = params;
  const order = await fetchOrderById(id);

  return <Orders order={order} />;
}