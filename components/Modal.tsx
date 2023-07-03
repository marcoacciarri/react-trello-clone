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
        <Dialog open={isOpen} onClose={closeModal}>
            <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                    This will permanently deactivate your account
                </Dialog.Description>

                <p>
                    Are you sure you want to deactivate your account? All of your data
                    will be permanently removed. This action cannot be undone.
                </p>

                <button onClick={closeModal}>Cancel</button>
            </Dialog.Panel>
        </Dialog>
    )
}

export default Modal