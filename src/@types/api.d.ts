declare namespace Api {
	interface Response<T> {
		data: T;
		meta: {
			request_at: Date;
			endpoint: string;
		};
	}

	type WithPagination<T> = {
		_pagination: {
			cout: number;
			perPage: number;
			totalNumOfPages: number;
		};
	} & T;
}
