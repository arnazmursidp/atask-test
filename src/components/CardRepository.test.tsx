import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CardRepository from './CardRepository' // adjust import as needed

const mockRepositories = [
  {
    name: 'repo1',
    stargazers_count: 5,
    description: 'repo1 description',
  },
  {
    name: 'repo2',
    stargazers_count: 10,
    description: 'repo2 description',
  },
]

describe('CardRepository', () => {
  it('renders loading spinner when isLoadingRepositories or isFetchingRepositories is true', () => {
    const { container } = render(
      <CardRepository
        isLoadingRepositories={true}
        isFetchingRepositories={false}
        repositories={undefined}
      />
    )
    expect(container.querySelector('.ant-spin')).toBeInTheDocument()

    render(
      <CardRepository
        isLoadingRepositories={false}
        isFetchingRepositories={true}
        repositories={undefined}
      />
    )
    expect(container.querySelector('.ant-spin')).toBeInTheDocument()
  })

  it('renders repository cards when repositories exist', () => {
    render(
      <CardRepository
        isLoadingRepositories={false}
        isFetchingRepositories={false}
        repositories={mockRepositories}
      />
    )
    expect(screen.getByText('repo1')).toBeInTheDocument()
    expect(screen.getByText('repo1 description')).toBeInTheDocument()
    expect(screen.getByText('repo2')).toBeInTheDocument()
    expect(screen.getByText('repo2 description')).toBeInTheDocument()
    expect(screen.getAllByRole('article').length).toBe(mockRepositories.length)
  })

  it('renders no repositories message when repositories is empty', () => {
    render(
      <CardRepository
        isLoadingRepositories={false}
        isFetchingRepositories={false}
        repositories={[]}
      />
    )
    expect(screen.getByText('No repositories found')).toBeInTheDocument()
  })
})