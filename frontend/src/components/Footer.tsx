
import Link from "next/link"
import {House} from "lucide-react"


export default function Footer() {
    return (
        <footer className="border-t py-6 md:py-8 flex flex-col ">
            <div className=" px-4 sm:px-6 lg:px-8 flex justify-between w-full items-center ">
                <div className="flex  font-semibold w-1/3 justify-center">
                    <House className="h-5 w-5" />
                    <span>liuHome</span>
                </div>
                <p className="text-sm text-muted-foreground w-1/3 justify-center flex">
                    © 2025 liuHome. All rights reserved.
                </p>
                <div className="flex gap-4 mt-4 md:mt-0 w-1/3 justify-center">
                    <Link href="/about#terms" className="text-sm text-muted-foreground hover:underline">
                        Terms
                    </Link>
                    <Link href="/about#privacy" className="text-sm text-muted-foreground hover:underline">
                        Privacy
                    </Link>
                    <Link href="/about#contact" className="text-sm text-muted-foreground hover:underline">
                        Contact
                    </Link>
                </div>
            </div>
        </footer>
    )
}











