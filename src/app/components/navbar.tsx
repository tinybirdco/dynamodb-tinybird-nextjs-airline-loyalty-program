import Image from 'next/image';

export default function NavBar() {
    return (
        // window
        <nav className='bg-tinybird-emerald-ice p-2'>
            <div className="flex justify-center items-center gap-0 text-tinybird-space-cadet font-bold text-2xl">
                <Image
                    src="/logo.png"
                    alt="Tinybird logo"
                    width="50"
                    height="50"
                />
                Tinybird Travels
            </div>
        </nav>
    )
}

