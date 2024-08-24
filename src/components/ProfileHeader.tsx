'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CreditCard } from 'lucide-react'

export default function Component() {
  const [open, setOpen] = useState(false)

  const currentLevel = 3
  const currentPoints = 3560
  const minPointsCurrentLevel = 3000
  const minPointsNextLevel = 4000
  const pointsToLevelUp = minPointsNextLevel - currentPoints
  const progress = ((currentPoints - minPointsCurrentLevel) / (minPointsNextLevel - minPointsCurrentLevel)) * 100

  return (
    <div className="w-full max-w-md p-4 bg-gray-900 text-white rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#444"
              strokeWidth="4"
              strokeDasharray="100, 100"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#179DD7"
              strokeWidth="4"
              strokeDasharray={`${progress}, 100`}
              
            />
          </svg>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-[#179DD7]">
            {currentLevel}
          </span>
        </div>
        <div>
            
          <h2 className="text-xl font-bold mb-1 flex">You are on<p className='text-[#179DD7] pl-1'>Level {currentLevel}</p></h2>
          <p className="mb-1">Your points: {currentPoints}</p>
          <p className="text-sm text-gray-400">With {pointsToLevelUp} points, you level up</p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button variant="outline" className="bg-gray-800 text-gray-400 h-16 px-2 mx-1 flex flex-col items-center justify-center">
            <CreditCard className="mt-1" size={20} />
            <span>Club Card</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Club Card Information</DialogTitle>
            <DialogDescription>
              Here you can view your club card details.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Your club card details will be displayed here.</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}