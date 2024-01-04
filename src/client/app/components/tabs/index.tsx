import { useContext } from 'react';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { type CardCategoryProps } from '../../types/card/card-category.ts';
import { type TabsSwitchProps } from '../../types/tabs.ts';
import { displayCategories, displayServices } from './helpers.tsx';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ServicesContext } from '../../store/services-context.tsx';

const TabSwitch = ({
  deleteCategory,
  editCategory,
  deleteService,
  editService,
}: TabsSwitchProps) => {
  const { categories } = useContext(CategoriesContext);
  const { services } = useContext(ServicesContext);

  const tabOptions = () => {
    return Object.values(categories).map(
      (category: CardCategoryProps, index) => {
        return (
          <Nav.Item key={index}>
            <Nav.Link
              eventKey={`${category.name}`}
            >{`${category.name}`}</Nav.Link>
          </Nav.Item>
        );
      }
    );
  };

  const tabContent = () => {
    return Object.values(categories).map(
      (category: CardCategoryProps, index) => {
        const selectedService = services[category.name];

        return (
          <Tab.Pane eventKey={`${category.name}`} key={index}>
            {displayServices(selectedService, deleteService, editService)}
          </Tab.Pane>
        );
      }
    );
  };

  return (
    <Tab.Container defaultActiveKey='All'>
      <Row>
        <Col sm={2}>
          <Nav variant='pills' className='flex-column'>
            <Nav.Item>
              <Nav.Link eventKey='All'>All</Nav.Link>
            </Nav.Item>
            {tabOptions()}
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey='All'>
              {displayCategories(categories, deleteCategory, editCategory)}
            </Tab.Pane>
            {tabContent()}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default TabSwitch;
