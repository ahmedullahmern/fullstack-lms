"use server"

export async function getCourse() {
    let courses = await fetch(`${process.env.BASE_URL}api/course`)
    courses = await courses.json()
    return courses;
}