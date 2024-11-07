import { connectDB } from "@/lib/dbConnect";
import { userModal } from "@/lib/modals/UserModal";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function POST(request) {
    await connectDB();
    const obj = await request.json();
    console.log("Login obj==>", obj)
    const user = await userModal.findOne({ email: obj.email })
    if (!user)
        return Response.json({
            error: true,
            msg: 'User Not Found'
        },
            {
                status: 404
            }
        )

    const isPasswordCompare = await bcrypt.compare(obj.password, user.password)
    if (!isPasswordCompare)
        return Response.json({
            error: true,
            msg: 'Password is Not Valid'
        },
            {
                status: 403
            }
        )
    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_KEY);

    return Response.json({
        error: false,
        msg: "User Login Successlly",
        user,
        token
    }, { status: 200 })

    // console.log("isPasswordCompare", isPasswordCompare)
    return Response.json('Working On Login')

}