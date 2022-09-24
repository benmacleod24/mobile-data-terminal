import { AccountPermisssions } from '@/backend/services';
import { PermissionKeys } from '@/config';
import { toQuery } from '@/utils';
import { ApiResponse } from '@/utils/format-response';

/**
 * Get an accounts permissions.
 * @endpoint `/api/permissions`
 * @returns Api response with permissions.
 */
export const getAccountPermissions = async (): Promise<
	ApiResponse<AccountPermisssions>
> => {
	const permissions = (await fetch(`/api/permissions`).then((resp) =>
		resp.json()
	)) as ApiResponse<AccountPermisssions>;

	return permissions;
};
