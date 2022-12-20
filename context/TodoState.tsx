import React, { createContext, ReactNode, useContext, useState } from "react"
import { TodoContextType, TodoDialogKeyType, TodoDialogType, TodoType } from "../types/todo"

type Props = {
	children: ReactNode
}

const TodoContext = createContext<TodoContextType | null>(null)

const todoDialogInitialValues: TodoDialogType = {
	add: false,
	edit: false,
	delete: false,
}

export const TodoProvider = ({ children }: Props) => {
	const [todos, setTodos] = useState<TodoType[]>([])
	const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null)

	const [todoDialog, setTodoDialog] = useState<TodoDialogType>(todoDialogInitialValues)

	const getTodos = (todos: TodoType[]) => setTodos(todos)

	const addTodo = async (name: string, authorId: string) => {
		let newTodo: TodoType | null = null
		let todoId
		try {
			const result = await fetch("/api/todo/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name, authorId }),
			})
			const { todo } = await result.json()
			newTodo = todo
			todoId = todo.id
		} finally {
			if (!newTodo) return
			toggleTodoDialog("add")
			const newTodos = [...todos, newTodo]
			setTodos(newTodos)
		}
		return todoId
	}

	const toggleTodo = async (id: string) => {
		let isComplete: boolean = false
		const newTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
		setTodos(newTodos)
		try {
			const selectedTodo = findTodo(id)
			if (!selectedTodo) return
			const result = await fetch("/api/todo/update", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id, name: selectedTodo.name, completed: !selectedTodo.completed }),
			})
			const { todo } = await result.json()
			isComplete = Boolean(todo.id)
		} finally {
			if (!isComplete) return
		}
		return isComplete
	}

	const editTodo = async (name: string) => {
		let isComplete: boolean = false
		const newTodos = todos.map((todo) => (todo.id === selectedTodoId ? { ...todo, name } : todo))
		setTodos(newTodos)
		try {
			if (!selectedTodoId) return
			const selectedTodo = findTodo(selectedTodoId)
			if (!selectedTodo) return
			const result = await fetch("/api/todo/update", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: selectedTodoId,
					name,
					completed: selectedTodo.completed,
				}),
			})
			const { todo } = await result.json()
			isComplete = Boolean(todo.id)
		} finally {
			if (!isComplete) return
			toggleTodoDialog("edit")
		}
		return isComplete
	}

	const deleteTodo = async (id: string) => {
		let isComplete: boolean = false
		try {
			const result = await fetch("/api/todo/delete", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			})
			const { todoId } = await result.json()
			isComplete = Boolean(todoId)
		} finally {
			if (!isComplete) return
			toggleTodoDialog("delete")
			const newTodos = todos.filter((todo) => todo.id !== id)
			setTodos(newTodos)
		}
		return isComplete
	}

	const selectTodo = (id: string | null) => setSelectedTodoId(id)

	const findTodo = (id: string) => todos.find((todo) => todo.id === id)

	const toggleTodoDialog = (dialogKey: TodoDialogKeyType) =>
		setTodoDialog((dialog) => ({ ...dialog, [dialogKey]: !dialog[dialogKey] }))

	const value: TodoContextType = {
		todos,
		selectedTodoId,
		getTodos,
		addTodo,
		toggleTodo,
		editTodo,
		deleteTodo,
		selectTodo,
		findTodo,
		todoDialog,
		toggleTodoDialog,
	}

	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}

const useTodoContext = () => useContext(TodoContext) as TodoContextType

export default useTodoContext

