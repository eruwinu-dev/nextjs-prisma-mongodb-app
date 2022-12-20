import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import React, { useEffect, useRef } from "react"
import { UserType } from "../types/user"
import { TodoType } from "../types/todo"

import prisma from "../prisma/prisma"
import useUserContext from "../context/UserState"
import useTodoContext from "../context/TodoState"
import TodoList from "../components/TodoList"
import AddTodo from "../components/AddTodo"
import DeleteTodoDialog from "../components/DeleteTodoDialog"
import EditTodoDialog from "../components/EditTodoDialog"

type Props = {
	user: UserType
	todos: TodoType[]
}

const Home = ({ user: userData, todos: todoData }: Props) => {
	const { setUser } = useUserContext()
	const { getTodos } = useTodoContext()
	const calledOnce = useRef(false)

	useEffect(() => {
		if (calledOnce.current) return
		else {
			setUser(userData)
			getTodos(todoData)
			calledOnce.current = true
		}
		return () => {}
	}, [])

	return (
		<>
			<Head>
				<title>Home | Next JS Prisma with MongoDB</title>
			</Head>
			<section>
				<AddTodo />
				<TodoList />
				<DeleteTodoDialog />
				<EditTodoDialog />
			</section>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (!session || !session.user)
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		}

	const email = session.user.email || ""
	const user = (await prisma.user.findUnique({
		where: {
			email,
		},
	})) as UserType
	const todos = (await prisma.todo.findMany({
		where: {
			authorId: user.id,
		},
	})) as TodoType[]
	return {
		props: {
			user,
			todos,
		},
	}
}

export default Home

