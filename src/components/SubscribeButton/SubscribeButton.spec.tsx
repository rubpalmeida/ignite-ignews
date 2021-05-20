import { render, screen, fireEvent } from '@testing-library/react'

import { mocked } from 'ts-jest/utils'
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { SubscribeButton } from '.'

jest.mock('next-auth/client', () => {
  return {
    useSession() {
      return [null, false]
    }
  }
})

jest.mock('next/router');

describe('SubscribeButton Component', () => {
  it('renders correctly', () => {

    render(<SubscribeButton />)

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when user is not authenticated', () => {

    const signInMocked = mocked(signIn)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled()

  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMocked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {
        user: {
          name: 'John Doe',
          email: 'john.doe@example.com'
        },
        activeSubscription: 'active',
        expires: 'fake-expires'
      },
      false])

    useRouterMocked.mockReturnValueOnce({
      push: jest.fn()
    } as any)

    const pushMock = jest.fn()

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalled()
  })
})


