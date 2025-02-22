import { redirect } from "next/navigation"
import { signIn, auth } from "../../../auth"
import { FcGoogle } from 'react-icons/fc';  // Import Google Icon from react-icons

export default async function SignIn() {

    const session = await auth()
    console.log("session==>", session)
    if (session?.user?.role === "user") {
        redirect("/")
    }
    if (session?.user?.role === "admin") {
        redirect("/admin/dashboards")
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl">

                {/* Heading */}
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign In</h2>

                {/* Login Form */}
                <form
                    className="flex flex-col gap-4"
                    action={async (formData) => {
                        "use server"
                        await signIn("credentials", formData, { redirect: false })
                    }}
                >
                    <input
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="email"
                        type="email"
                        placeholder="Enter Your Email"
                    />
                    <input
                        required
                        className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="password"
                        type="text"
                        placeholder="Enter Your Password"
                    />
                    <button
                        className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-t border-gray-300" />
                    <span className="mx-4 text-gray-500">or</span>
                    <hr className="flex-grow border-t border-gray-300" />
                </div>

                {/* Google SignIn */}
                <form
                    action={async () => {
                        "use server"
                        await signIn("google")
                    }}
                >
                    <button
                        type="submit"
                        className="flex items-center justify-center gap-3 w-full border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                        <FcGoogle size={24} />
                        <span className="font-medium">Continue with Google</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
