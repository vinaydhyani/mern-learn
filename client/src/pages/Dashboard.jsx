import { useEffect, useState } from 'react'
import { getUsers, createUser, updateUser, deleteUser } from '../api'
import UserForm from '../components/UserForm'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'

function Dashboard() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getUsers()
      setUsers(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleCreate = async (payload) => {
    await createUser(payload)
    await load()
  }

  const handleUpdate = async (id, payload) => {
    await updateUser(id, payload)
    setEditing(null)
    await load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    await deleteUser(id)
    await load()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Users Dashboard</h1>
        <div>
          <Button onClick={() => { setEditing(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>New User</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-lg font-medium mb-2">{editing ? 'Edit user' : 'Create user'}</h2>
            <UserForm
              initial={editing}
              onSubmit={editing ? (data) => handleUpdate(editing._id, data) : handleCreate}
              onCancel={() => setEditing(null)}
            />
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-lg font-medium mb-4">User list</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="text-left text-sm text-gray-500">
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Address</th>
                      <th className="px-3 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-t">
                        <td className="px-3 py-2">{u.name}</td>
                        <td className="px-3 py-2">{u.email}</td>
                        <td className="px-3 py-2">{u.address}</td>
                        <td className="px-3 py-2">
                          <Button variant="ghost" className="mr-2" onClick={() => setEditing(u)}>Edit</Button>
                          <Button variant="danger" onClick={() => handleDelete(u._id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
