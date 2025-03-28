import { getApplications } from "@/actions/applications"
import { auth } from "../../../auth"

export default async function MyCourse() {
    const session = await auth()
    const applications = getApplications({ user: session.user._id })
    console.log("Aplication in MyCourse Page==>", applications)
    return (
        <h1>MyCourse</h1>
    )
}