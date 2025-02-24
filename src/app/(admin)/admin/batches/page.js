import { getBatches } from "@/actions/batches";
import { getCourse } from "@/actions/courses";
import { BatchTableData } from "@/components/ui/DataTable/batchTable";
import { BatchAddDailods } from "@/components/ui/Modals/BatchModalAdd";

export default async function Batches() {
    const batches = await getBatches()
    const courses = await getCourse();
    console.log("batches in admin page ==>", batches)
    return (
        <div className="text-center p-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">Batchs</h1>
                <BatchAddDailods courses={courses} />
            </div>
            <BatchTableData batches={batches} />
        </div>
    )
}