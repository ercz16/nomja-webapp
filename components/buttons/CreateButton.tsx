const CreateButton = (props) => {
  const { action, children } = props

  return (
    <>
      <button
        onClick={action}
        className="flex flex-row items-center gap-2 px-3 py-2 bg-red-500 rounded shadow hover:bg-red-600"
      >
        <span className="text-lg font-semibold text-white">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  )
}

export default CreateButton
