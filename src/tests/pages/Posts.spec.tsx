import { render, screen } from '@testing-library/react'

import { mocked } from 'ts-jest/utils';

import { getPrismicClient } from '../../services/prismic';
import Posts, { getStaticProps } from '../../pages/posts'

const posts = [
  {
    slug: 'fake-slug',
    title: 'fake-title',
    excerpt: 'fake-excerpt',
    updatedAt: 'fake-updatedAt',
  }
]

jest.mock('../../services/prismic')

describe('Posts page', () => {
  it('renders correctly', () => {
    render(<Posts posts={posts} />)

    expect(screen.getByText('fake-title')).toBeInTheDocument()
  });

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockResolvedValueOnce({
        results: [
          {
            uid: 'fake-uid',
            data: {
              title: [{ type: 'heading', text: 'fake-data-title' }],
              content: [{ type: 'paragraph', text: 'fake-data-content' }],
            },
            last_publication_date: '04-01-2021'
          }
        ]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [{
            slug: 'fake-uid',
            title: 'fake-data-title',
            excerpt: 'fake-data-content',
            updatedAt: '01 de abril de 2021',
          }]
        }
      })
    )

  });

})
