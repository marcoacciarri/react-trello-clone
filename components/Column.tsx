import { PlusCircleIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'

type Props = {
    id: TypedColumn,
    todos: Todo[],
    index: number,
}

const idToColumnText: {
    [key in TypedColumn]: string
} = {
    "todo": "Todo",
    "inprogress": "In Progress",
    "done": "Done",
}

function Column({ id, todos, index }: Props) {
    return (
        <Draggable draggableId={id} index={index} >
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {/* render draggable todos in column */}
                    <Droppable droppableId={index.toString()} type="card" >
                        {(provided, snapshot) => (
                            <div
                                className={`p-2 rounded-2xl shadow-sm ${snapshot.isDraggingOver ? 'bg-green-200/' : 'bg-white/50'
                                    }`}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h1 className='flex justify-between align-center font-bold text-xl p2 '>
                                    {idToColumnText[id]}
                                    <span className='text-grey-500 bg-gray-200 rounded-full px-2 py-1 text-small font-normal '>
                                        {todos.length}
                                    </span>
                                </h1>

                                <div className='space-y-2 '>
                                    {todos.map((todo, index) => (
                                        <Draggable
                                            key={todo.$id}
                                            draggableId={todo.$id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <TodoCard
                                                    todo={todo}
                                                    index={index}
                                                    id={id}
                                                    innerRef={provided.innerRef}
                                                    draggableProps={provided.draggableProps}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}

                                    <div className="flex items-end justify-end py-2">
                                        <button className='text-green-500 hover:text-green-600'>
                                            <PlusCircleIcon className='h-10 w-10' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Droppable>

                </div>
            )}
        </Draggable>
    )
}

export default Column