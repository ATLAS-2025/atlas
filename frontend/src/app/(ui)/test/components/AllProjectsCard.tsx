

"use client";

import { DirectoryIcon } from "@/shared/components/icons/DirectoryIcon";
import { CreateProjectIcon } from "@/shared/components/icons/CreateProjectIcon";
import { CreateProjectModal } from "@/shared/components/CreateProjectModal";
import { useState } from "react";
import { ProjectResponse } from "@/apiClient";
import Link from "next/link";



interface AllProjectsCardProps {
  project: ProjectResponse;
  isCreateNew?: boolean;
}

export function AllProjectsCard({ project, isCreateNew = false, }: AllProjectsCardProps) {

    const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState<boolean>(false);


  if (isCreateNew) {
    return (
      <>
      <div className="hover:bg-accent transition-colors cursor-pointer flex flex-col justify-center items-center" onClick={()=>setIsCreateProjectModalOpen(true)} role="button">
        {/* Create New Project Card */}
        <CreateProjectIcon className="w-full h-full max-w-[200px] max-h-[200px]" />
      
        
      </div>
       <CreateProjectModal
        open={isCreateProjectModalOpen}
        onOpenChange={setIsCreateProjectModalOpen}
        // onCreateProject={()=>{
        //   console.log("Create Project Api Call")
        // }}
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
