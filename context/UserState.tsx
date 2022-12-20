import React, { createContext, ReactNode, useContext, useState } from "react"
import { UserContextType, UserType } from "../types/user"

type Props = {
	children: ReactNode
}

const UserContext = createContext<UserContextType | null>(null)

export const UserProvider = ({ children }: Props) => {
	const [user, setUser] = useState<UserType | null>(null)

	const value: UserContextType = {
		user,
		setUser,
	}

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

const useUserContext = () => useContext(UserContext) as UserContextType

export default useUserContext

