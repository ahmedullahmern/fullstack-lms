'use client'

import * as React from "react"

import { useState } from 'react'

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
import { addCourse } from "@/actions/courses"
import ButtonLoader from "../ButtonLoader/ButtonLoader"

export function CourseAddDailods() {
    const [open, setOpen] = useState(false)
    const isDesktop = true

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="px-7">Add Course</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Course</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <ProfileForm setOpen={setOpen} />
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
                    <DrawerTitle>Add Course</DrawerTitle>
                    <DrawerDescription>
                        You Can Add Course her.
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

function ProfileForm({ className, setOpen }) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(formData) {
        // setIsLoading(true)
        setError(null);

        addCourse(formData)
            .then((response) => {
                setIsLoading(true)
                console.log("Response in Dailog==>", response);
                if (response.success) {
                    setOpen(false);
                } else {
                    setIsLoading(false)
                    setError("Failed to add admission");
                }
            })
            .catch((error) => {
                setIsLoading(false)
                console.error("Error submitting admission:", error);
            });
    }
    return (
        <form action={handleSubmit} className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="course">Course Title</Label>
                <Input required type="text" id="course" name={'title'} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input required id="duration" name={'duration'} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input required id="description" name={'description'} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="eligibility">Eligibilaty</Label>
                <Input required id="eligibility" name={'eligibility'} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="thumbnail">Thumbnail</Label>
                <Input type={'url'} required id="thumbnail" name={'thumbnail'} />
            </div>

            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ?
                    <ButtonLoader /> : "Add Admission"}
            </Button>
        </form>
    )
}
