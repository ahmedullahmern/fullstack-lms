import { getAdmissions } from "@/actions/admissions"
import { getBatches } from "@/actions/batches";
import { getCourse } from "@/actions/courses";
import { AdmissionTable } from "@/components/ui/DataTable/admissionTable";
import { AdmissionAddDailods } from "@/components/ui/Modals/AdmissionModalAdd";


export default async function Admissions() {
    const { admission } = await getAdmissions();
    const {batches} = await getBatches()
    const { courses } = await getCourse();
    console.log("baches iun admin page==>",{batches})
    return (
        <div className="text-center p-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">Admissions</h1>
                <AdmissionAddDailods courses={courses} batches={batches} />
            </div>
            <AdmissionTable admission={admission} />
        </div>
    )
}