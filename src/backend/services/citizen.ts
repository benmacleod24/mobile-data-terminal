import { prisma } from '@prisma';

class CitizenService {
	public readonly perPagelimit: number;

	constructor() {
		this.perPagelimit = 5;
	}

	/**
	 * Get citizens with pagination.
	 * @param page For pagination of citizen records.
	 * @returns cout and citizens.
	 */
	getCitizens = async (page?: number) => {
		// Get total number of citizens.
		const totalNumOfCitiznes = await prisma.citizens.count({
			where: { deleted_at: null },
		});

		// Collect citizens records.
		// @todo Make sure pagination works.
		const citizens = await prisma.citizens.findMany({
			take: this.perPagelimit,
			skip: page! * this.perPagelimit || 0,
			where: {
				deleted_at: null,
			},
		});

		return { citizens, _cout: totalNumOfCitiznes };
	};
}

export { CitizenService };
export default CitizenService;
