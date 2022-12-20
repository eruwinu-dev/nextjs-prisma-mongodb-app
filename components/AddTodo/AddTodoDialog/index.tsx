import React from "react"
import BaseDialog from "../../BaseDialog"
import AddTodoForm from "./AddTodoForm"

type Props = {}

const AddTodoDialog = (props: Props) => {
	return (
		<BaseDialog dialogKey="add" title="Add Todo" closeOnBlur={false}>
			<AddTodoForm />
		</BaseDialog>
	)
}

export default AddTodoDialog

