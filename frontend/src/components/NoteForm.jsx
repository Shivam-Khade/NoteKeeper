import React, { useContext, useState } from 'react'
import { NoteContext } from '../context/NoteContext'
import toast, { Toaster } from 'react-hot-toast' // ✅ import toast

function NoteForm() {
  const { createNote } = useContext(NoteContext)
  const [note, setNote] = useState({
    title: "",
    content: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!note.title || !note.content) return

    // Wrap your createNote call inside toast.promise
    const createPromise = createNote(note)
    toast.promise(createPromise, {
      loading: 'Adding your note...',
      success: <b>Note added successfully! 🎉</b>,
      error: <b>Failed to add note 😞</b>,
    })

    await createPromise
    setNote({ title: "", content: "" })
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-gray-800 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">
        Create a New Note
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Enter title..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />

        <textarea
          placeholder="Write your note here..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
          rows="5"
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg shadow-md"
        >
          Add Note
        </button>
      </form>

      {/* Toast notification container */}
      <Toaster position="top-right" />
    </div>
  )
}

export default NoteForm