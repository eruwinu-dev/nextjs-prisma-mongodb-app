import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"
import { TodoType } from "../../../types/todo"

type Data = {
	todo: TodoType
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id, name, completed } = req.body
	const todo = (await prisma.todo.update({
		where: {
			id,
		},
		data: {
			name,
			completed,
		},
	})) as TodoType
	res.status(200).json({ todo })
}

export default handler

