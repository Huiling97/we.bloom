import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';
import { CartItemsProps } from '../../types/context/cart';

const mock = new MockAdaptor(axios);

const setupAxiosMock = (url: string, res: CartItemsProps[]) => {
  mock.onGet(url).reply(200, res);
};

export { setupAxiosMock };
