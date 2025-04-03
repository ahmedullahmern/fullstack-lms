import { connectDB } from "@/lib/dbConnect";
import { AdmissionModal } from "@/lib/modals/AdmissionModal";
import { ApplicationModal } from "@/lib/modals/ApplicationModal";
import { BatchModal } from "@/lib/modals/BatchModal";
import { CourseModal } from "@/lib/modals/CourseModal";
import { UserModal } from "@/lib/modals/UserModal"

export async function POST(request) {
    connectDB()
    const obj = await request.json();
    let newApplication = await new ApplicationModal({ ...obj })
    newApplication = await newApplication.save();
    console.log("newApplication=>", newApplication);
    return Response.json({
        error: false,
        msg: "Application Add SuccessFully",
        Application: newApplication
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
    if (searchParams.get("admission")) {
        query.admission = searchParams.get("admission");
    }
    if (searchParams.get("user")) {
        query.user = searchParams.get("user");
    }
    console.log("query=>", query);
    const application = await ApplicationModal.find(query)
        .populate("course", "title")
        .populate("batch", "title")
        .populate("admission", "startDate endDate status")
        .populate("user", "fullname email profileImg")
    console.log("application Api Wala=>", application);
    return Response.json({
        error: false,
        msg: "Application Fetched Successfully",
        application,
    });
}

export async function PUT(request) {
    connectDB()
    const obj = await request.json();
    const { id, status } = obj
    const updated = await ApplicationModal.findOneAndUpdate(
        { _id: id },
        { status: status }
    ).exec()
    console.log("HI UPDATE kiya Masla he bhai==>", updated)
    return Response.json({
        error: false,
        msg: "Application Updated SuccessFully",
        FullUpdateBhai: updated
    })
}