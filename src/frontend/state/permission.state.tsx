import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import * as React from 'react';
import { getAccountPermissions } from '../api/permissions';

// Inital state for the context
export const initalState: Record<string, boolean> = {};

/**
 * Initalize the permission context.
 * @todo add correct types in here.
 */
export const permissionContext = React.createContext<{
	state: Record<string, boolean>;
	dispatch: React.Dispatch<any>;
}>({
	dispatch: () => {},
	state: initalState,
});

/**
 * Reducer for context actions.
 * @param state Current state of the context.
 * @param action Actions that is being executed, comes with data.
 * @returns A new state for the context.
 */
const permissionReducer = (
	state: Record<string, boolean>,
	action: any
): Record<string, boolean> => {
	const { type, payload } = action;

	// Case for the action type here.
	// Each case must return a new state.
	switch (type) {
		case 'SET_PERMISSIONS':
			let newPermissions = {};

			/**
			 * Map through the payload to store it in a kvp form.
			 * Much quicker than searching through an array.
			 */
			payload &&
				payload.map((p: any) => {
					newPermissions = {
						...newPermissions,
						[p.permission.key]: true,
					};
				});

			return newPermissions;
		default:
			return state;
	}
};

/**
 * Component provider to pass the context down to all it's children.
 * @returns provider wrapper for app.
 */
export const PermissionProvider: React.FC<React.PropsWithChildren> = ({
	children,
}) => {
	const [state, dispatch] = React.useReducer(permissionReducer, initalState);
	const { status } = useSession();

	/**
	 * Using react query to cache permission request everytime.
	 * @dependency Session status is a dependency of this query.
	 */
	const { data: permissions, isLoading } = useQuery(
		['permissions', status],
		getAccountPermissions
	);

	// Effect Listener for when permissions update.
	React.useEffect(() => {
		if (!isLoading && permissions) {
			dispatch({
				type: 'SET_PERMISSIONS',
				payload: permissions?.data,
			});
		}
	}, [permissions]);

	return (
		<permissionContext.Provider value={{ state, dispatch }}>
			{children}
		</permissionContext.Provider>
	);
};

/**
 * Simple hook used for quick access to the permission context.
 * @returns permission context all ready to go.
 */
export const usePermissions = () => {
	return React.useContext(permissionContext);
};
