import { connectDB } from "@/lib/dbConnect"
import { userModal } from "@/lib/modals/UserModal";
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"


const handelLoginUser = async (profile) => {
    await connectDB();
    const user = await userModal.findOne({ email: profile.email })
    if (user) {
        return user;
    } else {
        let obj = {
            fullname: profile.name,
            email: profile.email,
            provider: "google",
            profileImg: profile.picture
        };
        let newUser = await new userModal(obj)
        newUser = await newUser.save()
        return newUser
    }
}



export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google, Credentials({
        credentials: {
            email: {},
            password: {},
        },
        authorize: async (credentials) => {
            let user = null
            console.log("credentials==>", credentials)
            let res = await fetch('https://cheery-faloodeh-2c0487.netlify.app/api/user/login', {
                method: "POST",
                body: JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            })
            res = await res.json()
            user = res.user
            return user
        },

    }),],
    callbacks: {
        async signIn({ account, profile }) {
            console.log("account==>", account)
            if (account.provider == "google") {
                console.log("profile==>", profile)
                const user = await handelLoginUser(profile)
                return { ...profile, role: user.role } // Do different verification for other providers that don't have `email_verified`
            }
            return true
        },
        async jwt({ token }) {
            console.log("token in JWT==>", token)
            const user = await handelLoginUser(token)
            console.log("user in The JWT==>", user)
            token._id = user._id
            token.role = user.role
            token.picture = user?.profileImg,
            token.fullname = user?.fullname
            return token
        },
        session({ session, token }) {
            session.user._id = token._id
            session.user.role = token.role
            session.user.image = token.picture
            session.user.name = token.fullname
            return session
        },
    },
})