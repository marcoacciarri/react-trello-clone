import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'

function Header() {
    return (
        <header>
            <Image
                src="https://yourzone.website/wp-content/uploads/2021/07/favicon-120x120.png"
                alt="Trello clone"
                width={120}
                height={120}
                className='w-38 pb-10 md:pb-0 object-contain'
            />

            {/* Search box */}
            <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                <MagnifyingGlassIcon className="h-6 w-6 text-grey-400" />
                <input
                    type="text"
                    placeholder="search"
                    className="flex-1 outline-none p-2 " />

                <button type="submit" hidden>
                    search
                </button>
            </form>

        </header >
    )
}

export default Header