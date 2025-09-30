

"use client";

import { ProjectResponse } from "@/apiClient";
import { Play, Plus } from "lucide-react";

interface Project {
  id: string;
  date: string;
  name: string;
  tag: string;
  tagColor: string;
}

interface ProjectCardProps {
  project: ProjectResponse;
}

export function ProjectCard({ project }: ProjectCardProps) {
  console.log(project)
  const date = new Date(project.date)
  
  return (
    <div className="project-card rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer bg-gray-100 dark:bg-gray-800">
      {/* Top Section - Gray Background with Tags */}
      <div className="project-card-top-section p-3">
        <div className="flex flex-wrap gap-1 text-xs">
          {/* First Row */}
          <div className="flex gap-1 mb-1">
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Everything
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Organizer
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Broadcast
            </span>
          </div>

          {/* Second Row */}
          <div className="flex gap-1 mb-1">
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Evaluation
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Overview
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Assessment
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Recap
            </span>
          </div>

          {/* Third Row */}
          <div className="flex gap-1">
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Insights
            </span>
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-gray-700 dark:text-gray-300">
              Suggestions
            </span>
          </div>
        </div>
      </div>

      {/* Middle Section - Title and Project Tag */}
      <div className="project-card-middle-section p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {project.title}
          </h3>
          <span className="h-7 px-1 py-1.5 text-sm font-medium rounded-xs border-2 border-primary text-primary flex items-center justify-center">
            Project Alpha
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          A brief overview of the missile test conducted, highlighting its
          objectives and outcomes.
        </p>
      </div>

      {/* Bottom Section - Action Buttons */}
      <div className="project-card-bottom-section p-4 pt-0">
        <div className="flex gap-2">
          {/* PL Button */}
          <div className="flex items-center gap-2 px-3 py-2 border border-blue-500 rounded text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <span className="text-blue-700 dark:text-blue-300 font-bold">PL</span>
            <Play className="h-3 w-3" />
          </div>

          {/* LV Button */}
          <div className="flex items-center gap-2 px-3 py-2 border border-green-500 rounded text-sm font-medium text-green-700 dark:text-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
            <span className="text-green-700 dark:text-green-300 font-bold">LV</span>
            <Play className="h-3 w-3" />
          </div>

          {/* AN Button */}
          <div className="flex items-center gap-2 px-3 py-2 border border-orange-500 rounded text-sm font-medium text-orange-700 dark:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
            <span className="text-orange-700 dark:text-orange-300 font-bold">AN</span>
            <Play className="h-3 w-3" />
          </div>

          {/* RP Button */}
          <div className="flex items-center gap-2 px-3 py-2 border border-blue-500 rounded text-sm font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <span className="text-blue-700 dark:text-blue-300 font-bold">RP</span>
            <Plus className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
