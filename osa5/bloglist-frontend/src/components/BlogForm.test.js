import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls OnSubmit',() => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm addBlog={createBlog} />
  )
  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'Tester' }
  })
  fireEvent.change(title, {
    target: { value: 'TesterTitle' }
  })
  fireEvent.change(url, {
    target: { value: 'TesterUrl' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].author).toBe('Tester')
  expect(createBlog.mock.calls[0][0].title).toBe('TesterTitle')
  expect(createBlog.mock.calls[0][0].url).toBe('TesterUrl')
})