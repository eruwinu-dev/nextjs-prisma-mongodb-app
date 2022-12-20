import React from "react"
import useTodoContext from "../../context/TodoState"
import TodoItem from "./TodoItem"

type Props = {}

const TodoList = (props: Props) => {
	const { todos } = useTodoContext()
	return (
		<div className="todo-list">
			{todos.length ? todos.map((todo) => <TodoItem key={todo.id} todo={todo} />) : <h4>No todos.</h4>}
		</div>
	)
}

export default TodoList

