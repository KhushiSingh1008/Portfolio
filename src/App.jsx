import React, { useState } from 'react'
import BookEngine from './components/BookEngine'
import DnaHelixSpine from './components/DnaHelixSpine'

import CoverPage from './components/pages/CoverPage'
import ProloguePage from './components/pages/ProloguePage'
import WorkPages from './components/pages/WorkPages'
import FieldNotesPage from './components/pages/FieldNotesPage'
import MarginaliaPage from './components/pages/MarginaliaPage'
import VersesPage from './components/pages/VersesPage'
import AppendixPage from './components/pages/AppendixPage'
import ContactPage from './components/pages/ContactPage'

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const TOTAL_PAGES = 8

  const handleSelectChapter = (index) => {
    if (index === activeIndex) return
    setIsTransitioning(true)
    setActiveIndex(index)
    setTimeout(() => {
      setIsTransitioning(false)
    }, 650)
  }

  const renderActivePage = () => {
    switch (activeIndex) {
      case 0:
        return <CoverPage onOpenBook={() => handleSelectChapter(1)} />
      case 1:
        return <ProloguePage />
      case 2:
        return <WorkPages />
      case 3:
        return <FieldNotesPage />
      case 4:
        return <MarginaliaPage />
      case 5:
        return <VersesPage />
      case 6:
        return <AppendixPage />
      case 7:
        return <ContactPage />
      default:
        return <CoverPage onOpenBook={() => handleSelectChapter(1)} />
    }
  }

  return (
    <>
      {/* DNA Double-Helix Progress & Navigation Spine */}
      <DnaHelixSpine
        activeChapter={activeIndex}
        totalChapters={TOTAL_PAGES}
        isTransitioning={isTransitioning}
        onSelectChapter={handleSelectChapter}
      />

      {/* 3D Page Turning Book Engine */}
      <BookEngine
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        totalPages={TOTAL_PAGES}
      >
        {renderActivePage()}
      </BookEngine>
    </>
  )
}
