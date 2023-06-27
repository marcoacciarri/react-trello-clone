
interface Board {
    columns: Map<TypeColumn, Column>
}

type TypedColumn = "todo" | "inprogress" | "done"

interface Column {
    id: TypeColumn,
    todo: Todo[]
}

interface Todo {
    $id: string;
    $createdAt: string;
    title: string;
    status: TypedColumn;
    image?: Image;
}

interface Image {
    bucketId: string;
    fileId: string;
}