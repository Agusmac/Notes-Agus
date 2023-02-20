import React, { useState } from 'react'
import Image from 'next/image'
import { GiHamburgerMenu } from 'react-icons/gi';
import { RxCross2 } from 'react-icons/rx';

export default function Navbar({ setActive, darkMode, setSearch, search }) {

    const [timeoutId, setTimeoutId] = useState(null);

    const changer = () => setActive(prev => !prev)
    const clearSearch = () => setSearch('')

    const searchSetter = (e) => {
        clearTimeout(timeoutId);
        const id = setTimeout(() => {
            setSearch(e)
        }, 300);

        setTimeoutId(id);
    }


    return (
        <div className={`flex px-2 md:px-4 py-2 gap-6 border-b h-[69px] sticky top-0
         border-[#5f6368] font-sans justify-between duration-300
         md:justify-start  z-10 
         ${darkMode ? 'bg-[#202124] text-white border-[#5f6368]' : 'bg-white text-[#202124] border-[#e0e0e0]'}`}>

            {/* open/close sidebar */}
            <div className='flex'>
                <div onClick={changer} className={`border-round rounded-full flex place-content-center ${darkMode ? 'hover:bg-gray-600 ' : 'hover:bg-gray-200'} text-xl p-4`}>
                    <GiHamburgerMenu />
                </div>
                {/* logo */}
                <div className='flex items-center text-2xl gap-2'>
                    <Image src="/logo.png" alt="Picture of the author" width={40} height={36} />
                    <h1>Keep</h1>
                </div>
            </div>
            {/* searchbar */}
            <div className={`h-[48px] self-center bg-white rounded-lg min-w-[50vw] flex md:min-w-[40vw] max-w-[720px] duration-300 ml-[5%] ${darkMode ? '' : 'border border-[#e0e0e0]'}`}>
                <div className='w-16 h-[48px] flex place-content-center p-1'>
                    <div className='flex items-center justify-center rounded-full w-10 h-10 '>
                        <Image src="/search.svg" alt="Picture of the author" width={25} height={25} />
                    </div>
                </div>

                <div className='w-full flex items-center placeholder-[#bfbfc0] text-black text-lg'>
                    <input onChange={(e) => searchSetter(e.target.value)} type="search" name="Search" placeholder="Search" className="w-full focus:outline-none bg-transparent" />
                </div>
                {/* clear search */}
                {search != '' &&
                    <div className='w-16 flex place-content-center p-1'>
                        <div onClick={clearSearch} className='flex items-center justify-center rounded-full w-10 h-10 hover:bg-gray-200 cursor-pointer text-black text-2xl'>
                            <RxCross2 />
                        </div>
                    </div>
                }

            </div>



        </div>
    )
}
