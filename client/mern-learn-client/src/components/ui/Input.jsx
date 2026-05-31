function Input({ className = '', ...props }) {
  return (
    <input className={`border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:bg-gray-900 dark:border-gray-700 ${className}`} {...props} />
  )
}

export default Input
