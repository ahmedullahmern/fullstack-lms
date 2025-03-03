'use client'

import * as React from "react"

import { useState, useTransition } from 'react'

import { cn } from "@/lib/utils"
// import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addAdmission } from "@/actions/admissions"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonLoader from "../ButtonLoader/ButtonLoader"

export function AdmissionAddDailods({ courses, batches }) {
    const [open, setOpen] = useState(false)
    const isDesktop = true
    console.log("Batches Data:", batches);
    console.log("Batches Array:", batches?.batches);

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="px-7">New Addmission</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add-Admission</DialogTitle>
                        {/* <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription> */}
                    </DialogHeader>
                    <ProfileForm courses={courses} batches={batches} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add Admission</DrawerTitle>
                    <DrawerDescription>
                        You Can Add Admission her.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfileForm className="px-4" />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ className, courses, batches, setOpen }) {
    const [chosenCourse, setChosenCourse] = React.useState("");
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    async function handleSubmit(formData) {
        // setIsLoading(true)
        setError(null);

        addAdmission(formData)
            .then((response) => {
                setIsLoading(true)
                console.log("Response in Dailog==>", response);
                if (response.success) {
                    toast.success("Admission added successfully! 🎉");
                    setOpen(false);
                } else {
                    setIsLoading(false)
                    setError("Failed to add admission");
                    toast.error("Failed to add admission! ❌");
                }
            })
            .catch((error) => {
                setIsLoading(false)
                console.error("Error submitting admission:", error);
                toast.error("Something went wrong! ❌");
            });
    }
    return (
        <form action={handleSubmit} className={cn("grid items-start gap-4", className)}>
            <ToastContainer />
            <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select required name="course" onValueChange={(value) => setChosenCourse(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                        {courses.map((course) => (
                            <SelectItem key={course._id} value={course._id}>
                                {course.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {chosenCourse && (
                <div className="grid gap-2">
                    <Label htmlFor="course">Batches</Label>
                    <Select required name="batch">
                        <SelectTrigger>
                            <SelectValue placeholder="Select batches" />
                        </SelectTrigger>
                        <SelectContent>
                            {batches
                                .filter((data) => data.course._id == chosenCourse)
                                .map((batch) => (
                                    <SelectItem key={batch._id} value={batch._id}>
                                        {batch.title}
                                    </SelectItem>
                                ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input required type="date" id="startDate" name={"startDate"} defaultValue="" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input required type="date" id="endDate" name={"endDate"} defaultValue="" />
            </div>
            {/* <div className="grid gap-2">
                    <Label htmlFor="Status">Status</Label>
                    <Select required>
                        <SelectTrigger>
                            <SelectValue placeholder="Pending, Completed, Ongoing, Merged" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="ongoing">Ongoing</SelectItem>
                            <SelectItem value="merged">Merged</SelectItem>
                        </SelectContent>
                    </Select>
                </div> */}
            {/* <div className="grid gap-2">
                    <Label htmlFor="Trainer">Trainer</Label>
                    <Select required>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Trainer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="johnDoe">John Doe</SelectItem>
                            <SelectItem value="janeSmith">Jane Smith</SelectItem>
                            <SelectItem value="aliceJohnson">Alice Johnson</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="noofstudents">No Of Students</Label>
                    <Input required type="number" id="noofstudents" defaultValue="" />
                </div> */}
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ?
                    <ButtonLoader /> : "Add Admission"}
            </Button>
        </form>
    )
}
