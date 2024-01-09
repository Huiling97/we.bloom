import { servicesMock } from '../service-mock';

export const mockServicesContextValue = {
  services: servicesMock,
  setServices: jest.fn(),
  addService: jest.fn(),
  updateService: jest.fn(),
  deleteService: jest.fn(),
};
