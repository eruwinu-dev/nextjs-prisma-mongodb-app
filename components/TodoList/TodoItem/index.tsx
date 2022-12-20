import React, { ChangeEvent, MouseEvent } from "react"
import useTodoContext from "../../../context/TodoState"
import { TodoType } from "../../../types/todo"

type Props = {
	todo: TodoType
}

const TodoItem = ({ todo }: Props) => {
	const { selectTodo, toggleTodo, toggleTodoDialog } = useTodoContext()

	const toggleTodoHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		await toggleTodo(todo.id)
	}

	const openDialogHandler = (dialog: "edit" | "delete") => (event: MouseEvent<HTMLButtonElement>) => {
		selectTodo(todo.id)
		toggleTodoDialog(dialog)
	}

	return (
		<div className="todo-item">
			<div>
				<input type="checkbox" checked={todo.completed} onChange={toggleTodoHandler} />
				<div className={todo.completed ? "line-through" : ""}>{todo.name}</div>
			</div>
			<div>
				<button
					type="button"
					className="bg-blue-500 text-white hover:bg-blue-600"
					onClick={openDialogHandler("edit")}
				>
					Edit
				</button>
				<button
					type="button"
					className="bg-red-500 text-white hover:bg-red-600"
					onClick={openDialogHandler("delete")}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default TodoItem

