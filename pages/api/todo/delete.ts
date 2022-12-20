import prisma from "../../../prisma/prisma"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
	todoId: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { id } = req.body
	const result = await prisma.todo.delete({
		where: {
			id,
		},
	})
	res.status(200).json({ todoId: result.id })
}

export default handler

