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

export function BatchAddDailods() {
    const [open, setOpen] = useState(false)
    const isDesktop = true

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="px-7">Add Batch</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add-Batch</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <ProfileForm />
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
                    <DrawerTitle>Add Batch</DrawerTitle>
                    <DrawerDescription>
                        You Can Add Batch her.
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

function ProfileForm({ className }) {
    return (
        <form className={cn("grid items-start gap-4", className)}>
            <div className="grid gap-2">
                <Label htmlFor="batchname">Course Name</Label>
                <Input required type="text" id="batchname" defaultValue="" />
            </div>
            <div className="grid gap-2">
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
            </div>
            <div className="grid gap-2">
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
            </div>
            <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select Course" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="WebandAppDevelopment">Web and App Development</SelectItem>
                        <SelectItem value="AppDevelopment">App Development</SelectItem>
                        <SelectItem value="PythonDevelopment">Python Development</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button type="submit">Add Batch</Button>
        </form>
    )
}
