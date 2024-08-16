import dbConnect from "@/util/mongo";
import Order from "../../../models/Order";

async function connectToDatabase() {
    if(dbConnect) {
        await dbConnect();
    }
}

export async function GET(req, { params } ) {
    await connectToDatabase();

    const { id } = params;

    try {
        
        if(!id) {
            return new Response(JSON.stringify({ error: 'Order ID is required'}), { status: 400})
        }

        const order = await Order.findById(id);

        if (!order) {
            return new Response(JSON.stringify({ error: 'Order not found' }), { status: 404 });
        }

        return new Response(JSON.stringify(order), { status : 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch order by id' }), { status: 500 });
    }
}


export async function PUT(req, { params }) {
    await connectToDatabase();

    const { id } = params;

    try {
        const body = await req.json();
        const order = await Order.findByIdAndUpdate(id, body, {
            new: true,
        })
        return new Response(JSON.stringify( order ), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to update order by id' }), { status: 500 });
    }
}