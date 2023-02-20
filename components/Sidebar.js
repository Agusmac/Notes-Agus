import React, { useEffect, useRef, useState } from 'react'
import { BiPalette, BiLabel, BiTrash } from 'react-icons/bi';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { RxCross2 } from 'react-icons/rx';
import { IoMdPricetag } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { colors } from '@/helpers/Sample';
import { truncateString } from '@/helpers/Truncate';


export default function Sidebar({ setActive, active, setDarkMode, darkMode, deleteTagNote,
    setSelectedColor, setSelectedCategory, catArray, setCatArray }) {

    const newTag = useRef()

    // make sidebar appear completely if mouse is over
    const onMouseOver = () => setActive(true)
    const onMouseLeave = () => setActive(false)

    // dark mode toggle
    const darkToggle = () => setDarkMode(prev => !prev)

    // set tag filter
    const setTag = (tag) => setSelectedCategory(tag)


    // add new tag/category
    const addTag = () => {
        // this variable solves an issue when it would add empty notes
        const temp = newTag.current.value
        if (temp !== '') {
            setCatArray(prev => [...prev, temp])
            newTag.current.value = ''
            newTag.current.blur()
        } else newTag.current.focus()
    }

    // delete tag/category
    const deleteTag = (tag, e) => {
        if (e) e.stopPropagation();
        setCatArray(prev => prev.filter(item => item !== tag))
        deleteTagNote(tag)
    }

    return (
        <div onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} className={`fixed  ${darkMode ? 'bg-[#202124]' : 'bg-white text-[#5f6368]'} z-50 side-height
         duration-300 overflow-hidden w-72  ${catArray.length > 7 && 'overflow-y-scroll'}
         ${active ? 'md:w-72  r-shadow' : 'md:w-20 -translate-x-full'}
           md:translate-x-0`}>
            <div className={` text-3xl mt-4 ${catArray.length > 7 ? 'space-y-5' : 'space-y-10'}`}>

                {/*add category/tag  */}
                <div className='flex space-x-4'>
                    <div className='w-20 flex shrink-0 justify-center items-center'><BiLabel /></div>
                    <div className='flex w-full justify-between text-xl items-center pr-4 duration-100'>
                        {/* <div className='flex items-center leading-none break-keep min-w-[81px]'>Add Tags</div> */}
                        <input ref={newTag} type="text" placeholder="New Tag..." className="w-full relative -top-[2px] duration-100 focus:outline-none bg-transparent" />
                        <div onClick={addTag}><AiOutlinePlus /></div>
                        {/* <div><IoMdArrowDropdown /></div> */}
                    </div>
                </div>

                {/*filter by category/tag  */}
                {catArray?.map((category,i) => (
                    <div key={i} className='flex hover:cursor-pointer space-x-4' onClick={() => setTag(category)} >
                        <div className='w-20 flex shrink-0 justify-center items-center'><IoMdPricetag /></div>
                        <div className='flex w-full justify-between items-center text-base pr-4'>
                            <div className='justify-center items-center uppercase whitespace-nowrap'>{truncateString(category, 15)}</div>
                            <div onClick={(e) => deleteTag(category, e)} className='text-lg'><BiTrash /></div>
                        </div>
                    </div>
                ))}

                {/* color filter */}
                <div className='flex space-x-4'>
                    <div className='w-20 flex shrink-0 justify-center items-center'> <BiPalette /></div>
                    <div className=' justify-start gap-3 gap-x-4  grid grid-cols-4 items-center'>
                        <div onClick={() => { setSelectedColor('all') }} className='w-7 h-7 border bg-transparent rounded-full text-xs grid place-content-center hover:cursor-pointer'><RxCross2 /></div>
                        {colors.map((item, i) => <div key={i} onClick={() => { setSelectedColor(item) }} className={`w-7 h-7 border bg-[${item}] hover:cursor-pointer rounded-full`}></div>)}
                    </div>
                </div>

                {/* night mode toggle */}
                <div className=' flex hover:cursor-pointer pb-10 space-x-4' onClick={darkToggle} >
                    <div className='w-20 flex shrink-0 justify-center items-center'>{darkMode ? <BsFillMoonFill /> : <BsFillSunFill />}</div>
                    <div className=' justify-center text-xl items-center'>{darkMode ? 'Night' : 'Day'}</div>
                </div>

            </div>
        </div>
    )
}
