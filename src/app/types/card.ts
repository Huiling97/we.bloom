export type CardGenericProps = {
  title: string;
  image: string;
};

export interface CardGenericObjectProps {
  [name: string]: {
    imageSrc: string;
  };
}
