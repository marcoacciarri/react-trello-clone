'use client';

import { Dialog } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore';
import { useBoardStore } from '@/store/BoardStore';
import TaskTypeRadioGroup from './TaskTypeRadioGroup';
import { useRef } from 'react';
import Image from 'next/image';
import { PhotoIcon } from '@heroicons/react/24/solid';

function Modal() {
    const imagePickerRef = useRef<HTMLInputElement>(null);

    const [isOpen, closeModal] = useModalStore((state) => [
        state.isOpen,
        state.closeModal,
    ]);

    const [image, setImage, newTaskInput, setNewTaskInput] = useBoardStore((state) => [
        state.image,
        state.setImage,
        state.newTaskInput,
        state.setNewTaskInput,
    ]);

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4 text-center'>
                    <Dialog.Panel className='w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left aling-middle shadow-xl transition-all'>
                        <Dialog.Title as='h3' className='text-lg font-medium leading-6 text-gray-900 pb-2'>
                            Add a task
                        </Dialog.Title>

                        <div className='mt-2'>
                            <input
                                type="text"
                                value={newTaskInput}
                                onChange={(e) => setNewTaskInput(e.target.value)}
                                placeholder="Enter a task here"
                                className="w-full border border-gray-300 rounded-md outline-none p-5 text-gray-900"
                            >
                            </input>
                        </div>

                        <TaskTypeRadioGroup />
                        <div>
                            <button
                                type="button"
                                className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 text-gray-500'
                                onClick={() => {
                                    imagePickerRef.current?.click();
                                }}
                            >
                                <PhotoIcon
                                    className='h-6 w-6 mr-2 inline-block'
                                />
                                Upload Image
                            </button>
                            {image && (
                                <Image
                                    alt="Upload image"
                                    width={200}
                                    height={200}
                                    className="w-full h-44 object-cover mt-2 filter hover:grayscale transition-all duration-150 cursor-not-allowed"
                                    src={URL.createObjectURL(image)}

                                    onClick={() => {
                                        setImage(null);
                                    }}
                                />
                            )}

                            <input
                                type="file"
                                ref={imagePickerRef}
                                hidden
                                onChange={(e) => {
                                    if (!e.target.files![0].type.startsWith("image/")) return;
                                    setImage(e.target.files![0]);
                                }}
                            />
                        </div>

                        <Dialog.Description>
                            This will permanently deactivate your account
                        </Dialog.Description>

                        <p>
                            Are you sure you want to deactivate your account? All of your data
                            will be permanently removed. This action cannot be undone.
                        </p>

                        <button onClick={closeModal}>Cancel</button>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}

export default Modal