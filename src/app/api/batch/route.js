// import { connectDB } from "@/lib/dbConnect";
// import { BatchModal } from "@/lib/modals/BatchModal";


// export async function POST(request) {
//     connectDB()
//     const obj = await request.json();
//     let newBatch = await new BatchModal({ ...obj })
//     newBatch = await newBatch.save();

//     return Response.json({
//         error: false,
//         msg: "Batch Add SuccessFully",
//         batch: newBatch
//     })
// }