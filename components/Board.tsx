'use client'

import { useBoardStore } from '@/store/BoardStore'
import React from 'react'
import { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'

function Board() {
    //const getBoard = useBoardStore((state) => state.getBoard)
    //const board = useBoardStore((state) => state.board)

    const [board, getBoard, setBoardState] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
    ])

    useEffect(() => {
        getBoard();
    }, [getBoard])

    // necessary function for DragDropContext that returns a DropResult
    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result

        if (!destination) return;

        //Handle column drag
        if (type === 'column') {
            // get columns in board
            const entries = Array.from(board.columns.entries());

            //remove source column from entries and save in removed
            const [removed] = entries.splice(source.index, 1);

            //push removed item into the destination column
            entries.splice(destination.index, 0, removed);

            //update board state with new column result
            const rearrangedColumns = new Map(entries);
            setBoardState({
                ...board,
                columns: rearrangedColumns,
            })
        }
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
                            <Column
                                key={id}
                                id={id}
                                todos={column.todos}
                                index={index}
                            />
                        ))}

                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board