'use client';

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

function Modal() {
    let [isOpen, setIsOpen] = useState(true);

    return (
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >
            <Dialog onClose={() => setIsOpen(false)}>
                <Dialog.Panel>
                    <Dialog.Title>Deactivate account</Dialog.Title>
                    {/* ... */}
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}

export default Modal