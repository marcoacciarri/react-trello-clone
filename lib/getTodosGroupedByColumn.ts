import { databases } from "@/appwrite"
//import { todo } from "node:test";

export const getTodosGroupedByColumn = async () => {
    const data = await databases.listDocuments(
        '648c59f262af4c5b2ba7',
        '648c5a1c155d64468b75',
    );

    const todos = data.documents;

    const columns = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            //get image if it exists
            ...(todo.image && { image: JSON.parse(todo.image) })
        })

        return acc
    }, new Map<TypedColumn, Column>());

    // create column if it doesn't exist
    const columnTypes: TypedColumn[] = ['todo', 'inprogress', 'done']
    for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                todos: []
            })
        }
    }

    //sort columns according to columnTypes
    const sortedColumns = new Map(
        Array.from(columns.entries()).sort(
            (a, b) => (columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
        )
    )

    const board: Board = {
        columns: sortedColumns
    }

    return board
}