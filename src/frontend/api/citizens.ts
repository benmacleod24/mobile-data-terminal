import { toQuery } from '@/utils';

/**
 * Collect all the citizens from the api based on page.
 * @param page Page number of which you wish to collect.
 * @returns Citizens response data.
 */
export const getCitziens = async (page: number) => {
	const response = await fetch(
		`/api/database/citizens?${toQuery({ page })}`
	).then((res) => res.json());
	return response;
};
