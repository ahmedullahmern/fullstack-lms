import Link from "next/link"
import { auth, signOut } from "../../../../auth"


export default async function Header() {
    const session = await auth()
    console.log("session in the Header==>", session)
    const check = session?.user?.role === "admin"
    return (
        <div className="bg-amber-300 h-[50px] flex items-center container">
            <div className="container mx-auto px-20 flex justify-between">
                <Link href={"/"}>
                    <h1 className="font-semibold ">
                        LMS-APP
                    </h1>
                </Link>
                {
                    session ? (
                        <div className="flex justify-between">
                            {
                                check ? <>
                                    <Link className="mr-5" href={"/admin/dashboards"}>Dashboards</Link>
                                    <h1 className="mr-5">{"hi "+session.user.name}</h1>
                                </>
                                    :
                                    <h1 className="mr-5">{"hi "+session.user.name}</h1>
                            }
                            <Link href={"/mycourse"}>My courses</Link>
                            <form
                                action={async () => {
                                    "use server"
                                    await signOut()
                                }}
                            >
                                <button
                                    className="border border-black px-5 rounded-full ml-5 hover:opacity-45"
                                    type="submit">Signout</button>
                            </form>
                        </div>
                    ) : (
                        <Link href={"/signin"}
                            className="border border-black px-5 rounded-full ml-20 hover:opacity-45">
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    )
}