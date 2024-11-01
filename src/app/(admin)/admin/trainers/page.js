import { UserTableData } from "@/components/ui/DataTable/userTableData";
import { UserTrainerAdd } from "@/components/ui/Modals/UserModalAdd";

export default function Trainers() {
    return (
        <div className="text-center p-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-4xl">Trainers</h1>
                <UserTrainerAdd />
            </div>
            <UserTableData />
        </div>
    )
}