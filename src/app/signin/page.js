

export default function SignIn() {
    return (
        <div className="container mx-auto flex min-h-screen justify-center items-center ">
            <form
                action={async () => {
                    "use server"
                    await SignIn("google")
                }}
            >
                <button className="border p-3 px-5" type="submit">Signin with Google</button>
            </form>
        </div>
    )
} 