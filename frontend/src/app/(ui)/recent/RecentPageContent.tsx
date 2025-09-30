

"use client";

import { ProjectResponse } from "@/apiClient/models/project-response";
import { ProjectCard } from "./components/ProjectCard";
import { AllProjectsCard } from "../projects/components/AllProjectsCard";
import { Search, Filter, ArrowUpDown, Brain, FileText } from "lucide-react";
import { TrashIcon } from "@/shared/components/icons/TrashIcon";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CreateTestWizard } from "@/shared/components/CreateTestWizard";
import { useState, useMemo } from "react";

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
  // Additional projects for better filtering
  {
    id: "10",
    date: "08.15.2027",
    name: "Live Dashboard",
    tag: "Active Monitoring",
    tagColor: "text-foreground",
  },
  {
    id: "11",
    date: "08.20.2027",
    name: "Planning Module",
    tag: "Project Planner",
    tagColor: "text-foreground",
  },
  {
    id: "12",
    date: "08.25.2027",
    name: "Data Analysis Tool",
    tag: "Analytics Platform",
    tagColor: "text-foreground",
  },
  {
    id: "13",
    date: "09.01.2027",
    name: "Running System",
    tag: "Live Operations",
    tagColor: "text-foreground",
  },
  {
    id: "14",
    date: "09.05.2027",
    name: "Beta Testing Suite",
    tag: "Planning Phase",
    tagColor: "text-foreground",
  },
  {
    id: "15",
    date: "09.10.2027",
    name: "Insight Analytics",
    tag: "Data Insights",
    tagColor: "text-foreground",
  },
];

type FilterType = 'live' | 'planner' | 'analysis' | 'report';

export function RecentPageContent({projectData}:{projectData:ProjectResponse[]}) {
  console.log(projectData)
  const [isCreateTestWizardOpen, setIsCreateTestWizardOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterType[]>([]);

  // Toggle filter function
  const toggleFilter = (filter: FilterType) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Filter the project data based on active filters
  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) {
      return projectData;
    }
    
    // Filter based on project title, subtitle, or test properties
    return projectData.filter(project => {
      const title = project.title?.toLowerCase() || '';
      const subtitle = project.subtitle?.toLowerCase() || '';
      const hasTests = project.tests && project.tests.length > 0;
      
      return activeFilters.some(filter => {
        switch (filter) {
          case 'live':
            return title.includes('live') || subtitle.includes('live') || 
                   title.includes('active') || subtitle.includes('active') ||
                   title.includes('running') || subtitle.includes('running');
          case 'planner':
            return title.includes('planner') || subtitle.includes('planner') || 
                   title.includes('planning') || subtitle.includes('planning') ||
                   title.includes('beta') || subtitle.includes('beta') ||
                   title.includes('revamp') || subtitle.includes('revamp') ||
                   title.includes('nextgen') || subtitle.includes('nextgen');
          case 'analysis':
            return title.includes('analysis') || subtitle.includes('analysis') || 
                   title.includes('analytics') || subtitle.includes('analytics') ||
                   title.includes('data') || subtitle.includes('data') ||
                   title.includes('insight') || subtitle.includes('insight') ||
                   title.includes('pro') || subtitle.includes('pro');
          case 'report':
            return title.includes('report') || subtitle.includes('report') || 
                   title.includes('campaign') || subtitle.includes('campaign') ||
                   title.includes('launch') || subtitle.includes('launch') ||
                   hasTests; // Projects with tests might be report-ready
          default:
            return true;
        }
      });
    });
  }, [projectData, activeFilters]);
  
  return (
    <div className="flex flex-col h-full w-full bg-background">
      {/* Header */}
      <div className="header-bar flex items-center justify-between p-6 border-b border-border bg-sidebar">
        {/* Left side - Title */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-foreground">Recent</h1>
        </div>

        {/* Right side - Search, Controls, and Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search"
              className="pl-10 w-80 h-8 bg-white dark:bg-gray-800"
            />
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <ArrowUpDown className="h-4 w-4" />
          </Button>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 h-8 px-3"
            >
              <Brain className="h-4 w-4" />
              New Simulation
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 h-8 px-3"
              onClick={() => setIsCreateTestWizardOpen(true)}
            >
              <FileText className="h-4 w-4" />
              New Test
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="tabs-section px-6 py-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setActiveFilters([])}
              className={`h-7 text-sm font-medium rounded-xs ${
                activeFilters.length === 0 
                  ? 'border-1 border-primary text-primary' 
                  : 'border-1 border-gray-300 text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleFilter('live')}
              className={`h-7 text-sm font-medium rounded-xs ${
                activeFilters.includes('live') 
                  ? 'border-1 border-primary text-primary' 
                  : 'border-1 border-gray-300 text-muted-foreground hover:text-foreground'
              }`}
            >
              Live
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleFilter('planner')}
              className={`h-7 text-sm font-medium rounded-xs ${
                activeFilters.includes('planner') 
                  ? 'border-1 border-primary text-primary' 
                  : 'border-1 border-gray-300 text-muted-foreground hover:text-foreground'
              }`}
            >
              Planner
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleFilter('analysis')}
              className={`h-7 text-sm font-medium rounded-xs ${
                activeFilters.includes('analysis') 
                  ? 'border-1 border-primary text-primary' 
                  : 'border-1 border-gray-300 text-muted-foreground hover:text-foreground'
              }`}
            >
              Analysis
            </Button>
            <Button
              variant="ghost"
              onClick={() => toggleFilter('report')}
              className={`h-7 text-sm font-medium rounded-xs ${
                activeFilters.includes('report') 
                  ? 'border-1 border-primary text-primary' 
                  : 'border-1 border-gray-300 text-muted-foreground hover:text-foreground'
              }`}
            >
              Report
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0 ml-auto"
              onClick={() => setActiveFilters([])}
            >
              <TrashIcon className="h-7 w-7" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="main-content-area flex-1 px-6 pb-6">
        <div className="project-cards-grid grid grid-cols-4 gap-6 max-w-full mx-auto">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          {/* Always show the Create a new test card */}
          <AllProjectsCard project={{} as any} isCreateNew={true} />
        </div>
      </div>

      {/* Create Test Wizard */}
      <CreateTestWizard
        open={isCreateTestWizardOpen}
        onOpenChange={setIsCreateTestWizardOpen}
      />
    </div>
  );
}
