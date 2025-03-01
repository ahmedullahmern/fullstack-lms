import { connectDB } from "@/lib/dbConnect";
import { AdmissionModal } from "@/lib/modals/AdmissionModal";
import { BatchModal } from "@/lib/modals/BatchModal";
import { CourseModal } from "@/lib/modals/CourseModal";

export async function POST(request) {
    connectDB()
    const obj = await request.json();
    let newAdmission = await new AdmissionModal({ ...obj })
    newAdmission = await newAdmission.save();
    return Response.json({
        success: true,
        error: false,
        msg: "Admission Add SuccessFully",
        admission: newAdmission
    })
    // console.log("newAdmission in post Api=>", admission);
}

export async function PUT(request) {
    connectDB()
    const obj = await request.json();
    const { id, status } = obj
    const updated = await AdmissionModal.findOneAndUpdate(
        { _id: id },
        { status: status }
    ).exec()
    console.log("HI UPDATE kiya Masla he bhai==>", updated)
    return Response.json({
        error: false,
        msg: "Admission Updated SuccessFully",
        FullUpdateBhai: updated
    })
}


export async function GET(req) {
    await connectDB();
    const reqUrl = req.url;
    const { searchParams } = new URL(reqUrl);
    const query = {};
    if (searchParams.get("course")) {
        query.course = searchParams.get("course");
    }

    if (searchParams.get("batch")) {
        query.batch = searchParams.get("batch");
    }

    if (searchParams.get("status")) {
        query.status = searchParams.get("status");
    }
    console.log("query=>", query);
    const admission = await AdmissionModal.find(query)
        .populate("course", "title description")
        .populate("batch", "title");
    console.log("admission Api Wala=>", admission);
    return Response.json({
        error: false,
        msg: "Admission Fetched Successfully",
        admission,
    });
}