import { useContext, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { type CardCategoryProps } from '../../types/card/card-category.ts';
import { type CardServiceFormInputProps } from '../../types/form.ts';
import { type TabsSwitchProps } from '../../types/tabs.ts';
import { displayCategories, displayServices } from './helpers.tsx';
import { CategoriesContext } from '../../store/categories-context.tsx';
import { ServicesContext } from '../../store/services-context.tsx';
import SearchBar from '../search/index.tsx';

const TabSwitch = ({
  deleteCategory,
  editCategory,
  deleteService,
  editService,
}: TabsSwitchProps) => {
  const { categories } = useContext(CategoriesContext);
  const { services } = useContext(ServicesContext);

  const [searchInput, setSearchInput] = useState('');

  const filterCategoryData = () => {
    const filteredCategories = Object.values(categories).filter((category) =>
      category.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
    );
    return filteredCategories;
  };

  const filterServiceData = (services: CardServiceFormInputProps[]) => {
    const filteredServices = services.filter((service) =>
      service.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    return filteredServices;
  };

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

  const tabServiceContent = () => {
    return Object.values(categories).map(
      (category: CardCategoryProps, index) => {
        const selectedService = services[category.name];

        return (
          <Tab.Pane eventKey={`${category.name}`} key={index}>
            {displayServices(
              filterServiceData(selectedService),
              deleteService,
              editService
            )}
          </Tab.Pane>
        );
      }
    );
  };

  return (
    <div className='tabs-content-container'>
      <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
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
                {displayCategories(
                  filterCategoryData(),
                  deleteCategory,
                  editCategory
                )}
              </Tab.Pane>
              {tabServiceContent()}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default TabSwitch;
