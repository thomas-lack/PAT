export interface DataAccessInterface<T> {
	getById(id: number): Promise<T>;
	create(item: any): Promise<T>;
	read(): Promise<T[]>;
	update(item: any): Promise<[number, T[]]>;
	destroy(item: any): Promise<number>;
}
