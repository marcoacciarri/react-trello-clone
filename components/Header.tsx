'use client';

import Image from 'next/image'
import React from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from 'react-avatar'

function Header() {
    return (
        <header>
            <div className="flex flex-col md:flex-col items-center p-5 bg-gray500/10 rounded-b-2xl" >
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
                            className="flex-1 outline-none p-2 " />

                        <button type="submit" hidden>
                            search
                        </button>
                    </form>

                    <Avatar name='Marco Acciarri' round size="50" />
                </div>
            </div>
        </header >
    )
}

export default Header