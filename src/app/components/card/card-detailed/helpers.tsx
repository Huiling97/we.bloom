import { type ReactNode } from 'react';

const displayCategoryOptions = (categories: string[]): ReactNode => {
  return categories.map((category) => {
    return (
      <option key={category} value={category}>
        {category}
      </option>
    );
  });
};

export { displayCategoryOptions };
