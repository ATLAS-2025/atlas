

"use client";

import { useState } from "react";
import { Grid3X3, List, Search, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { CreateProjectModal } from "./CreateProjectModal";
import { CreateTestWizard } from "./CreateTestWizard";

interface PageTopBarProps {
  title: string;
  onViewChange?: (view: "grid" | "list") => void;
  currentView?: "grid" | "list";
  onSearch?: (query: string) => void;
  onCreateProject?: (projectName: string) => void;
  onCreateTest?: (testData: any) => void;
  isProject?:boolean
}

export function PageTopBar({
  title,
  onViewChange,
  currentView = "grid",
  onSearch,
  onCreateProject,
  onCreateTest,
  isProject = false
}: PageTopBarProps) {
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isCreateTestWizardOpen, setIsCreateTestWizardOpen] = useState(false);
  return (
    <div className="flex items-center justify-between p-6 border-b border-border">
      {/* Left side - Title and View Controls */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 w-8 p-0 ${
              currentView === "grid"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : ""
            }`}
            onClick={() => onViewChange?.("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 w-8 p-0 ${
              currentView === "list"
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : ""
            }`}
            onClick={() => onViewChange?.("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Center - Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-10 w-80 h-8"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>

      {/* Right side - Create Buttons */}
    <div className="flex items-center gap-3">
          {isProject ? <Button
          className="flex items-center gap-2 h-8 px-3 bg-primary hover:bg-primary/90"
          onClick={() => setIsCreateTestWizardOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Create a New Test
        </Button>: <Button
          variant="outline"
          className="flex items-center gap-2 h-8 px-3"
          onClick={() => setIsCreateProjectModalOpen(true)}
        >
          <FolderPlus className="h-4 w-4" />
          Create a New Project
        </Button>}
       
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={isCreateProjectModalOpen}
        onOpenChange={setIsCreateProjectModalOpen}
        onCreateProject={onCreateProject}
      />

      {/* Create Test Wizard */}
      <CreateTestWizard
        open={isCreateTestWizardOpen}
        onOpenChange={setIsCreateTestWizardOpen}
        onCreateTest={onCreateTest}
      />
    </div>
  );
}
