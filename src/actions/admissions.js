"use server"

import { revalidatePath } from "next/cache";

export async function getAdmissions(status = null) {
    let admissions = await fetch(`${process.env.BASE_URL}api/admission?status=${status}`)
    admissions = await admissions.json()
    console.log("addmision in action==>", admissions)
    return admissions
}


export async function getAdmissionsAdmin() {
    let admissions = await fetch(`${process.env.BASE_URL}api/admission`)
    admissions = await admissions.json()
    console.log("addmision in action==>", admissions)
    return admissions
}



export async function addAdmission(FormData) {
    const obj = {
        startDate: FormData.get('startDate'),
        endDate: FormData.get('endDate'),
        course: FormData.get('course'),
        batch: FormData.get('batch'),
    }

    console.log("oobj me kiya he bhai==>", obj)

    const admission = await fetch(`${process.env.BASE_URL}api/admission`, {
        method: "POST",
        body: JSON.stringify(obj)
    })
    const result = await admission.json();
    console.log("Server Response in addAdmission==>", result);
    if (admission.ok) {
        revalidatePath('admin/admissions')
    }
    return result;
}

export async function updateAdmission(id, status) {

    const admission = await fetch(`${process.env.BASE_URL}api/admission`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            status,
        })
    })
    if (admission.ok) {
        revalidatePath('admin/admissions')
    }
}