import { connectDB } from "@/lib/dbConnect";



export async function POST(request) {
    await connectDB();
    const obj = await request.json();
    console.log("obj==>", obj)
    return Response.json("User Post Request ")
}



export async function GET() {
    return Response.json("User GET Request ")
}