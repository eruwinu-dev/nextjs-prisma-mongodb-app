import React, { ChangeEvent, MouseEvent, useState } from "react"
import useTodoContext from "../../../context/TodoState"

type Props = {}

const EditTodoForm = (props: Props) => {
	const { editTodo, selectTodo, toggleTodoDialog, findTodo, selectedTodoId } = useTodoContext()

	const selectedTodo = selectedTodoId ? findTodo(selectedTodoId) : undefined

	const [name, setName] = useState<string>(selectedTodo?.name || "")

	const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		setName(event.target.value)
	}

	const editTodoHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		if (!name) return
		const id = await editTodo(name)
		if (!id) return
		setName("")
	}

	const cancelTodoHandler = (event: MouseEvent<HTMLButtonElement>) => {
		toggleTodoDialog("edit")
		selectTodo(null)
	}

	if (!selectedTodo) return <></>

	return (
		<div className="p-4 space-y-2">
			<label htmlFor="name" className="font-semibold text-sm">
				Todo Name
			</label>
			<input type="text" name="name" value={name} onChange={changeNameHandler} placeholder="Add Todo" />
			<div className="flex flex-row items-center justify-end space-x-2">
				<button type="button" className="bg-blue-500 text-white hover:bg-blue-600" onClick={editTodoHandler}>
					Save
				</button>
				<button type="button" className="bg-gray-300 text-white hover:bg-gray-400" onClick={cancelTodoHandler}>
					Cancel
				</button>
			</div>
		</div>
	)
}

export default EditTodoForm

