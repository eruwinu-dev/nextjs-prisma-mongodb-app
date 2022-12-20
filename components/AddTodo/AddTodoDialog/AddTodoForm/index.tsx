import React, { ChangeEvent, MouseEvent, useState } from "react"
import useTodoContext from "../../../../context/TodoState"
import useUserContext from "../../../../context/UserState"

type Props = {}

const AddTodoForm = (props: Props) => {
	const { addTodo } = useTodoContext()
	const { user } = useUserContext()
	const [name, setName] = useState<string>("")

	const changeNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		setName(event.target.value)
	}

	const addTodoHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		if (!name || !user) return
		const id = await addTodo(name, user.id)
		if (!id) return
	}

	return (
		<div className="p-4 space-y-2">
			<label htmlFor="name" className="font-semibold text-sm">
				Todo Name
			</label>
			<input type="text" name="name" value={name} onChange={changeNameHandler} placeholder="Add Todo" />
			<div className="flex flex-row items-center justify-end">
				<button type="button" className="bg-teal-500 text-white hover:bg-teal-600" onClick={addTodoHandler}>
					Add
				</button>
			</div>
		</div>
	)
}

export default AddTodoForm

