import dbConnect from "@/util/mongo";
import Order from "../../models/Order";

// Connexion à la base de données
async function connectToDatabase() {
    if (dbConnect) {
        await dbConnect();
    }
}

export async function GET(req) {

    await connectToDatabase();

    try {
        const orders = await Order.find();
        return new Response(JSON.stringify({orders}), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error }), { status: 500 });
    }
}

export async function POST(req) {
    
    await connectToDatabase();

    try {
        const body = await req.json();
        const order = await Order.create(body);
        return new Response(JSON.stringify({ order }), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify({error}), { status: 500 })
    }
}