import { render, screen } from '@testing-library/react'

import { mocked } from 'ts-jest/utils';
import { useSession } from 'next-auth/client';

import { getPrismicClient } from '../../services/prismic';
import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useRouter } from 'next/router';

const post =
{
  slug: 'fake-slug',
  title: 'fake-title',
  content: '<p>fake-content</p>',
  updatedAt: 'fake-updatedAt',
}

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

describe('Post Preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)
    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()
    expect(screen.getByText('fake-content')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  });

  it('redirects user to full post when is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)
    const pushMocked = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-activeSubscription' },
      false
    ] as any)

    useRouterMocked.mockReturnValueOnce({
      push: pushMocked
    } as any)

    render(<Post post={post} />);

    expect(pushMocked).toHaveBeenCalledWith('/posts/fake-slug')
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'fake-data-title' }],
          content: [{ type: 'paragraph', text: 'fake-data-content' }],
        },
        last_publication_date: '04-01-2021'
      })
    } as any)

    const response = await getStaticProps({ params: { slug: 'fake-slug' } })

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'fake-slug',
            title: 'fake-data-title',
            content: '<p>fake-data-content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  })
})
