import { CourseDataTable } from "@/components/ui/DataTable/CourseTable";

export default function Courses() {
    return (
        <div className="text-center p-10">
            <h1 className="font-bold text-4xl">Courses</h1>
            <CourseDataTable />
        </div>
    )
}