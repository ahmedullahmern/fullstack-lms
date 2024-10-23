import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function AdminLayout({ children }) {
    return (
        <Tabs defaultValue="dashboards" className="w-full">
            <TabsList className="w-full gap-5">
                <Link href={"/admin/dashboards"}>
                    <TabsTrigger value="dashboards">Dashboards</TabsTrigger>
                </Link>
                <Link href={"/admin/courses"}>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                </Link>
                <Link href={"/admin/batches"}>
                    <TabsTrigger value="batches">Batches</TabsTrigger>
                </Link>
                <Link href={"/admin/trainers"}>
                    <TabsTrigger value="trainers">Trainers</TabsTrigger>
                </Link>
                <Link href={"/admin/students"}>
                    <TabsTrigger value="students">Students</TabsTrigger>
                </Link>
            </TabsList>
            <TabsContent value="dashboards">{children}</TabsContent>
            <TabsContent value="batches">{children}</TabsContent>
            <TabsContent value="courses">{children}</TabsContent>
            <TabsContent value="trainers">{children}</TabsContent>
            <TabsContent value="students">{children}</TabsContent>
        </Tabs>
    )
}