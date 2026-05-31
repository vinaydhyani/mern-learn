const API_BASE = 'http://localhost:8000/api'

export async function getUsers() {
  const res = await fetch(`${API_BASE}/users`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function getUser(id) {
  const res = await fetch(`${API_BASE}/user/${id}`)
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}

export async function createUser(data) {
  const res = await fetch(`${API_BASE}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function updateUser(id, data) {
  const res = await fetch(`${API_BASE}/update/user/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function deleteUser(id) {
  const res = await fetch(`${API_BASE}/user/${id}`, { method: 'DELETE' })
  return res.json()
}

export default { getUsers, getUser, createUser, updateUser, deleteUser }
