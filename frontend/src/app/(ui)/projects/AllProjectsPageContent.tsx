

"use client";

import { AllProjectsCard } from "./components/AllProjectsCard";
import { PageTopBar } from "@/shared/components/PageTopBar";

// Mock data for all projects - this would come from your API
const allProjects = [
  {
    id: "1",
    name: "Unassigned Tests",
    lastTest: "Beta",
    testCount: 12,
    color: "purple" as const,
  },
  {
    id: "2",
    name: "Project Alpha",
    lastTest: "Beta",
    testCount: 12,
    color: "purple" as const,
  },
  {
    id: "3",
    name: "Project Omega",
    lastTest: "Beta",
    testCount: 4,
    color: "teal" as const,
  },
  {
    id: "4",
    name: "Project Beta",
    lastTest: "Water",
    testCount: 2,
    color: "orange" as const,
  },
];

export function AllProjectsPageContent() {
  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Top Bar */}
      <PageTopBar title="All Projects" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div 
          className="grid gap-6"
          style={{
            flex: "1 0 0",
            alignSelf: "stretch",
            gridTemplateRows: "repeat(5, minmax(0, 1fr))",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          }}
        >
          {/* Create New Project Card */}
          <AllProjectsCard project={{} as any} isCreateNew={true} />
          
          {/* Project Cards */}
          {allProjects.map(project => (
            <AllProjectsCard key={project.id} project={project} />
          ))}
          
          {/* Empty cells to fill the grid */}
          {Array.from({ length: 35 - 1 - allProjects.length }, (_, index) => (
            <div key={`empty-${index}`} className="bg-transparent" />
          ))}
        </div>
      </div>
    </div>
  );
}
