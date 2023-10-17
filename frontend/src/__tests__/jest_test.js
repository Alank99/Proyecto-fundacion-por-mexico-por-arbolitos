/**
 * @jest-environment jsdom
 */

import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import { ThemeToggler } from "../CustomLayout";
import { AdminContext } from 'react-admin';

afterEach(cleanup);

describe('Pruebas de tema', () =>{
  it('Tema es oscuro', async() => {
    render(
      <AdminContext>
        <ThemeToggler />,
      </AdminContext>
    );
    const items = await screen.getByText('Cambiar a tema oscuro', { selector: 'button' })
    expect(items).toBeTruthy();
  });
  it('Tema es claro', async() => {
    render(
      <AdminContext>
        <ThemeToggler />,
      </AdminContext>
    );
    fireEvent.click(screen.getByText('Cambiar a tema oscuro'))
    const items = await screen.getByText('Cambiar a tema claro', { selector: 'button' })
    expect(items).toBeTruthy();
  });
});