import AddButton from "@/components/AddButton";
import Featured from "@/components/Featured";
import PizzaList from "@/components/PizzaList";
import axios from "axios";
import Head from "next/head";
import { cookies } from "next/headers";


export default async function Home() {
  const { pizzaList, admin } = await getPizzaList();

  return (
    <div>
      <Head>
        <title>Pizza Restaurant in Newyork</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton />}
      <PizzaList pizzaList={pizzaList}/>
    </div>
  );
}

export const getPizzaList = async () => {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token"); // Retrieve the token cookie
  const tokenValue = tokenCookie?.value; // Extract the token value
 
  let admin = false;

  if (tokenValue?.trim() === process.env.TOKEN?.trim()) {
    admin = true;
  }
  const result = await axios.get("http://localhost:3000/api/products");
   
  return {
    pizzaList: result.data,
    admin
  };
};
