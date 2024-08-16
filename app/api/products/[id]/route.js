import dbConnect from "@/util/mongo";
import Product from "../../../models/Product";
import { cookies } from 'next/headers';

async function connectToDatabase() {
    if(dbConnect) {
        await dbConnect();
    }
}

export async function GET(req, { params }) {
    await connectToDatabase();

    const { id } = params;

    try {
        
        if(!id) {
            return new Response(JSON.stringify({ error: 'Product ID is required' }), { status: 400 });
        }

        const product = await Product.findById(id);
        
        if (!product) {
            return new Response(JSON.stringify({ error: 'Product not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });

    } catch (error) {
        return new Response(json.stringify({ error: 'Failed to fetch product by id' }), { status: 500 })
    }
}

export async function DELETE(req, { params }) {
    await connectToDatabase();

    const cookieStore = cookies();
    const tokenCookie = cookieStore.get('token'); // Retrieve the token cookie
    const tokenValue = tokenCookie?.value;

    if (!tokenValue || tokenValue?.trim() !== process.env.TOKEN?.trim()) {
        return new Response(JSON.stringify("Not authenticated"), { status: 401 });
    }

    const { id } = params;

    try {
        
        await Product.findByIdAndDelete(id);
        
        return new Response(JSON.stringify("Product has been deleted"), { status: 200 });

    } catch (error) {
        return new Response(json.stringify({ error }), { status: 500 })
    }
}

