import { createRoot } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { cleanup } from '@testing-library/react';
import Map from '../../components/map';

jest.mock('mapbox-gl', () => ({
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    remove: jest.fn(),
  })),
  Marker: jest.fn(() => ({
    setLngLat: jest.fn(() => ({
      addTo: jest.fn(),
    })),
    remove: jest.fn(),
  })),
  NavigationControl: jest.fn(),
}));

describe('Map', () => {
  let container: Element | null = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      container.remove();
      container = null;
    }
    cleanup();
  });

  it('it should render without crashing', () => {
    act(() => {
      const root = createRoot(container!);
      root.render(<Map />);
    });
    expect(container?.querySelector('.map-container')).toBeInTheDocument();
  });
});
