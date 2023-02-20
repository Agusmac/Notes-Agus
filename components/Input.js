import React, { useRef, useState } from 'react'

import { BiPalette, BiTrash, BiLabel } from 'react-icons/bi';
import { MdOutlineCheck } from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';

import { generateId } from '@/helpers/Randomizer';
import { colors } from '@/helpers/Sample';


export default function Input({ darkMode, setCurrentNotes, catArray }) {


  const [inputActive, setinputActive] = useState(false)
  // color state
  const [color, setColor] = useState('none')
  const [colorActive, setColorActive] = useState(false)
  // category state
  const [category, setCategory] = useState('none')
  const [catActive, setCatActive] = useState(false)


  const Title = useRef()
  const Text = useRef()

  // input
  const actInput = (e) =>{ 
    if (e) e.stopPropagation();
    setinputActive(true)
    // Text.current.focus();
  }
  const offInput = () => setinputActive(false)



  // color
  const colorToggle = () => {
    setColorActive(prev => !prev)
    catOFF()
  }
  const colorOFF = () => setColorActive(false)
  const changeColor = (color) => {
    setColor(color)
    colorOFF()
  }
  // category
  const catToggle = () => {
    setCatActive(prev => !prev)
    colorOFF()
  }
  const catOFF = () => setCatActive(false)
  const changeCategory = (category) => {
    setCategory(category)
    catOFF()
  }


  // add
  const addNote = (e) => {
    if (e) e.stopPropagation();
    const newNote = {
      id: generateId(),
      title: Title?.current?.value,
      content: Text?.current?.value,
      color: color,
      category: category
    }
    // console.log(newNote)
    setCurrentNotes(prev => [newNote, ...prev])
    colorOFF()
    eraser()
    catOFF()
  }


  // erase current note
  const eraser = (e) => {
    if (e) e.stopPropagation();
    Title.current.value = ''
    Text.current.value = ''
    setColor('none')
    setCategory('none')
    colorOFF()
    catOFF()
    offInput()
  }



  return (
    <div onClick={actInput} className={`h-36 flex items-center justify-center relative flex-1 mb-10 ${inputActive && 'mt-10'}  `}>
      <div className={`w-full md:w-1/2 mx-5 max-w-xl rounded-lg border relative 
       px-4 py-3 ${color !== 'none' && `bg-[${color}]`} ${darkMode ? 'border-[#5f6368] shadowHanger' : 'border-[#e0e0e0] shadowHangerDay'} `}>

        {inputActive &&
          <div className='w-full flex items-center placeholder-[#bfbfc0] font-semibold mb-3  text-lg '>
            <input ref={Title} type="text" placeholder="Title" className="w-full focus:outline-none bg-transparent" />
          </div>
        }

        <div className={`w-full flex items-center placeholder-[#bfbfc0]  ${inputActive && 'mb-8'}`}>
          <input ref={Text} type="text" placeholder="Take a note..." className="w-full break-words focus:outline-none bg-transparent" />
        </div>

        {/* <textarea ref={Text} placeholder="Take a note..." className="w-full break-words focus:outline-none bg-transparent"></textarea> */}


        {category != 'none' && <div className='px-2 py-1 mb-5 rounded-xl flex justify-center items-center bg-black back border border-[#6e6b8e] w-fit text-xs'><p className='opacity-100'>{category}</p></div>}

        {inputActive &&
          <div className={`flex justify-between items-end text-2xl justify-self-end duration-300 w-full`}>
            <div className='flex space-x-4 items-end'>
              <div onClick={catToggle} className='hover:cursor-pointer'><BiLabel /></div>
              <div onClick={colorToggle} className='hover:cursor-pointer'><BiPalette /></div>
              <div onClick={eraser} className='hover:cursor-pointer'><BiTrash /></div>
            </div>
            <div onClick={addNote} className='hover:cursor-pointer mr-5 flex space-x-4 items-center'><p className='text-lg'></p> <AiOutlinePlus /></div>
          </div>
        }


        {/* color */}
        <div className={`absolute p-2 rounded left-0 bottom-0 w-1/3 translate-y-[69px]  z-10  ${darkMode ? 'bg-[#202124] shadowHanger' : 'bg-[#ffffff] shadowHangerDay'} ${!colorActive && 'hidden'}`}>
          <div className='justify-items-center gap-2 md:gap-1 grid grid-cols-4 items-center '>
            <div onClick={() => changeColor('none')} className='w-6 h-6 border bg-transparent rounded-full text-xs grid place-content-center hover:cursor-pointer'><RxCross2 /></div>
            {colors.map((item, i) => <div key={i} onClick={() => changeColor(item)} className={`w-6 h-6 border bg-[${item}] hover:cursor-pointer rounded-full`}></div>)}
          </div>
        </div>
        {/* category */}
        <div className={`absolute rounded left-0 bottom-0 translate-y-full z-10 ${darkMode ? 'bg-[#202124] shadowHanger' : 'bg-[#ffffff] shadowHangerDay'} ${!catActive && 'hidden'}`}>
          <div className='justify-items-center flex flex-col '>
            <div onClick={() => changeCategory('none')} className='hover:cursor-pointer w-full py-2 hover:bg-[#101012] duration-300 px-3'>No category...</div>
            {catArray.map((item, i) => <div key={i} onClick={() => changeCategory(item)} className={`w-full hover:cursor-pointer hover:bg-[#101012] uppercase duration-300 py-2 px-3`}>{item}</div>)}
          </div>
        </div>




      </div>



    </div>
  )
}
{/* <h2 className='text-xl font-bold mb-1'>Title</h2> */ }
{/* <div>Input</div> */ } {/* text-black  */ }