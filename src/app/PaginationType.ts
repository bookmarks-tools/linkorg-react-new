type MetaType = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

type LinksType = {
  first: string;
  previous: string;
  next: string;
  last: string;
};

export type PaginationType<T> = {
  items: T[];
  meta: MetaType;
  links: LinksType;
};
