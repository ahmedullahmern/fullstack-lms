import { CourseDataTable } from "@/components/ui/DataTable/CourseTable";
// import { CourseAddDailods } from "@/components/ui/Modals/CourseModalAdd";

export default function Courses() {
    return (
        <div className="text-center p-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">Courses</h1>
                
            </div>
            <CourseDataTable />
        </div>
    )
}