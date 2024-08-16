// app/product/[id]/page.js
import Product from "@/components/Product";
import axios from "axios";

async function fetchProductById(id) {
  const result = await axios.get(`http://localhost:3000/api/products/${id}`);
  return result.data;
}

export default async function ProductPage({ params }) {
  const { id } = params;
  const pizza = await fetchProductById(id);

  return <Product pizza={pizza} />;
}
