export const stringToNumber = (s?: string): number | undefined | null => {
	if (s === undefined) return undefined;
	const res = Number(s);
	if (isNaN(res)) return null;
	return res;
};

export const stringToBool = (s?: string): boolean => {
	if (s === undefined) return false;
	const isTrue = s === 'true' || s === '1';
	return isTrue ?? false;
};
