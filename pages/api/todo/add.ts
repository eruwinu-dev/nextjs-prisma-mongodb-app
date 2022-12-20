import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { TodoType } from "../../../types/todo"

type Data = {
	todo: TodoType
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { name, authorId } = req.body
	const todo = (await prisma.todo.create({
		data: {
			name: name,
			authorId: authorId,
		},
	})) as TodoType
	res.status(200).json({ todo })
}

export default handler

