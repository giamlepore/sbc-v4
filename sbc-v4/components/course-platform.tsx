'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Home, BookOpen, CheckSquare, BarChart2, ChevronRight, Play, Check, X } from 'lucide-react'
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

const modules = [
  {
    title: 'O seu primeiro módulo aqui',
    courses: [
      { title: 'Aula #001 → O que gostaria de saber antes? Parte 01', duration: '10:00', image: '/thumb.jpg', video: 'https://player.vimeo.com/video/1008575104?badge=0&amp;autopause=0&amp;player_id=0&amp' },
      { title: 'Aula #002 → O que gostaria de saber antes? Parte 02', duration: '10:00', image: '/thumb.jpg', video: 'https://player.vimeo.com/video/1008575201?badge=0&amp;autopause=0&amp;player_id=0&amp' },
      { title: 'EXTRA #001: Ferramentas para começar', duration: '14:00', image: '/ferramentas.jpg', video: 'https://player.vimeo.com/video/1008577242?badge=0&amp;autopause=0&amp;player_id=0&amp' },
      { title: 'EXTRA #002: Criando um (belo) site em 26 minutos', duration: '26:00', image: '/vídeo.png', video: 'https://player.vimeo.com/video/1009311054?badge=0&amp;autopause=0&amp' },
    ],
    tasks: [
      { title: 'Escolha a ferramenta que você vai documentar seus aprendizados. (Coda, Notion, Trello, Asana são algumas possibilidades)', completed: false },
      { title: 'Defina quais ferramentas você vai utilizar repetidamente, aprofunde nelas (Framer, v0.dev, ChatGPT, Google Analytics, Google Search Console, Google Tag Manager, Clarity são algumas delas.', completed: false },
      { title: 'Reflita sobre "O que é um jogo pra você, e trabalho para os outros?"', completed: false },
      { title: 'É mais rápido para você colocar algo no ar, ou fazer todas as entrevistas antes?"', completed: false },
    ]
  },
  {
    title: 'Módulo 02, em breve',
    courses: [
      { title: 'Em construção', duration: '10:15', image: '/soon.jpg', video: 'https://player.vimeo.com/video/336265026' },
      { title: 'Muito em breve, por aqui', duration: '15:30', image: '/soon.jpg', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { title: 'Esse será chocante', duration: '20:45', image: '/soon.jpg', video: 'https://player.vimeo.com/video/336265026' },
    ],
    tasks: [
      { title: 'Sem tarefas, por enquanto', completed: false },
      { title: 'Sem tarefas, por enquanto', completed: false },
    ]
  },
  {
    title: 'Módulo 03, mais perto do que você imagina',
    courses: [
      { title: 'Por essa aula, estou ansioso', duration: '25:00', image: '/soon.jpg', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' },
      { title: 'Essa daqui, você nem imagina', duration: '18:20', image: '/soon.jpg', video: 'https://player.vimeo.com/video/336265026' },
      { title: 'Já essa aula, é muito diferente', duration: '22:10', image: '/soon.jpg', video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    ],
    tasks: [
      { title: 'Sem tarefas, por enquanto', completed: false },
      { title: 'Sem tarefas, por enquanto', completed: false },
    ]
  },
]

const shorts = [
  { title: 'Validação de Ideias', duration: '1:00', video2: 'https://player.vimeo.com/video/1010369564?autoplay=1&loop=1&muted=1&autopause=0', video: 'https://player.vimeo.com/video/1010369564?autoplay=1' },
  { title: 'Tipos de Criadores', duration: '0:45', video2: 'https://player.vimeo.com/video/1010369687?autoplay=1&loop=1&muted=1&autopause=0', video: 'https://player.vimeo.com/video/1010369687?autoplay=1' },
  { title: 'Entender de Tech', duration: '1:30', video2: 'https://player.vimeo.com/video/1010369636?autoplay=1&loop=1&muted=1&autopause=0', video: 'https://player.vimeo.com/video/1010369636?autoplay=1' },
  { title: '3 tipos de PMs', duration: '1:00', video2: 'https://player.vimeo.com/video/1010369598?autoplay=1&loop=1&muted=1&autopause=0', video: 'https://player.vimeo.com/video/1010369598?autoplay=1' },
  { title: 'Progresso vs Movimento', duration: '1:15', video2: 'https://player.vimeo.com/video/1010369754?autoplay=1&loop=1&muted=1&autopause=0', video: 'https://player.vimeo.com/video/1010369754?autoplay=1' },
  { title: 'Contexto Importa', duration: '0:50', video2: 'https://player.vimeo.com/video/1010369687?autoplay=1&loop=1&muted=1&autopause=0', video: 'https://player.vimeo.com/video/1010369687?autoplay=1' },
]

export function CoursePlatform() {
  const [currentModule, setCurrentModule] = useState(0)
  const [currentCourse, setCurrentCourse] = useState(0)
  const [completedCourses, setCompletedCourses] = useState<{[key: number]: number[]}>({})
  const [activeTab, setActiveTab] = useState('Home 🏠')
  const [showVideo, setShowVideo] = useState(false)
  const [currentShort, setCurrentShort] = useState(0)
  const [showShortVideo, setShowShortVideo] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const shortsRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [showCheckAnimation, setShowCheckAnimation] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleComplete = () => {
    setShowCheckAnimation(true)
    setCompletedCourses(prev => ({
      ...prev,
      [currentModule]: [...(prev[currentModule] || []), currentCourse]
    }))

    setTimeout(() => {
      setShowCheckAnimation(false)
      moveToNextLesson()
    }, 1000)
  }

  const moveToNextLesson = () => {
    const currentModuleCourses = modules[currentModule].courses
    if (currentCourse < currentModuleCourses.length - 1) {
      // Move to the next lesson in the current module
      setCurrentCourse(currentCourse + 1)
    } else if (currentModule < modules.length - 1) {
      // Move to the first lesson of the next module
      setCurrentModule(currentModule + 1)
      setCurrentCourse(0)
    } else {
      // All modules completed
      setShowVideo(false)
      setActiveTab('My Progres ⏳')
    }
  }

  const progress = Object.values(completedCourses).flat().length / modules.reduce((acc, module) => acc + module.courses.length, 0) * 100

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'light')
  }

  const renderVideoPlayer = (videoUrl: string) => {
    if (videoUrl.includes('vimeo')) {
      return (
        <iframe
          src={videoUrl}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      )
    } else {
      return (
        <video
          className="w-full h-full"
          src={videoUrl}
          controls
        />
      )
    }
  }

  const handleSwipe = (direction: 'up' | 'down') => {
    if (direction === 'up' && currentShort < shorts.length - 1) {
      setCurrentShort(currentShort + 1)
    } else if (direction === 'down' && currentShort > 0) {
      setCurrentShort(currentShort - 1)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleSwipe('up')
    }

    if (touchStart - touchEnd < -50) {
      handleSwipe('down')
    }
  }

  const renderCourseVideos = () => {
    const currentModuleCourses = modules[currentModule].courses
    const previousVideos = currentModuleCourses.slice(0, currentCourse)
    const nextVideos = currentModuleCourses.slice(currentCourse + 1)
    
    return (
      <div className="mt-6 space-y-6">
        {previousVideos.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Previous in this module:</h3>
            <ul className="space-y-2">
              {previousVideos.map((course, index) => (
                <li key={index} className="flex items-center space-x-2 p-2 bg-card rounded-lg cursor-pointer hover:bg-accent" onClick={() => {
                  setCurrentCourse(index)
                }}>
                  <Play className="h-4 w-4" />
                  <span>{course.title}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{course.duration}</span>
                  {completedCourses[currentModule]?.includes(index) && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {nextVideos.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Next in this module:</h3>
            <ul className="space-y-2">
              {nextVideos.map((course, index) => (
                <li key={index} className="flex items-center space-x-2 p-2 bg-card rounded-lg cursor-pointer hover:bg-accent" onClick={() => {
                  setCurrentCourse(currentCourse + index + 1)
                }}>
                  <Play className="h-4 w-4" />
                  <span>{course.title}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{course.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }

  const renderShorts = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Shorts</h2>
          <ChevronRight className="h-6 w-6" />
        </div>
        <div 
          className="flex overflow-x-auto space-x-4 pb-4 cursor-grab"
          ref={shortsRef}
          onMouseDown={(e) => {
            setIsDragging(true)
            setStartX(e.pageX - shortsRef.current!.offsetLeft)
            setScrollLeft(shortsRef.current!.scrollLeft)
          }}
          onMouseLeave={() => setIsDragging(false)}
          onMouseUp={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (!isDragging) return
            e.preventDefault()
            const x = e.pageX - shortsRef.current!.offsetLeft
            const walk = (x - startX) * 2
            shortsRef.current!.scrollLeft = scrollLeft - walk
          }}
        >
          {shorts.map((short, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 bg-card rounded-lg overflow-hidden shadow-sm cursor-pointer"
              onClick={() => {
                setCurrentShort(index)
                setShowShortVideo(true)
              }}
            >
              <div className="relative aspect-[9/16]">
                {/* <img src={short.image} alt={short.title} className="w-full h-full object-cover" /> */}
                <iframe
                src={short.video2}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-1 left-1 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                  {short.duration}
                </div>
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-xs truncate">{short.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderAllShorts = () => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {shorts.map((short, index) => (
          <div
            key={index}
            className="bg-card rounded-lg overflow-hidden shadow-sm cursor-pointer"
            onClick={() => {
              setCurrentShort(index)
              setShowShortVideo(true)
            }}
          >
            <div className="relative aspect-[9/16]">
              {/* <img src={short.image} alt={short.title} className="w-full h-full object-cover" /> */}
              <iframe
                src={short.video2}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <Play className="h-12 w-12 text-white" />
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-1 py-0.5 rounded">
                {short.duration}
              </div>
            </div>
            <div className="p-2">
              <h3 className="font-semibold text-sm">{short.title}</h3>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between px-4 py-2 bg-white">
          <h1 className="text-2xl font-bold text-black">SBC</h1>
          <div className="flex-1 mx-4">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-8 w-full" placeholder="Search" />
            </div>
          </div>
          <Avatar onClick={toggleTheme} className="cursor-pointer">
            <AvatarImage src="/placeholder-user.jpg" alt="@user" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 bg-white text-black">
        {showVideo ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">{modules[currentModule].courses[currentCourse].title}</h2>
            <div className="aspect-video bg-black mb-6 rounded-lg overflow-hidden">
              {renderVideoPlayer(modules[currentModule].courses[currentCourse].video)}
            </div>
            <div className="relative">
              <Button onClick={handleComplete} className="w-full">
                Mark as Completed
              </Button>
              {showCheckAnimation && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-75 rounded"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check className="h-12 w-12 text-white" />
                </motion.div>
              )}
            </div>
            {renderCourseVideos()}
          </div>
        ) : showShortVideo ? (
          <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
            <div className="relative w-full h-full">
            <iframe
                className="w-full h-full object-cover"
                src={shorts[currentShort].video}
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              ></iframe>
            <div 
              className="absolute inset-0"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ zIndex: 10 }}
            >
              {/* <video
                className="w-full h-full object-cover"
                src={shorts[currentShort].video}
                autoPlay
                loop
                controls
              /> */}
              </div>
              <div className="absolute top-4 right-4" style={{ zIndex: 11 }}>
                <Button variant="ghost" onClick={() => setShowShortVideo(false)}>
                  <X className="h-6 w-6 text-white" />
                </Button>
              </div>
              <div className="absolute left-4 bottom-20 text-white">
                <h3 className="text-xl font-bold">{shorts[currentShort].title}</h3>
                <p>{shorts[currentShort].duration}</p>
              </div>
            </div>
          </div>
        ) : activeTab === 'Home 🏠' ? (
          <>
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">{module.title}</h2>
                  <ChevronRight className="h-6 w-6" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {module.courses.map((course, courseIndex) => (
                    <div
                      key={courseIndex}
                      className="bg-card rounded-lg overflow-hidden shadow-sm cursor-pointer"
                      onClick={() => {
                        setCurrentModule(moduleIndex)
                        setCurrentCourse(courseIndex)
                        setShowVideo(true)
                      }}
                    >
                      <div className="relative aspect-video">
                        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="p-2">
                        <h3 className="font-semibold text-sm">{course.title}</h3>
                        <p className="text-xs text-muted-foreground">{course.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {renderShorts()}
          </>
        ) : activeTab === 'Shorts 🔥' ? (
          renderAllShorts()
        ) : activeTab === 'Tasks ☑️' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-card p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <ul className="space-y-2">
                  {module.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="flex items-center space-x-2">
                      <Checkbox id={`task-${moduleIndex}-${taskIndex}`} />
                      <label htmlFor={`task-${moduleIndex}-${taskIndex}`} className="text-sm">
                        {task.title}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : activeTab === 'My Progress ⏳' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">My Progress</h2>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-lg font-semibold">{Math.round(progress)}% Complete</p>
            {modules.map((module, moduleIndex) => (
              <div key={moduleIndex} className="bg-card p-4 rounded-lg">
                <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                <ul className="space-y-2">
                  {module.courses.map((course, courseIndex) => (
                    <li key={courseIndex} className="flex items-center space-x-2">
                      {completedCourses[moduleIndex]?.includes(courseIndex) ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <div className="h-5 w-5 border border-muted-foreground rounded-full" />
                      )}
                      <span>{course.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </main>

      {/* Bottom Navigation */}
      <nav className="sticky bottom-0 bg-background border-t bg-white text-black">
        <div className="flex justify-around py-2">
          {[
            { icon: Home, label: 'Home 🏠' },
            { icon: BookOpen, label: 'Shorts 🔥' },
            { icon: CheckSquare, label: 'Tasks ☑️' },
            { icon: BarChart2, label: 'My Progress ⏳' },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="flex flex-col items-center"
              onClick={() => {
                setActiveTab(item.label)
                setShowVideo(false)
                setShowShortVideo(false)
              }}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}