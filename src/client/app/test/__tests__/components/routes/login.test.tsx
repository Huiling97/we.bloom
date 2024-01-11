import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../../../routes/login';

let container: HTMLElement;

describe('Login', () => {
  beforeEach(() => {
    const { container: renderedContainer } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    container = renderedContainer;
  });

  it('displays phone number input form', () => {
    const loginForm = screen.getByText('Phone Number');

    expect(loginForm).toBeInTheDocument();
  });

  it('displays code input form on submitting phone number input form', async () => {
    const loginFormInput = container.getElementsByClassName(
      'react-international-phone-input'
    )[0];
    const submitBtn = screen.getByRole('button', { name: 'Send code' });

    fireEvent.change(loginFormInput, { target: { value: '+65 8111-1111' } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      const codeForm = screen.getByText('Code');
      expect(codeForm).toBeInTheDocument();
    });
  });
});
