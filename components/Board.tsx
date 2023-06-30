'use client'

import { useBoardStore } from '@/store/BoardStore'
import React from 'react'
import { useEffect } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import Column from './Column'

function Board() {
    //const getBoard = useBoardStore((state) => state.getBoard)
    //const board = useBoardStore((state) => state.board)

    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state) => [
        state.board,
        state.getBoard,
        state.setBoardState,
        state.updateTodoInDB
    ]);

    useEffect(() => {
        getBoard();
    }, [getBoard]);

    // necessary function for DragDropContext that returns a DropResult
    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, type } = result;

        if (!destination) return;

        /* Handle column drag */
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
            });

            return;
        }

        /* Handle todo drag */
        const columns = Array.from(board.columns);

        // get start column
        const startColIndex = columns[Number(source.droppableId)];
        const startCol: Column = {
            id: startColIndex[0],
            todos: startColIndex[1].todos
        }

        // get end column
        const endColIndex = columns[Number(destination.droppableId)];
        const endCol: Column = {
            id: endColIndex[0],
            todos: endColIndex[1].todos
        }

        // protecting
        if (!startCol || !endCol) return;

        //if drag in same column AND same location
        if (source.index === destination.index && startCol === endCol) return;

        //get todos of start column to manipulate
        const newTodos = startCol.todos;

        // get moved todo (and remove from newTodos)
        const [movedTodo] = newTodos.splice(source.index, 1);

        if (startCol.id === endCol.id) {
            // if dragging in same column

            // insert movedTodo in new position
            newTodos.splice(destination.index, 0, movedTodo)

            //create new Column with updated todo order
            const newCol = {
                id: startCol.id,
                todos: newTodos,
            };

            //copy current columns for manipulating
            const newColumns = new Map(board.columns);

            //update the old start column with new column ( with the new todos )
            newColumns.set(startCol.id, newCol);

            // update board state
            setBoardState({ ...board, columns: newColumns });
        } else {
            // dragging to different column

            //get todos of end column and insert movedTodo
            const endTodos = Array.from(endCol.todos);
            endTodos.splice(destination.index, 0, movedTodo);

            //copy current columns for manipulating
            const newColumns = new Map(board.columns);

            //update columns with updated todos
            newColumns.set(startCol.id, {
                id: startCol.id,
                todos: newTodos,
            });

            newColumns.set(endCol.id, {
                id: endCol.id,
                todos: endTodos,
            });

            updateTodoInDB(movedTodo, endCol.id);

            setBoardState({ ...board, columns: newColumns });
        }
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="board" direction="horizontal" type="column">
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

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Board