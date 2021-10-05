import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../../services/api';
import { CategoryContextData, CategoryList, CategoryState } from './interfaces';

const CategoryContext = createContext<CategoryContextData>(
  {} as CategoryContextData,
);

export const CategoryProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<CategoryState>({} as CategoryState);

  const getCategories = useCallback(async () => {
    setData({ ...data, loading: true });
    const response = await api.get<CategoryList>('categories');

    const { categories } = response.data;

    setData({ categories, loading: false });
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories: data.categories,
        getCategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export function useCategory(): CategoryContextData {
  const context = useContext(CategoryContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
