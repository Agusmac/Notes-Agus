import React, { useEffect, useRef, useState } from 'react'

import { BiPalette, BiTrash, BiLabel, } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import { FaCheckCircle } from 'react-icons/fa';
import { RiPencilFill } from 'react-icons/ri';
import { colors } from '@/helpers/Sample';

// this is double the length of what i like, will refactorize next time

export default function SingleNote({ note, darkMode, setCurrentNotes, catArray }) {


    const [editMode, setEditMode] = useState(false)
    const [mouseOver, setMouseOver] = useState(false)
    const [colorActive, setColorActive] = useState(false)
    const [catActive, setCatActive] = useState(false)

    // show icons on desktop if mouse on
    const onMouseOver = () => setMouseOver(true)
    const onMouseLeave = () => setMouseOver(false)

    // toggle the color switcher
    const colorOFF = () => setColorActive(false)
    const colorToggle = () => {
        setColorActive(prev => !prev)
        setCatActive(false)
    }
    // toggle the tag/category switcher
    const catToggle = () => {
        setCatActive(prev => !prev)
        setColorActive(false)
    }

    const TitleEdit = useRef()
    const TextEdit = useRef()

    // makes the input have the same text of the note, and focus on the content one
    useEffect(() => {
        TitleEdit.current.value = note.title || ''
        TextEdit.current.value = note.content || ''
        TextEdit.current.focus()
    }, [editMode])


    // ////////////////////////////////////

    // next time I get into this project i will turn all of this into one function

    // update text-title
    const updateText = () => {
        const title = TitleEdit.current.value
        const content = TextEdit.current.value
        setCurrentNotes(prev => {
            return prev.map((noted) => {
                if (noted.id === note.id) return { ...noted, title, content };
                else return noted;
            });
        });
        setEditMode(false)
    }
    // update note color
    const colorChanger = (color) => {
        setCurrentNotes(prev => {
            return prev.map((noted) => {
                if (noted.id === note.id) return { ...noted, color };
                else return noted;
            });
        });
        colorOFF()
    }

    const changeCategory = (category) => {
        setCurrentNotes(prev => {
            return prev.map((noted) => {
                if (noted.id === note.id) return { ...noted, category };
                else return noted;
            });
        });
    }

    // /////////////////////////////////////// 


    // delete note
    const deleter = () => {
        setCurrentNotes(prev => {
            const index = prev.findIndex(item => item.id === note.id)
            const newNotes = [...prev]
            newNotes.splice(index, 1);
            return newNotes
        });
    }


    return (
        <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={`px-4 py-3  ${note.color == 'none' && 'border'} relative duration-300 ${darkMode ? 'border-[#5f6368]' : 'border-[#e0e0e0]'}  grid rounded-lg bg-[${note.color}] `}>
            <div className='min-h-[60px] mb-3 '>
                <input ref={TitleEdit} className={`text-xl font-bold mb-1 break-words focus:outline-none bg-transparent ${!editMode && 'hidden'}`} type="title" />
                <input ref={TextEdit} className={`break-words mb-6 focus:outline-none bg-transparent w-full ${!editMode && 'hidden'}`} type="title" />
                {!editMode && <h2 className='text-xl font-bold mb-1 break-words'>{note?.title}</h2>}
                {!editMode && <p>{note.content}</p>}
                <br />
                {note.category != 'none' && <div className='px-2 py-1 uppercase rounded-xl flex justify-center items-center bg-black back border border-[#6e6b8e] w-fit text-xs'><p className='opacity-100'>{note.category}</p></div>}
            </div>

            {/* my eyes hurt from this one, sorry but the free time finished */}
            <div className={`flex justify-end items-end space-x-4 text-2xl justify-self-end duration-300 w-full ${mouseOver ? 'opacity-100' : 'md:opacity-0'}`}>
                {!editMode && <div onClick={catToggle} className='hover:cursor-pointer'><BiLabel /></div>}
                {!editMode && <div onClick={colorToggle} className='hover:cursor-pointer'><BiPalette /> </div>}
                {!editMode && <div onClick={deleter} className='hover:cursor-pointer'><BiTrash /></div>}
                {!editMode && <div onClick={() => setEditMode(true)} className='hover:cursor-pointer'><RiPencilFill /></div>}
                {editMode && <div onClick={() => setEditMode(false)} className='hover:cursor-pointer '><RxCross2 /></div>}
                {editMode && <div onClick={() => setEditMode(updateText)} className='hover:cursor-pointer '><FaCheckCircle /></div>}
            </div>

            {/* color change */}
            <div className={`absolute p-2 rounded right-0 bottom-0 w-1/2 translate-y-full z-10  ${darkMode ? 'bg-[#202124] shadowHanger' : 'bg-[#ffffff] shadowHangerDay'} ${!colorActive && 'hidden'}`}>
                <div className='justify-items-center gap-2 md:gap-1 grid grid-cols-4 items-center '>

                    <div onClick={() => colorChanger('none')} className='w-6 h-6 border bg-transparent rounded-full text-xs grid place-content-center hover:cursor-pointer'><RxCross2 /></div>
                    {colors.map((item, i) => <div key={i} onClick={() => colorChanger(item)} className={`w-6 h-6 border bg-[${item}] hover:cursor-pointer rounded-full`}></div>)}

                </div>

            </div>
            {/* category/tag change */}
            <div className={`absolute rounded right-0 bottom-0 translate-y-full z-10 ${darkMode ? 'bg-[#202124] shadowHanger' : 'bg-[#ffffff] shadowHangerDay'} ${!catActive && 'hidden'}`}>
                <div className='justify-items-center flex flex-col '>
                    <div onClick={() => changeCategory('none')} className='hover:cursor-pointer w-full py-2 hover:bg-[#101012] duration-300 px-3'>No category...</div>
                    {catArray.map((item, i) => <div key={i} onClick={() => changeCategory(item)} className={`w-full uppercase hover:cursor-pointer hover:bg-[#101012] duration-300 py-2 px-3`}>{item}</div>)}
                </div>
            </div>


        </div>
    )
}
