/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { ProjectCard } from "../recent/components/ProjectCard";

// Mock data for all projects - this would come from your API
const allProjects = [
  {
    id: "1",
    date: "03.15.2027",
    name: "Revamp UI",
    tag: "Project Beta",
    tagColor: "border-tag-purple text-tag-purple",
  },
  {
    id: "2",
    date: "04.10.2027",
    name: "NextGen App",
    tag: "Project Launch",
    tagColor: "border-tag-green text-tag-green",
  },
  {
    id: "3",
    date: "04.10.2027",
    name: "Test Gamma",
    tag: "Unassigned",
    tagColor: "border-tag-gray text-tag-gray",
  },
  {
    id: "4",
    date: "05.05.2027",
    name: "Summer Blast",
    tag: "Project Campaign",
    tagColor: "border-tag-purple text-tag-purple",
  },
  {
    id: "5",
    date: "06.25.2027",
    name: "Shopify 2.0",
    tag: "E-commerce Platform",
    tagColor: "border-tag-orange text-tag-orange",
  },
  {
    id: "6",
    date: "07.22.2027",
    name: "Test Zeta",
    tag: "Unassigned",
    tagColor: "border-tag-gray text-tag-gray",
  },
  {
    id: "7",
    date: "07.22.2027",
    name: "Test Zeta",
    tag: "Unassigned",
    tagColor: "border-tag-gray text-tag-gray",
  },
  {
    id: "8",
    date: "07.30.2027",
    name: "Insight Pro",
    tag: "Data Analytics Tool",
    tagColor: "border-tag-blue text-tag-blue",
  },
  {
    id: "9",
    date: "05.30.2027",
    name: "Operation Theta",
    tag: "Unassigned",
    tagColor: "border-tag-gray text-tag-gray",
  },
  // Add more projects to show the difference from Recent
  {
    id: "10",
    date: "02.15.2027",
    name: "Legacy System",
    tag: "Maintenance",
    tagColor: "border-tag-orange text-tag-orange",
  },
  {
    id: "11",
    date: "01.20.2027",
    name: "Mobile App",
    tag: "Development",
    tagColor: "border-tag-blue text-tag-blue",
  },
  {
    id: "12",
    date: "12.10.2026",
    name: "Database Migration",
    tag: "Infrastructure",
    tagColor: "border-tag-purple text-tag-purple",
  },
];

export function AllProjectsPageContent() {
  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        {/* Left side - Title and View Controls */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold text-foreground">
            All Projects
          </h1>

          {/* View Toggle Buttons */}
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded border border-border flex items-center justify-center">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button className="h-8 w-8 p-0 border border-border rounded flex items-center justify-center hover:bg-accent">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              placeholder="Search"
              className="pl-10 w-64 h-8 bg-background border border-border rounded-md px-3 text-sm"
            />
          </div>
        </div>

        {/* Right side - Create Buttons */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 h-8 px-3 border border-border rounded-md hover:bg-accent">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
            </svg>
            Create a New Project
          </button>
          <button className="flex items-center gap-2 h-8 px-3 bg-primary hover:bg-primary/90 rounded-md text-primary-foreground">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create a New Test
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-6">
          {allProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
