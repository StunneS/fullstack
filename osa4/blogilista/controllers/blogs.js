const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User =require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      .populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })

  
  blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById( decodedToken.id )

    if (!blog.url || !blog.title) {
      return response.status(400).json({ error: 'content missing' })
    }
  
    if (!blog.likes) {
      blog.likes = 0
    }
    blog.user = user

    blog.comments = [] //CHANGED

    const ret = await blog.save()
    user.blogs = user.blogs.concat(ret._id)
    await user.save()

    response.status(201).json(ret.toJSON())
  })

  blogsRouter.delete('/:id', async (request, response) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById( decodedToken.id )
    const blog = await Blog.findById(request.params.id)
    
    if(blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      return response.status(204).end()
    }
    return response.status(401).json({ error: 'incorrect user' })   
  })
blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
    .populate('user', {username: 1, name: 1})
  response.json(blog.toJSON())
})
blogsRouter.post('/:id/comments', async (request, response) => {
  console.log(request)
  console.log(request.body)
    const comment = request.body
    const blog = await Blog.findById(request.params.id)
    blog.comments = [...blog.comments, comment]

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true } )
    response.json(updatedBlog.toJSON())
  })
module.exports = blogsRouter