

import Link from 'next/link';
import { auth } from '../../../../auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LogIn, GraduationCap } from 'lucide-react';
import { handleSignOut } from '@/actions/authActions';
import { UserIcon } from "lucide-react";

export default async function Header() {
    const session = await auth();
    const isAdmin = session?.user?.role === 'admin';

    return (
        <header className="bg-slate-200 shadow-md">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-lg font-bold flex items-center gap-2">
                    <GraduationCap className="w-6 h-6" /> LMS
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    {session ? (
                        <>
                            {isAdmin && <Link className='hover:text-blue-800 hover:underline' href="/admin/dashboards">Dashboards</Link>}
                            <Link className='hover:text-blue-800 hover:underline' href="/mycourse">My Courses</Link>
                            <span className="font-semibold">Hi, {session?.user?.name}</span>
                            <form action={handleSignOut}>
                                <Button variant="outline" className="ml-4" type="submit"><UserIcon className="h-4 w-4" /> Sign Out</Button>
                            </form>
                        </>
                    ) : (
                        <Link href="/signin" className="flex items-center gap-2">
                            <Button variant="outline"><UserIcon className="h-4 w-4" /> Login</Button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="flex flex-col space-y-4 mt-6">
                            <Link href="/" className="text-lg font-bold flex items-center gap-2">
                                <GraduationCap className="w-6 h-6" /> LMS-APP
                            </Link>
                            {session ? (
                                <>
                                    {isAdmin && <Link href="/admin/dashboards">Dashboards</Link>}
                                    <Link href="/mycourse">My Courses</Link>
                                    <span className="font-semibold">Hi, {session?.user?.name}</span>
                                    <form action={handleSignOut}>
                                        <Button variant="outline" className="ml-4" type="submit">Sign Out</Button>
                                    </form>
                                </>
                            ) : (
                                <Link href="/signin" className="flex items-center gap-2">
                                    <LogIn className="w-5 h-5" /> <Button variant="outline" className="w-full">Login</Button>
                                </Link>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}
