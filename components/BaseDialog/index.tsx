import React, { MouseEvent, ReactNode } from "react"
import useTodoContext from "../../context/TodoState"
import CloseIcon from "../../lib/icons"
import { TodoDialogKeyType } from "../../types/todo"

type Props = {
	dialogKey: TodoDialogKeyType
	children: ReactNode
	title: string
	closeOnBlur?: boolean
}

const BaseDialog = ({ dialogKey, children, title, closeOnBlur = true }: Props) => {
	const { todoDialog, toggleTodoDialog } = useTodoContext()

	if (!todoDialog[dialogKey]) return <></>

	return (
		<div className="dialog-container">
			<div className="dialog-backdrop" onClick={closeOnBlur ? () => toggleTodoDialog(dialogKey) : () => {}} />
			<div className="dialog-panel">
				<div>
					<h5>{title}</h5>
					<button type="button" onClick={() => toggleTodoDialog(dialogKey)}>
						Close
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	)
}

export default BaseDialog

