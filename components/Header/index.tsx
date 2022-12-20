import React from "react"
import { signOut, signIn } from "next-auth/react"
import useUserContext from "../../context/UserState"

type Props = {}

const Header = (props: Props) => {
	const { user } = useUserContext()
	return (
		<header>
			<nav>
				<div>
					<h3>Todo List</h3>
				</div>
				<div></div>
				<div>
					{user ? (
						<>
							<span>{`Signed in as ${user.name}`}</span>
							<button onClick={() => signOut()}>Sign Out</button>
						</>
					) : (
						<button onClick={() => signIn("github")}>Sign In</button>
					)}
				</div>
			</nav>
		</header>
	)
}

export default Header

