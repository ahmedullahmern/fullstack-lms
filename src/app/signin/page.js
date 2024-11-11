import { redirect } from "next/navigation"
import { signIn, auth } from "../../../auth"


export default async function SignIn() {
    const session = await auth()
    console.log("session==>", session)
    if (session) {
        redirect("/")
    }
    return (
        <div className="container mx-auto flex flex-col gap-4 min-h-screen justify-center items-center ">

            <form
                className="flex flex-col gap-3 shadow p-3"
                action={async (formData) => {
                    "use server"
                    await signIn("credentials", formData, { redirect: false })
                }}
            >
                <input required className="border p-2" name="email" placeholder="Enter Your Email" />
                <input required className="border p-2" name="password" placeholder="Enter Your Password" />
                <button
                    className="border p-3 px-5 hover:opacity-55"
                    type="submit">Login</button>
            </form>


            <form
                action={async () => {
                    "use server"
                    await signIn("google")
                }}
            >
                <button
                    className="border p-3 0 px-10 hover:opacity-55"
                    type="submit">Continue with Google</button>
            </form>
        </div>
    )
} 