import { BatchTableData } from "@/components/ui/DataTable/batchTable";
import { BatchAddDailods } from "@/components/ui/Modals/BatchModalAdd";

export default function Batches() {
    return (
        <div className="text-center p-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">Courses</h1>
                <BatchAddDailods />
            </div>
            <BatchTableData />
        </div>
    )
}