import React from 'react'
import SingleNote from './SingleNote'
import { RxCross2 } from 'react-icons/rx';
import { colors } from '@/helpers/Sample';

export default function Notes({ darkMode, setCurrentNotes, filteredNotes,
  currentNotes, catArray, selectedCategory, setSelectedCategory, selectedColor, setSelectedColor, }) {

  return (
    <div >
      <div className='flex space-x-5'>
        {selectedCategory !== 'all' && (
          <div className='px-3 mb-5 py-1 rounded-2xl flex justify-center
        items-center  border border-[#6e6b8e] w-fit cursor-pointer text-sm'
            onClick={() => setSelectedCategory('all')}>{selectedCategory} <div className='text-base ml-1'><RxCross2 /></div>
          </div>)}

        {selectedColor !== 'all' && (
          <div className={`px-3 mb-5 py-1 rounded-2xl flex justify-center bg-[${selectedColor}] text-base 
        items-center  border border-[#6e6b8e] w-14 cursor-pointer `}
            onClick={() => setSelectedColor('all')}><RxCross2 />
          </div>)}
      </div>


      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-40'>
        {filteredNotes?.map((note) => (
          <SingleNote key={note.id}  {...{ darkMode, note, setCurrentNotes, currentNotes, catArray }} />
        ))}
      </div>
    </div>
  )
}
