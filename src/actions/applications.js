"use server"

import { revalidatePath } from "next/cache";

export async function getApplications({ course = "", batch = "", admission = "", user = "" }) {
    let applications = await fetch(`${process.env.BASE_URL}api/application?admission=${admission}&course=${course}&batch=${batch}&user=${user}`)
    applications = await applications.json()
    console.log("addmision in action==>", applications)
    return applications
}


// export async function getAdmissionsAdmin() {
//     let admissions = await fetch(`${process.env.BASE_URL}api/application`)
//     admissions = await admissions.json()
//     console.log("addmision in action==>", admissions)
//     return admissions
// }

export async function addApplication(obj) {
    console.log("Obj=>", obj);

    const batch = await fetch(`${process.env.BASE_URL}api/application`, {
        method: "POST",
        body: JSON.stringify(obj),
        cache: "no-cache",
    });
    return await batch.json();
}

// export async function addApplication(FormData) {
//     const obj = {
//         startDate: FormData.get('startDate'),
//         endDate: FormData.get('endDate'),
//         course: FormData.get('course'),
//         batch: FormData.get('batch'),
//     }

//     console.log("oobj me kiya he bhai==>", obj)

//     const admission = await fetch(`${process.env.BASE_URL}api/admission`, {
//         method: "POST",
//         body: JSON.stringify(obj)
//     })
//     const result = await admission.json();
//     console.log("Server Response in addAdmission==>", result);
//     if (admission.ok) {
//         revalidatePath('admin/admissions')
//     }
//     return result;
// }

export async function updateApplication(id, status, admissionId) {

    const application = await fetch(`${process.env.BASE_URL}api/application`, {
        method: "PUT",
        body: JSON.stringify({
            id,
            status,
        })
    })
    if (application.ok) {
        revalidatePath(`admin/admissions/${admissionId}`)
    }
}