import { connectDB } from "@/lib/dbConnect";
import { AdmissionModal } from "@/lib/modals/AdmissionModal";
import { ApplicationModal } from "@/lib/modals/ApplicationModal";
import { BatchModal } from "@/lib/modals/BatchModal";
import { CourseModal } from "@/lib/modals/CourseModal";

// export async function POST(request) {
//     connectDB()
//     const obj = await request.json();
//     let newAdmission = await new AdmissionModal({ ...obj })
//     newAdmission = await newAdmission.save();
//     return Response.json({
//         success: true,
//         error: false,
//         msg: "Admission Add SuccessFully",
//         admission: newAdmission
//     })
//     // console.log("newAdmission in post Api=>", admission);
// }

// export async function PUT(request) {
//     connectDB()
//     const obj = await request.json();
//     const { id, status } = obj
//     const updated = await AdmissionModal.findOneAndUpdate(
//         { _id: id },
//         { status: status }
//     ).exec()
//     console.log("HI UPDATE kiya Masla he bhai==>", updated)
//     return Response.json({
//         error: false,
//         msg: "Admission Updated SuccessFully",
//         FullUpdateBhai: updated
//     })
// }


export async function GET(req, { params }) {
    await connectDB();

    const admission = await AdmissionModal.findOne({ _id: params.id })
        .populate("course", "title description")
        .populate("batch", "title").lean();


    const application = await ApplicationModal.find({ admission: params.id })
        .populate("user", "fullname email profileImg")



    return Response.json({
        success: true,
        error: false,
        msg: "Admission Fetched Successfully",
        admission: {
            ...admission,
            application
        },
    });
}