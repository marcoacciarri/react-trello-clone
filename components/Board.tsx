'use client'

import { useBoardStore } from '@/store/BoardStore'
import React from 'react'
import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function Board() {
    //const getBoard = useBoardStore((state) => state.getBoard)
    //const board = useBoardStore((state) => state.board)

    const [board, getBoard] = useBoardStore((state) => [
        state.board,
        state.getBoard
    ])

    useEffect(() => {
        getBoard();
    }, [getBoard])

    console.log(board)

    return (
        <DragDropContext>
            <Droppable droppableId="" direction="horizontal" type="column">
                {(provided) => (
                    <div>{/* rendering columns*/}</div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board