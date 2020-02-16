const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: 'root', name: 'test', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'tester',
      name: 'testeri',
      password: 'sala',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})
describe('adding users with bad info', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const user = new User({ username: 'root', name: 'test', password: 'sekret' })
        await user.save()
      })
    test('user with same username is not created', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
            username: 'root',
            name: 'testeri',
            password: 'sala',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd.length).toBe(usersAtStart.length)
        })
    test('user with short password is not created', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
        username: 'rooter',
        name: 'testeri',
        password: 'sa',
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password too short')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
    test('user with short username is not created', async () => {
        const usersAtStart = await User.find({})

        const newUser = {
        username: 'ro',
        password: 'nuut',
        name: 'testeri'
        }

        const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('shorter than the minimum')

        const usersAtEnd = await User.find({})
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})
afterAll(() => {
    mongoose.connection.close()
})
