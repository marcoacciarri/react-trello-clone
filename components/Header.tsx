import Image from 'next/image'
import React from 'react'

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

            {/* Avatar*/}
        </header>
    )
}

export default Header