import { render, screen } from '@testing-library/react';
import { cardDetailedProps } from '../../../__mocks__/card-mock.ts';
import CardDetailed from '../../../../components/card/card-detailed/index.tsx';

describe('CardDetailed', () => {
  it('should render component with uppercase title', () => {
    const { container } = render(<CardDetailed {...cardDetailedProps} />);
    const titleContainer = container.getElementsByClassName(
      'card-detailed-title'
    );
    const title = titleContainer[0].textContent;

    expect(title).toBe('MOCK TITLE');
  });

  it('should render component with description', () => {
    const { container } = render(<CardDetailed {...cardDetailedProps} />);
    const descriptionContainer = container.getElementsByClassName(
      'card-detailed-description'
    );
    const title = descriptionContainer[0].textContent;

    expect(title).toBe('Mock description');
  });

  it('should render component with the correct number of CardDetails component', () => {
    render(<CardDetailed {...cardDetailedProps} />);
    const cardDetailsArr = screen.getAllByRole('listDetails');

    expect(cardDetailsArr).toHaveLength(3);
  });
});
