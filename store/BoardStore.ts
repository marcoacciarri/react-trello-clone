import { databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { ID } from 'appwrite';
import { create } from 'zustand'

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;

  image: File | null;
  setImage: (image: File | null) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  newTaskInput: string;
  setNewTaskInput: (newTaskInput: string) => void;

  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;

  addTask: (todo: string, columnId: TypedColumn, image?: File | null) => void;

  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn()
    set({ board })
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION!,
      todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    )
  },

  image: null,
  setImage: (image: File | null) => set({ image }),

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  newTaskInput: "",
  setNewTaskInput: (newTaskInput) => set({ newTaskInput }),

  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  addTask: async (todo: string, columnId: TypedColumn, image?: File | null) => {
    let file: Image | undefined;

    // upload image if any
    if (image) {
      const fileUploaded = await uploadImage(image);

      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id
        };
      }
    }

    // destructure response to get document id
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) })
      }
    );

    set({ newTaskInput: "" });

    set((state) => {
      // creaty copy of board
      const newColumns = new Map(state.board.columns);

      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      }

      // get column in which new todo was entered
      const column = newColumns.get(columnId);

      // put new todo in column
      if (!column) {
        //if column doenst exist, create it and put new todo inside
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        })
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return {
        board: {
          columns: newColumns,
        }
      }
    });

  },
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    //get copy current state of board
    const newColumns = new Map(get().board.columns);

    //remove todoId from newColumns
    newColumns.get(id)?.todos.splice(taskIndex, 1);

    //update board
    set({ board: { columns: newColumns } });

    //delete image from storage
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }

    //delete todo in db
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id
    );
  }
}));