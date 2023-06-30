const formatTodosForAI = (board: Board) => {
    const todos = Array.from(board.columns.entries());

    //reduce todos to key(todo type): value(todos)
    const flatArray = todos.reduce((map, [key, value]) => {
        map[key as TypedColumn] = value.todos;
        return map;
    }, {} as { [key in TypedColumn]: Todo[] });

    //reduce todos to key(todo type): value(number of todos)
    const flatArrayCounted = Object.entries(flatArray).reduce((map, [key, value]) => {
        map[key as TypedColumn] = value.length;
        return map;
    }, {} as { [key in TypedColumn]: number });

    return flatArrayCounted;
}

export default formatTodosForAI;