import { Category } from '../../models/category';

export interface CategoryContextData {
  loading?: boolean;
  categories: Category[];
  getCategories(): Promise<void>;
}

export interface CategoryState {
  loading?: boolean;
  categories: Category[];
}

export interface CategoryList {
  categories: Category[];
}
