import { render, screen } from '@testing-library/react';
import { cardDetailedProps } from '../../../__mocks__/card-mock.ts';
import CardService from '../../../../components/card/card-services/index.tsx';

describe('CardService', () => {
  it('should render component with uppercase title', () => {
    const { container } = render(<CardService {...cardDetailedProps} />);
    const titleContainer =
      container.getElementsByClassName('card-service-title');
    const title = titleContainer[0].textContent;

    expect(title).toBe('MOCK TITLE');
  });

  it('should render component with description', () => {
    const { container } = render(<CardService {...cardDetailedProps} />);
    const descriptionContainer = container.getElementsByClassName(
      'card-service-description'
    );
    const title = descriptionContainer[0].textContent;

    expect(title).toBe('Mock description');
  });

  it('should render component with the correct number of CardDetails component', () => {
    render(<CardService {...cardDetailedProps} />);
    const cardDetailsArr = screen.getAllByRole('listDetails');

    expect(cardDetailsArr).toHaveLength(3);
  });
});
