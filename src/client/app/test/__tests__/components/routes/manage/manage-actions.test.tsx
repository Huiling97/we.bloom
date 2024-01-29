import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../../../../store/auth-context';
import Login from '../../../../../routes/login';
import ManageActions from '../../../../../routes/manage/manage-actions';
import ManageCategories from '../../../../../routes/manage/manage-categories';
import { ACTIONS } from '../../../../../util/constants/manage-actions-types';
import { type ActionsProps } from '../../../../../types/routes/manage';

describe('ManageActions', () => {
  describe('when unauthenticated', () => {
    it('should redirect user to login page if unauthenticated', () => {
      render(
        <MemoryRouter initialEntries={['/manage']}>
          <AuthContext.Provider
            value={{ isAuthenticated: false, setIsAuthenticated: jest.fn() }}
          >
            <Routes>
              <Route path='/manage' element={<ManageActions />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </AuthContext.Provider>
        </MemoryRouter>
      );

      waitFor(() => {
        expect(window.location.pathname).toBe('/login');
      });
    });
  });

  describe('when authenticated', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/manage']}>
          <AuthContext.Provider
            value={{ isAuthenticated: true, setIsAuthenticated: jest.fn() }}
          >
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/manage' element={<ManageActions />} />
              <Route
                path='/manage/categories-and-services'
                element={<ManageCategories />}
              />
            </Routes>
          </AuthContext.Provider>
        </MemoryRouter>
      );
    });

    it('should redirect user to manage actions page', () => {
      waitFor(() => {
        expect(window.location.pathname).toBe('/manage');
      });
    });

    it('should display all available actions link on the manage page', () => {
      Object.keys(ACTIONS).forEach((key, index) => {
        const { name, image } = ACTIONS[key as ActionsProps];

        const actionTitle = screen.getByText(`Update ${name}`);
        const actionImage = screen.getAllByAltText('action image');
        const actionLink = screen.getAllByRole('link');

        expect(actionTitle).toBeInTheDocument();
        expect(actionImage[index]).toHaveAttribute('src', image);
        expect(actionLink[index]).toHaveAttribute('href', `/manage/${key}`);
      });
    });

    it('should navigate to the correct page upon clicking on the actions', () => {
      const actionLink = screen.getAllByRole('link')[0];
      fireEvent.click(actionLink);

      waitFor(() => {
        expect(window.location.pathname).toBe(
          '/manage/categories-and-services'
        );
      });
    });
  });
});
