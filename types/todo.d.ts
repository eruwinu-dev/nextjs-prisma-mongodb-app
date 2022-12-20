export interface TodoType {
	id: string
	name: string
	completed: boolean
	authorId: string
}

export interface TodoDialogType {
	add: boolean
	edit: boolean
	delete: boolean
}

export type TodoDialogKeyType = "add" | "edit" | "delete"

export interface TodoContextType {
	todos: TodoType[]
	selectedTodoId: string | null
	getTodos: (todos: TodoType[]) => void
	addTodo: (name: string, authorId: string) => Promise<string | undefined>
	toggleTodo: (id: string) => Promise<boolean | undefined>
	editTodo: (name: string) => Promise<boolean | undefined>
	deleteTodo: (id: string) => Promise<boolean | undefined>
	selectTodo: (id: string | null) => void
	findTodo: (id: string) => TodoType | undefined
	todoDialog: TodoDialogType
	toggleTodoDialog: (dialogKey: TodoDialogKeyType) => void
}

