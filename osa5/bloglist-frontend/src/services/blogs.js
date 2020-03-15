import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const setToken = newToken => {
  token = `bearer ${newToken}`
}
const create = async object => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}
const update = async (id, object) => {
  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}
const deleteOne = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}
const addComment = async (id, object) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, object)
  return response.data
}
const findOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, setToken, create, update, deleteOne, addComment, findOne}