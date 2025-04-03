import { getSingleAdmission } from "@/actions/admissions"
import AdmissionDetail from "@/components/ui/AdmissionDetail/AdmissionDetail";

export default async function AddmissionDetail({ params }) {
    const { admission } = await getSingleAdmission(params.id)
    // console.log("application",application);
    // console.log("application.user",application.user);

    console.log("Admission Detail in the Page==>", admission)
    return (
        <AdmissionDetail admission={admission} />
    )
}