import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { TabsTopProps } from '../../../types/components/tabs';
import CardProduct from '../../card/card-product';

const TabsTop = ({ categories, products }: TabsTopProps) => {
  const [key, setKey] = useState('all');

  const displayCategoryContent = () =>
    products.filter((product) => product.category === key);

  const displayCategory = () =>
    categories &&
    Object.keys(categories).map((type) => {
      return (
        <Tab key={type} eventKey={type} title={type.toUpperCase()}>
          <CardProduct products={displayCategoryContent()} />
        </Tab>
      );
    });

  return (
    <Tabs activeKey={key} onSelect={(k) => setKey(k!)} className='mb-3'>
      <Tab eventKey='all' title='All'>
        <CardProduct products={products} />
      </Tab>
      {displayCategory()}
    </Tabs>
  );
};

export default TabsTop;
