import { connectDB } from "@/lib/dbConnect";
import { BatchModal } from "@/lib/modals/BatchModal";


export async function POST(request) {
    connectDB()
    const obj = await request.json();
    let newBatch = await new BatchModal({ ...obj })
    newBatch = await newBatch.save();

    return Response.json({
        error: false,
        msg: "Batch Add SuccessFully",
        batch: newBatch
    })
}

export async function GET(req) {
    await connectDB();
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const query = {};
    if (searchParams.get("course")) {
        query.course = searchParams.get("course");
    }

    console.log("query=>", query);
    const batches = await BatchModal.find(query).populate("course", "duration");
    return Response.json({
        error: false,
        msg: "Batched Fetched Successfully",
        batches,
    });
}