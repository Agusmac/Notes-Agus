import { generateId } from "./Randomizer"

export const sampleList = [
  { id: generateId(), title: 'Notes', content: 'You can add notes right on top.', color: 'none', category: 'none' },
  { id: generateId(), title: 'Color', content: 'Add color to the notes, and filter by color in the side bar.', color: '#00B0FF', category: 'none' },
  { id: generateId(), title: 'Tags/Categories', content: 'You can also add and filter by tags, there is a couple by default.', color: '#A737FF', category: 'WORK' },
  { id: generateId(), title: 'Search', content: 'Use the search bar to locate any specific note.', color: '#FFDC60', category: 'none' },
  { id: generateId(), title: 'Trash', content: 'Now that you have read about what you can do, u can delete all of these notes and start adding yours.', color: '#FA7AA5', category: 'none' },
]

export const categories = ['HOME TASKS', 'WORK',]

export const colors = ['#FA7AA5', '#FFDC60', '#1AB6BD', '#00B0FF', '#A737FF', '#DFBBFE', '#767580']