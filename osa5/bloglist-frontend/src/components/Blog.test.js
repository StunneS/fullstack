import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not likes or url',() => {
  const blog = {
    author: 'Test',
    likes: 666,
    title: 'Testing is fun',
    url: 'dis.com'
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testing is fun, Test'
  )
  expect(component.container).not.toHaveTextContent(
    '666'
  )
  expect(component.container).not.toHaveTextContent(
    'dis.com'
  )
})
test('clicking the button shows likes and url', async () => {
  const blog = {
    user: { name: 'The Tester' },
    author: 'Test',
    likes: 666,
    title: 'Testing is fun',
    url: 'dis.com'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} toggle={mockHandler} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'Testing is fun, Test'
  )
  expect(component.container).toHaveTextContent(
    '666'
  )
  expect(component.container).toHaveTextContent(
    'dis.com'
  )
})
test('clicking the like button twice', async () => {
  const blog = {
    user: { name: 'The Tester' },
    author: 'Test',
    likes: 666,
    title: 'Testing is fun',
    url: 'dis.com'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLike={mockHandler} />
  )
  const button = component.getByText('view')
  fireEvent.click(button)

  const likebutton = component.getByText('like')
  fireEvent.click(likebutton)
  fireEvent.click(likebutton)

  expect(mockHandler.mock.calls.length).toBe(2)
})