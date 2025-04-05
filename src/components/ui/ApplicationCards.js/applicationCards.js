"use client";
import React from "react";

export default function ApplicationCard({ application }) {
    console.log("AoApplication==>", application)
    return (
        <div className="border rounded-xl shadow-md p-4 bg-white">
            {/* User Info */}
            <div className="flex items-center gap-4">
                <img
                    src={application.user.profileImg}
                    alt={application.user.fullname}
                    className="w-12 h-12 rounded-full border"
                />
                <div>
                    <h2 className="text-lg font-semibold">{application.user.fullname}</h2>
                    <p className="text-sm text-gray-500">{application.user.email}</p>
                </div>
            </div>

            {/* Course & Batch Info */}
            <div className="mt-4">
                <h3 className="text-lg font-bold">{application.course.title}</h3>
                <p className="text-sm text-gray-600">{application.batch.title}</p>
            </div>

            {/* Personal Info */}
            <div className="mt-2 text-sm text-gray-700">
                <p><strong>CNIC:</strong> {application.info.CNIC}</p>
                <p><strong>DOB:</strong> {application.info.DOB}</p>
                <p><strong>Address:</strong> {application.info.address}</p>
            </div>

            {/* Admission Info */}
            <div className="mt-2 text-sm text-gray-700">
                <p><strong>Start Date:</strong> {application.admission.startDate}</p>
                <p><strong>End Date:</strong> {application.admission.endDate}</p>
                <p className="py-2"><strong>Status:</strong>
                    <span className={`ml-2 px-2 py-1 rounded 
                           ${application.status === "pending" ? "bg-yellow-200 text-yellow-800" :
                            application.status === "enrolled" ? "bg-green-200 text-green-800" :
                                application.status === "rejected" ? "bg-red-200 text-red-800" : ""}`}>
                        {application.status}
                    </span>

                </p>
            </div>
        </div>
    );
}