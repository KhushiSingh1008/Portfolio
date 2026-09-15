import React, { useState } from 'react'
import BookEngine from './components/BookEngine'
import Scene3D from './components/Scene3D'
import CustomCursor from './components/CustomCursor'

import CoverPage from './components/pages/CoverPage'
import ProloguePage from './components/pages/ProloguePage'
import WorkPages from './components/pages/WorkPages'
import FieldNotesPage from './components/pages/FieldNotesPage'
import MarginaliaPage from './components/pages/MarginaliaPage'
import AppendixPage from './components/pages/AppendixPage'
import ContactPage from './components/pages/ContactPage'

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const TOTAL_PAGES = 7

  const renderActivePage = () => {
    switch (activeIndex) {
      case 0:
        return <CoverPage onOpenBook={() => setActiveIndex(1)} />
      case 1:
        return <ProloguePage onNext={() => setActiveIndex(2)} />
      case 2:
        return <WorkPages />
      case 3:
        return <FieldNotesPage />
      case 4:
        return <MarginaliaPage />
      case 5:
        return <AppendixPage />
      case 6:
        return <ContactPage onStartOver={() => setActiveIndex(0)} />
      default:
        return <CoverPage onOpenBook={() => setActiveIndex(1)} />
    }
  }

  return (
    <>
      {/* 3D WebGL Atmospheric Background */}
      <Scene3D />

      {/* Smooth Custom Cursor */}
      <CustomCursor />

      {/* Notebook Engine */}
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
