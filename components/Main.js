import { categories } from '@/helpers/Sample'
import React, { useEffect, useState } from 'react'
import Input from './Input'
import Notes from './Notes'
import Sidebar from './Sidebar'


export default function ({ darkMode, setDarkMode, setActive, active, currentNotes,
    setCurrentNotes, selectedColor, setSelectedColor, selectedCategory, setSelectedCategory, search }) {

    // filtered Notes
    const [filteredNotes, setFilteredNotes] = useState()
    // category list
    const [catArray, setCatArray] = useState([])

    useEffect(() => {
        const storedTags = JSON.parse(localStorage.getItem('tags'));
        if (storedTags && storedTags.length) {
            setCatArray(storedTags);
        } else {
            setCatArray(categories);
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('tags', JSON.stringify(catArray));
      }, [catArray]);


    // changes filtered notes, when full list/category-color filters change
    useEffect(() => {
        const tempsearch = search.toLowerCase()
        const filtered = currentNotes?.filter(note => {
            return (selectedCategory === 'all' || note.category === selectedCategory)
                && (selectedColor === 'all' || note.color === selectedColor);
        })
        if (tempsearch != '') {
            setFilteredNotes( filtered.filter(note => {
                return (note.title.toLowerCase().includes(tempsearch) || note.content.toLowerCase().includes(tempsearch))
            }))
        }else{
            setFilteredNotes(filtered)
        }

    }, [currentNotes, selectedCategory, selectedColor, search]);

    // delete the category property from the notes when the tag is deleted
    const deleteTagNote = (tag) => {
        if (selectedCategory === tag) { setSelectedCategory('all') }
        setCurrentNotes(prev => {
            return prev.map((note) => {
                if (note.category === tag) return { ...note, category: 'none' };
                else return note;
            });
        });
    }




    return (
        <div className='flex relative'>

            <Sidebar {...{
                darkMode, setDarkMode, setActive, active, deleteTagNote,
                setCurrentNotes, setSelectedColor, setSelectedCategory, setCatArray, catArray
            }} />

            <div className={`ml-4 md:ml-24 w-full mr-4`}>
                <Input {...{ darkMode, setCurrentNotes, catArray }} />
                <Notes  {...{
                    darkMode, currentNotes, setCurrentNotes, catArray,
                    filteredNotes, selectedCategory, setSelectedCategory, selectedColor, setSelectedColor,
                }} />
            </div>

        </div>
    )
}
