interface Page<T> {
    rows: T[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    pageSize: number;
  }
  
  export default Page;
  