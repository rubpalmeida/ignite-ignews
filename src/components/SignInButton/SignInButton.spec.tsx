import { fireEvent, render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { signIn, signOut, useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')

describe('SignInButton Component', () => {
  it('renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<SignInButton />)

    expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
  })

  it('renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' },
      false] as any)

    render(<SignInButton />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('singed out the user', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([
      { user: { name: 'John Doe', email: 'john.doe@example.com' }, expires: 'fake-expires' },
      false] as any)

    const signOutMocked = mocked(signOut)

    render(<SignInButton />)

    const signOutButton = screen.getByRole('button', { name: /john doe/i })

    fireEvent.click(signOutButton)

    expect(signOutMocked).toHaveBeenCalled()
  })

  it('singed in the user', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    const signInMocked = mocked(signIn)

    render(<SignInButton />)

    const signInButton = screen.getByRole('button', { name: /Sign in with Github/i })

    fireEvent.click(signInButton)

    expect(signInMocked).toHaveBeenCalled()
  })

})


