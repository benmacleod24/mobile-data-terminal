import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@prisma';
import { Password } from '@/backend/services/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { hashPassword } = new Password({});
	const newPassword = hashPassword(req.query.password as string);
	const success = await prisma.account.update({
		data: { password: newPassword },
		where: {
			id: Number(req.query.id),
		},
	});

	res.status(200).json({ success });
};

export default handler;
