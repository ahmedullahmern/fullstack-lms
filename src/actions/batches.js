"use server"

import { revalidatePath } from "next/cache";

export async function getBatches() {
    try {
        const response = await fetch(`${process.env.BASE_URL}api/batch`);
        const data = await response.json();
        console.log("API Response:", data);
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }

}



export async function addBatch(FormData) {
    const obj = {
        title: FormData.get('title'),
        description: FormData.get('description'),
        course: FormData.get('course'),
    }

    console.log("oobj me kiya he bhai==>", obj)

    const batch = await fetch(`${process.env.BASE_URL}api/batch`, {
        method: "POST",
        body: JSON.stringify(obj)
    })
    if (batch.ok) {
        revalidatePath('admin/batches')
    }
}