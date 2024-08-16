import dbConnect from "@/util/mongo";
import Product from "../../models/Product";
import { cookies } from 'next/headers';
// Connexion à la base de données
async function connectToDatabase() {
    if (dbConnect) {
        await dbConnect();
    }
}

// Gérer les requêtes GET
export async function GET(req) {
    await connectToDatabase();

    try {
        const products = await Product.find();
        return new Response(JSON.stringify(products), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch products' }), { status: 500 });
    }
}

// Gérer les requêtes POST
export async function POST(req) {
    await connectToDatabase();
    
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token'); // Retrieve the token cookie
    const tokenValue = tokenCookie?.value;

    if (!tokenValue || tokenValue?.trim() !== process.env.TOKEN?.trim()) {
        return new Response(JSON.stringify("Not authenticated"), { status: 401 });
    }

    try {
        const body = await req.json();
        const product = await Product.create(body);
        return new Response(JSON.stringify(product), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to create product' }), { status: 500 });
    }
}
