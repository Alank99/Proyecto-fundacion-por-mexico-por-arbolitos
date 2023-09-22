/**
 * @jest-environment jsdom
 */

import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { ThemeToggler } from "../CustomLayout";

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
      return res(ctx.json({greeting: 'hello there'}))
    }),
  )
  
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  
  test('loads and displays theme', async () => {
    render(<ThemeToggler />)
  
    fireEvent.click(screen.getByText('Cambiar a tema oscuro'))
  
    await screen.findByRole('button')
  
    expect(screen.getByRole('button')).toHaveTextContent('Cambiar a tema claro')
  })