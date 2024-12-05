"use server"

import { revalidatePath } from "next/cache";

export async function getCourse() {
    let courses = await fetch(`${process.env.BASE_URL}api/course`)
    courses = await courses.json()
    return courses;
}



export async function addCourse(FormData) {
    const obj = {
        title: FormData.get('title'),
        description: FormData.get('description'),
        duration: FormData.get('duration'),
        eligibility: FormData.get('eligibility').split(","),
        thumbnail: FormData.get('thumbnail'),
    }


    const course = await fetch(`${process.env.BASE_URL}api/course`, {
        method: "POST",
        body: JSON.stringify(obj)
    })
    if(course.ok){
        revalidatePath('/admin')
    }
}