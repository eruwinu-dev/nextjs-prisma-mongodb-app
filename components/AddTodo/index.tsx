import React, { MouseEvent } from "react"
import useTodoContext from "../../context/TodoState"
import AddTodoDialog from "./AddTodoDialog"

type Props = {}

const AddTodo = (props: Props) => {
	const { toggleTodoDialog } = useTodoContext()

	const toggleAddTodoDialogHandler = (event: MouseEvent<HTMLButtonElement>) => toggleTodoDialog("add")

	return (
		<>
			<div className="add-todo">
				<button
					type="button"
					className="bg-teal-500 text-white hover:bg-teal-600"
					onClick={toggleAddTodoDialogHandler}
				>
					Add
				</button>
			</div>
			<AddTodoDialog />
		</>
	)
}

export default AddTodo

