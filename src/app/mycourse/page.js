import { getApplications } from "@/actions/applications";
import { auth } from "../../../auth";
import ApplicationCard from "@/components/ui/ApplicationCards.js/applicationCards";
import { redirect } from "next/navigation";

export default async function MyCourse() {
    const session = await auth();
    if (!session) {
        redirect("/")
    }
    const { application } = await getApplications({ user: session?.user?._id });

    return (
        <div className="container mx-auto px-20 my-10">
            <h1 className="text-2xl font-bold mb-5">My Courses</h1>

            {application.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {application.map((app) => (
                        <ApplicationCard key={app._id} application={app} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No applications found</p>
            )}
        </div>
    );
}
