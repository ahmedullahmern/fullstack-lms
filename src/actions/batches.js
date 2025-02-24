"use server"

import { revalidatePath } from "next/cache";

export async function getBatches() {
    let batches = await fetch(`${process.env.BASE_URL}api/batch`)
    batches = await batches.json()
    console.log("wr eer==>", batches)
    return batches
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