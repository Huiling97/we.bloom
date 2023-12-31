import { type CardCategoryProps } from './card/card-category.ts';
import { type CardServiceFormInputProps } from './form.ts';

export type onDeleteCategoryHandlerProps = (id: string) => void;
export type onEditHandlerCategoeyProps = (value: CardCategoryProps) => void;
export type onDeleteServiceHandlerProps = (key: string, id: string) => void;
export type onEditServiceHandlerProps = (
  service: CardServiceFormInputProps
) => void;

export type TabsSwitchProps = {
  deleteCategory: onDeleteCategoryHandlerProps;
  editCategory: onEditHandlerCategoeyProps;
  deleteService: onDeleteServiceHandlerProps;
  editService: onEditServiceHandlerProps;
};
