"use client";

export default function CourseSection({ admission }) {
    console.log("admission Data:", admission);
    if (!admission || admission.length === 0) {
        return <p className="text-center text-gray-500">No courses available</p>;
    }
    return (
        <div className="container mx-auto p-4">
            {/* Heading */}
            <h2 className="text-3xl font-bold text-center mb-6">Apply Our Latest Course</h2>

            {/* Courses Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {
                    admission.map((data) => {
                        return (
                            <div key={data._id} className="bg-white p-4 rounded-xl shadow-lg">
                                <h3 className="text-xl font-semibold">{data.course.title}</h3>
                                <p className="text-gray-500">{data.batch?.title}</p>
                                <p className="text-gray-500">{data.status}</p>
                                <p className="mt-2">{data.course.description}</p>
                            </div>
                        )
                    })
                }
                {/* (
                <p className="text-center text-gray-500">Loading courses...</p>
                ) */}
            </div>
        </div>
    )
}