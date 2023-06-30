import { databases } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { data } from 'autoprefixer';
import { create } from 'zustand'

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>((set) => ({
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
      '648c59f262af4c5b2ba7',
      '648c5a1c155d64468b75',
      todo.$id,
      {
        title: todo.title,
        status: columnId
      }
    )
  }
}));