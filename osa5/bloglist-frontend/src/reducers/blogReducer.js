/* eslint-disable no-case-declarations */
const blogReducer = (state = [], action ) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'ALL':
    return action.data
  case 'LIKE':
    const id = action.data.id
    const blogToLike = state.find(n => n.id === id)
    const changedBlog = { ...blogToLike, likes: blogToLike.likes +1 }

    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  case 'DELETE':
    return state.filter(n => n.id !== action.data.id)
  default:
    return state
  }
}
export const addNewBlog = (blog) => {
  return {
    type: 'NEW_BLOG',
    data:  blog
  }
}
export const likeABlog = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}
export const deleteABlog = (id) => {
  return {
    type: 'DELETE',
    data: { id }
  }
}
export const addAll = (blogs) => {
  return {
    type: 'ALL',
    data: blogs
  }
}

export default blogReducer