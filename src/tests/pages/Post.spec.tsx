import { render, screen } from '@testing-library/react'

import { mocked } from 'ts-jest/utils';
import { getSession } from 'next-auth/client';

import { getPrismicClient } from '../../services/prismic';
import Post, { getServerSideProps } from '../../pages/posts/[slug]'

const post =
{
  slug: 'fake-slug',
  title: 'fake-title',
  content: '<p>fake-content</p>',
  updatedAt: 'fake-updatedAt',
}

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()
    expect(screen.getByText('fake-content')).toBeInTheDocument()
  });

  it('redirects user if no subscription is found', async () => {

    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: { slug: 'fake-slug' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: `/posts/preview/${post.slug}`,
        })
      })
    )
  });

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession)
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

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-activeSubscription'
    } as any)

    const response = await getServerSideProps({
      params: { slug: 'fake-slug' }
    } as any)

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
