'use client'

import { useBoardStore } from '@/store/BoardStore'
import React from 'react'
import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function Board() {
    const getBoard = useBoardStore((state) => state.getBoard)
    useEffect(() => {
        getBoard();
    }, [getBoard])

    return (
        <h1>hello</h1>
        // <DragDropContext>
        //     <Droppable droppableId="" direction="horizontal" type="column">
        //         {(provided) => (
        //             <div>{/* rendering columns*/}</div>
        //         )}
        //     </Droppable>
        // </DragDropContext>
    )
}

export default Board