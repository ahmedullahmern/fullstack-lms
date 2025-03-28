"use client";
import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { ApplicationModalForm } from "../Modals/ApplicationModalAdd";

export default function CourseSection({ admission, session }) {
    console.log("Admission Data:", admission);
    console.log("Admission session:", session);

    if (!admission || admission.length === 0) {
        return <p className="text-center text-gray-500">No courses available</p>;
    }

    return (
        <section className="container mx-auto my-10 px-20">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Apply to our Latest Courses</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3">
                {admission.map((data) => {
                    return (
                        <Card key={data._id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{data.course.title}</CardTitle>
                                <CardDescription>{data.batch?.title}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>{data.course.description}</p>
                                <p className="text-gray-500 mt-2">{data.status}</p>
                            </CardContent>
                            <CardFooter>
                                {session ? (
                                    <ApplicationModalForm session={session} admission={data} />
                                ) : (
                                    <Link href={"/signin"} className="text-blue-600 hover:underline">
                                        Sign in to Apply
                                    </Link>
                                )}
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
}
