

"use client";

import { ProjectCard } from "./components/ProjectCard";
import { PageTopBar } from "@/shared/components/PageTopBar";

// Mock data for recent projects - this would come from your API
const recentProjects = [
  {
    id: "1",
    date: "03.15.2027",
    name: "Revamp UI",
    tag: "Project Beta",
    tagColor: "border-tag-purple text-foreground", // Purple-blue border and text
  },
  {
    id: "2",
    date: "04.10.2027",
    name: "NextGen App",
    tag: "Project Launch",
    tagColor: "text-foreground", // Green border and text
  },
  {
    id: "3",
    date: "04.10.2027",
    name: "Test Gamma",
    tag: "Unassigned",
    tagColor: "text-foreground", // Gray border and text
  },
  {
    id: "4",
    date: "05.05.2027",
    name: "Summer Blast",
    tag: "Project Campaign",
    tagColor: "text-foreground", // Purple-blue border and text
  },
  {
    id: "5",
    date: "06.25.2027",
    name: "Shopify 2.0",
    tag: "E-commerce Platform",
    tagColor: "border-primary text-foreground", // Orange border and text
  },
  {
    id: "6",
    date: "07.22.2027",
    name: "Test Zeta",
    tag: "Unassigned",
    tagColor: "text-foreground", // Gray border and text
  },
  {
    id: "7",
    date: "07.22.2027",
    name: "Test Zeta",
    tag: "Unassigned",
    tagColor: "text-foreground", // Gray border and text
  },
  {
    id: "8",
    date: "07.30.2027",
    name: "Insight Pro",
    tag: "Data Analytics Tool",
    tagColor: "text-foreground", // Blue border and text
  },
  {
    id: "9",
    date: "05.30.2027",
    name: "Operation Theta",
    tag: "Unassigned",
    tagColor: "text-foreground", // Gray border and text
  },
];

export function RecentPageContent() {
  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Top Bar */}
      <PageTopBar title="Recent" />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-5 gap-6 max-w-full mx-auto">
          {recentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {/* Empty slot to match design */}
          <div className="w-full h-48"></div>
        </div>
      </div>
    </div>
  );
}
