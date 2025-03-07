import { connectDB } from "@/lib/dbConnect";
import { CourseModal } from "@/lib/modals/CourseModal";


export async function POST(request) {
    connectDB();
    const obj = await request.json();
    let newCourse = new CourseModal({ ...obj })
    newCourse = await newCourse.save();

    return Response.json({
        success: true,
        error: false,
        msg: "Course addde Successfully",
        course: newCourse,
    });
}


export async function GET() {
    connectDB();

    const courses = await CourseModal.find();
    return Response.json({
        success: true,
        error: false,
        msg: "Course Fetched Sucessfully",
        courses: courses
    })
}