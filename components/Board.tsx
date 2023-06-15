'use client'

import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function Board() {
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