"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, UserIcon } from "lucide-react";
import { updateApplication } from "@/actions/applications";

export default function AdmissionDetail({ admission }) {
    const handleEnroll = async (applicationId) => {
        await updateApplication(applicationId, "enrolled", admission._id);
        console.log(`Enrolling application ${applicationId}`);
    };

    const handleReject = async (applicationId) => {
        await updateApplication(applicationId, "rejected", admission._id);
        console.log(`Rejecting application ${applicationId}`);
    };

    return (
        <div className="container mx-auto py-8 px-20">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle className="text-3xl">Admission Detail</CardTitle>
                    <CardDescription>Course: {admission.course.title}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="font-semibold">Course Description</h3>
                            <p>{admission.course.description}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold">Batch</h3>
                            <p>{admission.batch.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                                Start Date: {new Date(admission.startDate).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            <span>
                                End Date: {new Date(admission.endDate).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Badge
                        variant={admission.status === "open" ? "default" : "secondary"}
                    >
                        {admission.status.toUpperCase()}
                    </Badge>
                </CardFooter>
            </Card>

            <h2 className="text-2xl font-bold mb-4">Applications</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {admission.application.map((application) => (
                    <Card key={application._id}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage
                                        src={application.user?.profileImg || "/default-avatar.png"}
                                        alt={application.user?.fullname || "User"}
                                    />
                                    <AvatarFallback>
                                        {application.user?.fullname?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{application.user?.fullname || "Unknown"}</CardTitle>
                                    <CardDescription>{application.user?.email || "No Email"}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <UserIcon className="h-4 w-4" />
                                    <span className="text-sm">CNIC: {application.info?.CNIC || "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" />
                                    <span className="text-sm">
                                        DOB: {application.info?.DOB ? new Date(application.info.DOB).toLocaleDateString() : "N/A"}
                                    </span>
                                </div>
                                <p className="text-sm">Address: {application.info?.address || "N/A"}</p>
                                <p className="text-sm">
                                    Applied on:{" "}
                                    {new Date(application.createdAt).toLocaleDateString()}
                                </p>
                                <Badge
                                    variant={
                                        application.status === "pending" ? "secondary" : "default"
                                    }
                                >
                                    {application.status.toUpperCase()}
                                </Badge>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <>
                                <Button
                                    onClick={() => handleEnroll(application._id)}
                                    variant="default"
                                    disabled={application.status === "enrolled"}
                                >
                                    Enroll
                                </Button>
                                <Button
                                    onClick={() => handleReject(application._id)}
                                    variant="destructive"
                                    disabled={application.status === "rejected"}
                                >
                                    Reject
                                </Button>
                            </>

                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
