import { connectDB } from "@/lib/dbConnect";
import { CourseModal } from "@/lib/modals/CourseModal";


export async function POST(request) {
    connectDB();
    const obj = await request.json();
    let newCourse = new CourseModal({ ...obj })
    newCourse = await newCourse.save();

    return Response.json({
        error: false,
        msg: "Course addde Successfully",
        course: newCourse,
    });
}


export async function GET() {
    connectDB();

    const courses = await CourseModal.find({ duration: "6 Year" });
    return Response.json({
        error: false,
        msg: "Course Fetched Sucessfully",
        courses: courses
    })
}