export interface IItem {
  id: number;
  name: string;
  active: boolean;
}

export enum Filters {
  all = 'All',
  active = 'Active',
  complete = 'Complete',
}
