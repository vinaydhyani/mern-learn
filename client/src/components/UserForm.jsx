import { useEffect, useState } from 'react'

function UserForm({ initial = null, onSubmit, onCancel }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '' })

  useEffect(() => {
    if (initial) setForm({ name: initial.name || '', email: initial.email || '', password: '', address: initial.address || '' })
    else setForm({ name: '', email: '', password: '', address: '' })
  }, [initial])

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <input name="name" placeholder="Name" value={form.name} onChange={change} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} />
      <input name="address" placeholder="Address" value={form.address} onChange={change} />
      <div>
        <button type="submit">{initial ? 'Update' : 'Create'}</button>{' '}
        {initial && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  )
}

export default UserForm
