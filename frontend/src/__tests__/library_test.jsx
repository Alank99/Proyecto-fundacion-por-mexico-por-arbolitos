/**
 * @jest-environment jsdom
 */

import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeToggler } from "../CustomLayout";


test('loads and displays theme', async () => {
  render(<ThemeToggler />)

  fireEvent.click(screen.getByText('Cambiar a tema oscuro'))

  await screen.findByRole('button')

  expect(screen.getByRole('button')).toHaveTextContent('Cambiar a tema claro')
})