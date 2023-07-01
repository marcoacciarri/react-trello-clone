'use client';

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore';

function Modal() {
    const [isOpen, closeModal] = useModalStore((state) => [
        state.isOpen,
        state.closeModal,
    ]);

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
            <Dialog onClose={closeModal}>
                <Dialog.Panel>
                    <Dialog.Title>Deactivate account</Dialog.Title>
                    {/* ... */}
                </Dialog.Panel>
            </Dialog>
        </Transition>
    )
}

export default Modal