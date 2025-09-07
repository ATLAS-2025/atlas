

"use client";

import { DirectoryIcon } from "@/shared/components/icons/DirectoryIcon";
import { CreateProjectIcon } from "@/shared/components/icons/CreateProjectIcon";

interface AllProjectsProject {
  id: string;
  name: string;
  lastTest: string;
  testCount: number;
  color: "purple" | "teal" | "orange" | "gray";
}

interface AllProjectsCardProps {
  project: AllProjectsProject;
  isCreateNew?: boolean;
}

export function AllProjectsCard({ project, isCreateNew = false }: AllProjectsCardProps) {
  if (isCreateNew) {
    return (
      <div className="hover:bg-accent transition-colors cursor-pointer flex flex-col justify-center items-center">
        {/* Create New Project Card */}
        <CreateProjectIcon className="w-full h-full max-w-[200px] max-h-[200px]" />
      </div>
    );
  }

  return (
    <div className="hover:bg-accent transition-colors cursor-pointer flex flex-col justify-center items-center">
      {/* Directory Icon with integrated text */}
      <DirectoryIcon 
        className="w-full h-full max-w-[200px] max-h-[200px]" 
        color={project.color}
        testCount={project.testCount}
        lastTest={project.lastTest}
        projectName={project.name}
      />
    </div>
  );
}
