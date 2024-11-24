import { getCourse } from "@/actions/courses";
import { CourseDataTable } from "@/components/ui/DataTable/CourseTable";
import { CourseAddDailods } from "@/components/ui/Modals/CourseModalAdd";

export default async function Courses() {
    const courses = await getCourse()
    console.log("Courses In The Admin==>", courses)
    return (
        <div className="text-center p-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">Courses</h1>
                <CourseAddDailods />
            </div>
            <CourseDataTable />
        </div>
    )
}