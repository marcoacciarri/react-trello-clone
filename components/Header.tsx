'use client';

import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'
import { useBoardStore } from '@/store/BoardStore';

function Header() {
    const [searchString, setSearchString] = useBoardStore((state) => [
        state.searchString,
        state.setSearchString,
    ]);

    return (
        <header>
            <div className="flex flex-col md:flex-col items-center p-5 bg-gray500/10 rounded-b-2xl" >
                <div className="absolute top-0 left-0 w-100 h-96 bg-gradient-to-br from-pink-400 to-blue-400 filter 
                blur-3xl opacity-50 -z-50 " />

                <Image
                    src="https://yourzone.website/wp-content/uploads/2021/07/favicon-120x120.png"
                    alt="Trello clone"
                    width={120}
                    height={120}
                    className='w-38 pb-10 md:pb-0 object-contain'
                />

                {/* Search box */}
                <div className="flex items-center space-x-5 flex-1 justify-end w-full ">
                    <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
                        <MagnifyingGlassIcon className="h-6 w-6 text-grey-400" />
                        <input
                            type="text"
                            placeholder="search"
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                            className="flex-1 outline-none p-2 " />

                        <button type="submit" hidden>
                            search
                        </button>
                    </form>

                    <Avatar name='Marco Acciarri' round size="50" />
                </div>
            </div>

            <div className="flex items-center justify-center px-5 md:py-5 ">
                <p className="flex items-center text-sm pr-5 shadow-xl rounded-xl w-fit italic max-w-3xl">
                    <UserCircleIcon className="inline-block h-10 w-10 mr-1" />
                    GPT is summarizing your day...
                </p>
            </div>
        </header >
    )
}

export default Header