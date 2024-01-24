import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import logo from '@/public/logo_vtu-gpt.png'

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="logo">
                    <Link href='/'>
                    <Image
                        src={logo}
                        alt="Picture of the author"
                    />
                    </Link>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <p className='new-notebook'> New Notebook </p>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your account
                                and remove your data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <ul className="sidebar-links">
                    <li>
                        <Link href='/'><i className="ri-arrow-right-circle-fill"></i> Home</Link>
                    </li>
                    <li>
                        <Link href='/'><i className="ri-arrow-right-circle-fill"></i> Notebooks</Link>
                    </li>
                    <li>
                        <Link href='/'><i className="ri-arrow-right-circle-fill"></i> Sign In</Link>
                    </li>
                </ul>
                <Link href='' className='signup-button'>Sign Up</Link>
                <div className="sidebar-bottom">
                    <h4>Try Pro</h4>
                    <p>Upgrade for image upload, smarter AI, and more Copilot.</p>
                    <Button className='learn-more-btn' variant="secondary"><i className="ri-arrow-right-up-line"></i> Learn More</Button>
                    <div className='line'></div>
                    <div className="sidebar-footer">
                        <Link href="/"><i className="ri-smartphone-line"></i> Download</Link>
                        <span>
                            <Link href='/'><i className="ri-twitter-x-line"></i></Link>
                            <Link href='/'><i className="ri-discord-fill"></i></Link>
                        </span>
                    </div>
                </div>
            </div>
            {/* mobile navigation */}
            <div className="mobile-navigation">
                <div className="logo">
                    <Image
                        src={logo}
                        alt="Picture of the author"
                    />
                </div>
                <Link href='#'>Get App</Link>
            </div>
        </>

    )
}

export default Sidebar