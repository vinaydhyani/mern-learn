import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">Beautiful MERN Dashboard</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">Manage users with a clean UI powered by Tailwind CSS and a shadcn-style component set.</p>
            <div className="flex gap-3">
              <Link to="/dashboard"><Button>Open Dashboard</Button></Link>
              <a href="#features" className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100">Learn more</a>
            </div>
          </div>
          <div className="flex-1">
            <Card>
              <h3 className="text-lg font-medium mb-2">Quick stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-indigo-50 rounded-md">Users<br/><strong className="text-2xl">—</strong></div>
                <div className="p-4 bg-green-50 rounded-md">Active<br/><strong className="text-2xl">—</strong></div>
              </div>
            </Card>
          </div>
        </div>

        <section id="features" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h4 className="font-semibold mb-2">Create & Edit</h4>
            <p className="text-sm text-gray-500">Add or modify users quickly with inline forms.</p>
          </Card>
          <Card>
            <h4 className="font-semibold mb-2">Delete safely</h4>
            <p className="text-sm text-gray-500">Confirm before deletion to avoid mistakes.</p>
          </Card>
          <Card>
            <h4 className="font-semibold mb-2">Responsive</h4>
            <p className="text-sm text-gray-500">Works great on desktop and mobile screens.</p>
          </Card>
        </section>
      </div>
    </main>
  )
}
