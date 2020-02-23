const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let headers
const blogs = [
    { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 },
    { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
    { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
    { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
    { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
    { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
   ] 
beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    let userObject = new User ({
        username: 'tester',
        name: 'tester',
        password: 'tester'
    })
    const thi = await userObject.save()

    for(let i = 0; i< 6; i++) {
        let blogObject = new Blog(blogs[i])
        const res = await blogObject.save()
    }
})

test('blogs are json and correct ammount', async () => {
    const response = await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    expect(response.body.length).toBe(blogs.length)
})

test('blogs id is correctly returned', async () => {
    const response = await api
        .get('/api/blogs/')
        .expect(200)
    expect(response.body[0].id).toBeDefined()
})
test('adding a blog works', async () => {

    const userObject = {
        username: 'testerblog',
        name: 'testerblog',
        password: 'testerblog'
    }
    await api
        .post('/api/users')
        .send(userObject)
    const log = await api
        .post('/api/login/')
        .send(userObject)
        .expect(200)

    headers = {
        'Authorization': `bearer ${log.body.token}`
    }

    const newBlog = {
        title: 'Test',
        author: 'Me',
        url: 'none',
        likes: 10
    }
    const bo = await api
        .post('/api/blogs/')
        .send(newBlog)
        .set(headers )
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/')
    const titles = response.body.map(blog => blog.title)

    expect(response.body.length).toBe(blogs.length +1)
    expect(titles).toContain('Test')
})

test('adding a blog with no likes works', async () => {
    const userObject = {
        username: 'testerblog',
        name: 'testerblog',
        password: 'testerblog'
    }
    await api
        .post('/api/users')
        .send(userObject)
    const log = await api
        .post('/api/login/')
        .send(userObject)
        .expect(200)

    headers = {
        'Authorization': `bearer ${log.body.token}`
    }
    const newBlog = {
        title: 'No',
        author: 'Likes',
        url: 'Adds 0'
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs/')

    expect(response.body.length).toBe(blogs.length +1)
    expect(response.body[blogs.length].likes).toBe(0)
})
test('adding a blog with no info throws a correct error', async () => {
    const userObject = {
        username: 'testerblog',
        name: 'testerblog',
        password: 'testerblog'
    }
    await api
        .post('/api/users')
        .send(userObject)
    const log = await api
        .post('/api/login/')
        .send(userObject)
        .expect(200)

    headers = {
        'Authorization': `bearer ${log.body.token}`
    }
    const newBlog = {
        author: 'No info',
        likes: 99
    }
    await api
        .post('/api/blogs/')
        .send(newBlog)
        .set(headers)
        .expect(400)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogs.length)
})
test('deleting one by id works', async () => {
    const userObject = {
        username: 'testerblog',
        name: 'testerblog',
        password: 'testerblog'
    }
    await api
        .post('/api/users')
        .send(userObject)
    const log = await api
        .post('/api/login/')
        .send(userObject)
        .expect(200)

    headers = {
        'Authorization': `bearer ${log.body.token}`
    }
    const newBlog = {
        title: 'No',
        author: 'Likes',
        url: 'Adds 0'
    }
    const newInfo = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    await api
        .delete(`/api/blogs/${newInfo.body.id}`)
        .set(headers)
        .expect(204)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body.length).toBe(blogs.length)
    expect(titles).not.toContain('No')

})
test('updating one blog', async () => {
    const userObject = {
        username: 'testerblog',
        name: 'testerblog',
        password: 'testerblog'
    }
    await api
        .post('/api/users')
        .send(userObject)
    const log = await api
        .post('/api/login/')
        .send(userObject)
        .expect(200)

    headers = {
        'Authorization': `bearer ${log.body.token}`
    }

    const newBlog = {
        title: "Patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 18
    }
    const info = await api
        .post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    console.log('First post ok')
    const editedBlog = {
        title: "Patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 19
    }
    const updated = await api
        .put(`/api/blogs/${info.body.id}`)
        .send(editedBlog)
        .expect(200)
    expect(updated.body.likes).toBe(newBlog.likes+1)
    
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(blogs.length+1)
})
afterAll(() => {
    mongoose.connection.close()
})