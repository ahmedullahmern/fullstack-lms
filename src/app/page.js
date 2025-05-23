import { getAdmissions } from "@/actions/admissions";
import CourseSection from "@/components/ui/CourseSection/coursesection";
import Header from "@/components/ui/Header/header";
import Image from "next/image";
import { auth } from "../../auth";

export default async function Home() {

  const { admission } = await getAdmissions("open")
  const session = await auth()

  return (
    <>
      {/* <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"> */}
      {/* <Header /> */}
      <CourseSection session={session} admission={admission} />
      {/* // <h1 className="font-bold text-5xl">LMS</h1> */}
      {/* </div> */}
    </>
  );
}
