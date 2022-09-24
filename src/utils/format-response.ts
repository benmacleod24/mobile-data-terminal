import { NextApiRequest } from 'next';

export interface ApiResponse<T = any> {
	data: T;
	meta: {
		request_at: Date;
		endpoint: string;
	};
}

export const ApiResponse = (
	req: NextApiRequest,
	data: Record<string, any> | string | number | any[] | any
) => {
	return {
		data,
		meta: {
			request_at: new Date(),
			endpoint: req.url,
		},
	};
};
