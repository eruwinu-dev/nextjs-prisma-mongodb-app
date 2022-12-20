import React, { MouseEvent } from "react"
import useTodoContext from "../../context/TodoState"
import BaseDialog from "../BaseDialog"

type Props = {}

const DeleteTodoDialog = (props: Props) => {
	const { deleteTodo, selectedTodoId, findTodo, toggleTodoDialog } = useTodoContext()

	const selectedTodo = selectedTodoId ? findTodo(selectedTodoId) : undefined

	if (!selectedTodo) return <></>

	const deleteTodoHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		const isDeleted = await deleteTodo(selectedTodo.id)
		if (!isDeleted) return
	}

	const closeDeleteTodoDialogHandler = (event: MouseEvent<HTMLButtonElement>) => toggleTodoDialog("delete")

	return (
		<BaseDialog closeOnBlur={true} dialogKey="delete" title="Delete Todo?">
			<div className="w-full p-4">
				Delete Todo <span className="font-semibold">{selectedTodo.name}</span>? This cannot be undone.
			</div>
			<div className="w-full p-4 inline-flex items-center justify-end space-x-2">
				<button type="button" className="bg-red-500 text-white hover:bg-red-600" onClick={deleteTodoHandler}>
					Delete
				</button>
				<button
					type="button"
					className="bg-gray-300 text-white hover:bg-gray-400"
					onClick={closeDeleteTodoDialogHandler}
				>
					Cancel
				</button>
			</div>
		</BaseDialog>
	)
}

export default DeleteTodoDialog

