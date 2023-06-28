import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number

}

function Column(id, todos, index: Props) {
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