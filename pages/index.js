import Navbar from '@/components/Navbar'
import Main from '@/components/Main'
import Head from 'next/head'

import { useEffect, useState } from 'react'
import { sampleList } from '@/helpers/Sample'


export default function Home() {

  const [darkMode, setDarkMode] = useState(true)
  const [currentNotes, setCurrentNotes] = useState(sampleList)
  const [selectedColor, setSelectedColor] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // useEffect(() => {
  //   console.log('notes changed ' + currentNotes.length);
  // }, [currentNotes])
  const [search, setSearch] = useState('')




  const [active, setActive] = useState(false)

  return (
    <>
      <Head>
        <title>Agus Notes</title>
        <meta name="description" content="Google Keep Clone by Agus Mac Rae" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`min-h-screen relative duration-300  ${darkMode ? 'bg-[#202124] text-white' : 'bg-white text-[#202124]'}`}>
        <Navbar {...{ darkMode, setActive, setSearch,search }} />
        <Main  {...{
          darkMode, setDarkMode, setActive, active, search,
          currentNotes, setCurrentNotes, selectedColor, selectedCategory, setSelectedColor, setSelectedCategory
        }} />

      </main>
    </>
  )
}
