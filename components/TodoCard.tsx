'use client'
import React from 'react'
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps;
}

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) {
    return (
        <div
            className='rounded-md space-y-2 drop-shadow-md'
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
        >{todo.title}</div>
    )
}

export default TodoCard