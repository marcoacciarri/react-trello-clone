'use client'

import { useBoardStore } from '@/store/BoardStore'
import React from 'react'
import { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

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

    // necessary function for DragDropContext that returns a DropResult
    const handleOnDragEnd = (result: DropResult) => {

    }

    return (
        <DragDropContext onDragEnd={e => handleOnDragEnd}>
            <Droppable droppableId="" direction="horizontal" type="column">
                {(provided) => (
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {Array.from(board.columns.entries()).map(([id, column], index) => (
                            <p>columns</p>
                        ))}

                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board