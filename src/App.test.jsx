import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import App from './App.jsx'

test('ajout, changement d’état, filtres, sauvegarde et suppression', async () => {
  const user = userEvent.setup()
  const { unmount } = render(<App />)
  expect(screen.getByRole('button', { name: 'Ajouter' })).toBeDisabled()
  await user.type(screen.getByLabelText('Qu’avez-vous prévu ?'), '  Préparer le voyage  ')
  await user.click(screen.getByRole('button', { name: 'Ajouter' }))
  expect(screen.getByRole('checkbox', { name: 'Préparer le voyage' })).not.toBeChecked()
  expect(screen.getByLabelText('Qu’avez-vous prévu ?')).toHaveValue('')
  await user.click(screen.getByRole('checkbox'))
  expect(screen.getByRole('checkbox')).toBeChecked()
  await user.click(screen.getByRole('button', { name: 'À faire', exact: true }))
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Terminées', exact: true }))
  expect(screen.getByRole('checkbox')).toBeChecked()
  unmount()
  render(<App />)
  expect(screen.getByRole('checkbox')).toBeChecked()
  await user.click(screen.getByRole('checkbox'))
  expect(screen.getByRole('checkbox')).not.toBeChecked()
  await user.click(screen.getByRole('button', { name: 'Supprimer : Préparer le voyage' }))
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  expect(JSON.parse(localStorage.getItem('mes-taches-v1'))).toEqual([])
})

test('ignore les espaces et résiste à une sauvegarde corrompue', async () => {
  localStorage.setItem('mes-taches-v1', '{invalide')
  const user = userEvent.setup()
  render(<App />)
  await user.type(screen.getByLabelText('Qu’avez-vous prévu ?'), '   {Enter}')
  expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Ajouter' })).toBeDisabled()
})
