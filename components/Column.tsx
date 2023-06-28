import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

function Column() {
    return (
        <Draggable>
            {(provided) => (
                <div>
                    {/* render draggable todos in column */}
                    todos
                </div>
            )}
        </Draggable>
    )
}

export default Column