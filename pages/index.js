import Navbar from '@/components/Navbar'
import Main from '@/components/Main'
import Head from 'next/head'

import { useEffect, useState } from 'react'
import { sampleList } from '@/helpers/Sample'

// the whole project needs a lot of refactoring (a lot of repetition), I will revisit it to improve it eventually

export default function Home() {

  const [search, setSearch] = useState('')
  const [active, setActive] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [currentNotes, setCurrentNotes] = useState([])
  const [selectedColor, setSelectedColor] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes && storedNotes.length) {
      setCurrentNotes(storedNotes);
    } else {
      setCurrentNotes(sampleList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(currentNotes));
  }, [currentNotes]);


  return (
    <>
      <Head>
        <title>Agus Notes</title>
        <meta name="description" content="Google Keep Clone by Agus Mac Rae" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`min-h-screen relative duration-300  ${darkMode ? 'bg-[#202124] text-white' : 'bg-white text-[#202124]'}`}>
        <Navbar {...{ darkMode, setActive, setSearch, search }} />
        <Main  {...{
          darkMode, setDarkMode, setActive, active, search,
          currentNotes, setCurrentNotes, selectedColor, selectedCategory, setSelectedColor, setSelectedCategory
        }} />

      </main>
    </>
  )
}
