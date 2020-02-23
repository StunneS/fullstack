import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
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

export default { getAll, setToken, create, update, deleteOne }