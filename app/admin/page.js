
import axios from "axios";
import Admin from "../../components/Admin";
import { cookies } from 'next/headers'; // Import cookies handling from 'next/headers'
import { redirect } from 'next/navigation'



async function getAdminProducts() {
    const result = await axios.get("http://localhost:3000/api/products");
    return result.data;
}


async function getAdminOrders() {
    try {
        const result = await axios.get("http://localhost:3000/api/orders");
        //console.log("Orders fetched:", result.data);  // Check the output here
        return result.data;
    } catch (error) {
        //console.error("Error fetching orders:", error);
        return [];
    }
}

export default async function AdminPage() {
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token'); // Retrieve the token cookie
    const tokenValue = tokenCookie?.value; // Extract the token value

    console.log('Cookies object:', cookieStore);
    console.log('Token from cookies:', tokenCookie);
    console.log('Token value from cookies:', tokenValue);
    console.log('Expected token:', process.env.TOKEN);

    if (tokenValue?.trim() !== process.env.TOKEN?.trim()) {
        console.log('Token mismatch or token is missing');
        return redirect('/admin/login');
    }

    const products = await getAdminProducts();
    const ordersResponse = await getAdminOrders();

    return <Admin products={products} orders={ordersResponse.orders} />;
}

