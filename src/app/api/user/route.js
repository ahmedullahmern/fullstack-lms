import { connectDB } from "@/lib/dbConnect";
import { userModal } from "@/lib/modals/UserModal";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    await connectDB();
    const obj = await request.json();
    console.log("obj==>", obj)

    // Check  User Exeist
    const userExist = await userModal.findOne({ email: obj.email })
    if (userExist) return Response.json({ error: true, msg: "User Already Exits" }, { status: 403 })

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(obj.password, saltRounds)
    obj.password = hashedPassword

    let newUser = new userModal({ ...obj })
    newUser = await newUser.save()

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_KEY);

    console.log("obj.password==>", obj.password)
    // console.log("hashedPassword==>", hashedPassword)
    return Response.json({
        error: false,
        msg: "User Add Successlly",
        user: newUser,
        token
    })
}



export async function GET() {
    return Response.json("User GET Request ")
}