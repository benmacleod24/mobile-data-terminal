import { toQuery } from '@/utils';
import { Citizens } from '@prisma/client';

/**
 * Collect all the citizens from the api based on page.
 * @param page Page number of which you wish to collect.
 * @returns Citizens response data.
 */
export const getCitziens = async (): Promise<
	Api.Response<Api.WithPagination<{ citizens: Citizens[] }>>
> => {
	const response = await fetch(
		`/api/database/citizens?${toQuery({ page: String(0) })}`,
		{
			method: 'GET',
		}
	).then((res) => res.json());
	console.log('Running');
	return response;
};
