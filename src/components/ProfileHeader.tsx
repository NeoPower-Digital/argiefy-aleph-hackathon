"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Component() {
  const [open, setOpen] = useState(false);

  const currentLevel = 3;
  const currentPoints = 3560;
  const minPointsCurrentLevel = 3000;
  const minPointsNextLevel = 4000;
  const pointsToLevelUp = minPointsNextLevel - currentPoints;
  const progress =
    ((currentPoints - minPointsCurrentLevel) /
      (minPointsNextLevel - minPointsCurrentLevel)) *
    100;

  return (
    <div className="w-full max-w-md p-4 text-white rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20">
          <CircularProgressbar
            value={progress}
            strokeWidth={10} 
            styles={buildStyles({
              pathColor: "#179DD7",
              trailColor: "#444",
              strokeLinecap: "round",
              pathTransitionDuration: 0.5,
            })}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="pb-1 text-4xl font-extrabold text-[#179DD7]">
              {currentLevel}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1 flex">
            You are on
            <p className="text-[#179DD7] pl-1">Level {currentLevel}</p>
          </h2>
          <p className="mb-1">Your points: {currentPoints}</p>
          <p className="text-sm text-gray-400">
            With {pointsToLevelUp} points, you level up
          </p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="bg-gray-800 text-gray-400 h-16 px-2 mx-1 flex flex-col items-center justify-center"
          >
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
  );
}
