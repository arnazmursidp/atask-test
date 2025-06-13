import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CardRepository from './CardRepository'
import mockRepositories from '../../__test__/mocks/repository_response.json'

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
    expect(screen.getAllByText('aes_enc')[0]).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
    expect(screen.getAllByTestId('repositories').length).toBe(mockRepositories.length)
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