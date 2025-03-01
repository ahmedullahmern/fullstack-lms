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
    const [isPending, startTransition] = useTransition(); // ✅ Loader ke liye state
    const [error, setError] = useState(null); // ✅ Error handling

    async function handleSubmit(formData) {
        setError(null); // ✅ Reset error before submitting

        startTransition(async () => {
            const response = await addAdmission(formData);
            console.log("Response in Dailog==>", response)
            toast.success("Admission added successfully! 🎉")
            if (response.success) {
                setOpen(false);
            } else {
                setError("Failed to add admission");
                toast.error("Failed to add admission! ❌")
            }
        });
    }
    return (
        <form action={handleSubmit} className={cn("grid items-start gap-4", className)}>
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
            <Button type="submit" disabled={isPending}>
                {isPending ?
                    <div role="status" className='flex justify-center' >
                        <svg aria-hidden="true" class="w-8 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div> : "Add Admission"}
            </Button>
            <ToastContainer position="top-right" autoClose={3000} />
        </form>
    )
}
