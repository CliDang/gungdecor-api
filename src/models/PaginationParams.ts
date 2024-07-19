export interface PaginationParams<T> {
    pageIndex: number;
    pageSize: number;
    sort: 'ASC' | 'DESC';
    sortBy: keyof T;
  }
  