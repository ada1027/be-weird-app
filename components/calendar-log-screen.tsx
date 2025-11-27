"use client"

import { useState } from "react"
import { MobileShell } from "@/components/ui/mobile-shell"
import { RainbowWave } from "@/components/ui/rainbow-wave"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

interface CompletedQuest {
  id: string
  title: string
  photoUrl: string
  date: Date
}

const MOCK_QUESTS: CompletedQuest[] = [
  { id: "1", title: "High-five a tree", photoUrl: "/tree-high-five-nature.png", date: new Date(2025, 10, 3) },
  { id: "2", title: "Wear mismatched socks", photoUrl: "/colorful-mismatched-socks.png", date: new Date(2025, 10, 7) },
  { id: "3", title: "Talk to a plant", photoUrl: "/person-talking-to-houseplant.png", date: new Date(2025, 10, 12) },
  { id: "4", title: "Skip instead of walk", photoUrl: "/person-skipping-joyfully.png", date: new Date(2025, 10, 15) },
  { id: "5", title: "Draw a silly face", photoUrl: "/silly-doodle-face-drawing.png", date: new Date(2025, 10, 20) },
  { id: "6", title: "Eat lunch backwards", photoUrl: "/dessert-first-meal.png", date: new Date(2025, 10, 25) },
  { id: "7", title: "Dance for 30 seconds", photoUrl: "/person-dancing-happy.png", date: new Date(2025, 10, 26) },
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  let startDay = firstDay.getDay() - 1
  if (startDay < 0) startDay = 6
  return { daysInMonth, startDay }
}

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

export function CalendarLogScreen() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<Date>(today)

  const { daysInMonth, startDay } = getMonthData(currentYear, currentMonth)

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const getQuestForDate = (date: Date) => MOCK_QUESTS.find((q) => isSameDay(q.date, date))
  const getQuestsForDate = (date: Date) => MOCK_QUESTS.filter((q) => isSameDay(q.date, date))
  const selectedQuests = getQuestsForDate(selectedDate)

  const cells: (number | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <MobileShell hasBottomNav className="gap-4 relative">
      <div className="absolute top-0 left-0 right-0 opacity-30">
        <RainbowWave />
      </div>

      <div className="text-center relative z-10 pt-2">
        <div className="flex items-center justify-center gap-2 mb-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal to-sky flex items-center justify-center">
            <Calendar className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-purple">Weirdness Calendar</h1>
        </div>
        <p className="text-sm text-purple/60 font-bold">Your journey of tiny adventures</p>
      </div>

      <div className="flex items-center justify-between px-2">
        <button
          onClick={goToPrevMonth}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 shadow-lg active:scale-95 transition-transform border-2 border-purple/20"
        >
          <ChevronLeft className="w-5 h-5 text-purple" />
        </button>
        <span className="text-lg font-extrabold text-purple">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={goToNextMonth}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/80 shadow-lg active:scale-95 transition-transform border-2 border-purple/20"
        >
          <ChevronRight className="w-5 h-5 text-purple" />
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 shadow-xl border-2 border-purple/10">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-extrabold text-purple/50 py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} className="aspect-square" />

            const cellDate = new Date(currentYear, currentMonth, day)
            const quest = getQuestForDate(cellDate)
            const isToday = isSameDay(cellDate, today)
            const isSelected = isSameDay(cellDate, selectedDate)

            return (
              <button
                key={day}
                onClick={() => setSelectedDate(cellDate)}
                className={`
                  aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 p-1
                  transition-all duration-300 active:scale-95
                  ${isSelected ? "bg-gradient-to-br from-pink to-purple ring-2 ring-pink ring-offset-2 ring-offset-white/80" : ""}
                  ${isToday && !isSelected ? "bg-yellow/30" : ""}
                  ${!isSelected && !isToday ? "hover:bg-purple/10" : ""}
                `}
              >
                <span className={`text-xs font-bold ${isSelected ? "text-white" : "text-purple"}`}>{day}</span>
                {quest ? (
                  <img
                    src={quest.photoUrl || "/placeholder.svg"}
                    alt=""
                    className="w-6 h-6 rounded-md object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-md bg-purple/10 flex items-center justify-center">
                    <span className="text-purple/30 text-xs">+</span>
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-purple/10 flex-1">
        <h2 className="text-lg font-extrabold text-purple mb-3">
          {selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </h2>

        {selectedQuests.length > 0 ? (
          <div className="flex flex-col gap-3">
            {selectedQuests.map((quest) => (
              <div
                key={quest.id}
                className="flex items-center gap-3 p-2 rounded-xl bg-gradient-to-r from-teal/10 to-sky/10 border border-teal/20"
              >
                <img
                  src={quest.photoUrl || "/placeholder.svg"}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover shadow-md"
                />
                <div className="flex-1">
                  <p className="font-bold text-purple">{quest.title}</p>
                  <p className="text-xs text-teal font-extrabold">Completed!</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple/20 to-pink/20 flex items-center justify-center mb-3">
              <span className="text-3xl">🌱</span>
            </div>
            <p className="text-purple/60 text-sm font-bold">No weirdness logged this day</p>
            <p className="text-purple/40 text-xs mt-1 font-medium">Complete a quest to fill this spot!</p>
          </div>
        )}
      </div>
    </MobileShell>
  )
}
