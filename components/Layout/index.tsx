import React, { ReactNode } from "react"
import { TodoProvider } from "../../context/TodoState"
import { UserProvider } from "../../context/UserState"

import Header from "../Header"

type Props = {
	children: ReactNode
}

const Layout = ({ children }: Props) => {
	return (
		<UserProvider>
			<TodoProvider>
				<Header />
				<main>{children}</main>
			</TodoProvider>
		</UserProvider>
	)
}

export default Layout

