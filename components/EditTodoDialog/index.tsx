import React from "react"
import BaseDialog from "../BaseDialog"
import EditTodoForm from "./EditTodoForm"

type Props = {}

const EditTodoDialog = (props: Props) => {
	return (
		<BaseDialog dialogKey="edit" closeOnBlur={false} title="Edit Todo">
			<EditTodoForm />
		</BaseDialog>
	)
}

export default EditTodoDialog

