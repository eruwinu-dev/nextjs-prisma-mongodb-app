export interface UserType {
	id: string
	name: string
	email: string
	image: string
}

export interface UserContextType {
	user: UserType | null
	setUser: Dispatch<SetStateAction<UserType | null>>
}

