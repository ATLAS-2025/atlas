

"use client";

import { DirectoryIcon } from "@/shared/components/icons/DirectoryIcon";
import { CreateProjectIcon } from "@/shared/components/icons/CreateProjectIcon";
import { CreateProjectModal } from "@/shared/components/CreateProjectModal";
import { CreateTestWizard } from "@/shared/components/CreateTestWizard";
import { useState } from "react";
import { ProjectResponse } from "@/apiClient";
import Link from "next/link";
import { Plus } from "lucide-react";

interface AllProjectsCardProps {
  project: ProjectResponse;
  isCreateNew?: boolean;
}

export function AllProjectsCard({ project, isCreateNew = false, }: AllProjectsCardProps) {

    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false);
    const [isCreateTestWizardOpen, setIsCreateTestWizardOpen] = useState<boolean>(false);

  if (isCreateNew) {
    return (
      <>
        <div
          className="create-test-card bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-center items-center p-8"
          onClick={() => setIsCreateTestWizardOpen(true)}
          role="button"
        >
          {/* Create New Test Card */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="h-8 w-8 text-gray-600" />
            </div>
            <span className="text-gray-600 dark:text-gray-400 font-medium">Create a new test</span>
          </div>
        </div>

        <CreateTestWizard
          open={isCreateTestWizardOpen}
          onOpenChange={setIsCreateTestWizardOpen}
          project={project}
        />
      </>
    );
  }

  return (
    <Link href={`/projects/${project.id}`} className="hover:bg-accent transition-colors cursor-pointer flex flex-col justify-center items-center">
      {/* Directory Icon with integrated text */}
      <DirectoryIcon 
        className="w-full h-full max-w-[200px] max-h-[200px]" 
        color={"purple"}
        testCount={project.tests?.length}
        // lastTest={project.tests[0]|| {}}
        projectName={project.title}
      />
    </Link>
  );
}
