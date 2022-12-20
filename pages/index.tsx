import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import React from "react"

import { getSession } from "next-auth/react"

type Props = {}

const Landing = ({}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	return (
		<>
			<Head>
				<title>MongoDB Next JS using Prisma</title>
			</Head>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (session) {
		return {
			redirect: {
				destination: "/home",
				permanent: false,
			},
		}
	} else {
		return {
			props: {
				user: null,
			},
		}
	}
}

export default Landing

