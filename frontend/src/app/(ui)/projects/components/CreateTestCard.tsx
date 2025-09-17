

"use client";

import { ProjectResponse } from "@/apiClient";
import { CreateTestWizard } from "@/shared/components/CreateTestWizard";
// import { TestResponse } from "@/apiClient";
import { FolderOpenIcon } from "@/shared/components/icons";
import { CreativeCommonsIcon } from "lucide-react";
import { useState } from "react";

interface Test {
  id: string;
  date: string;
  name: string;
  tag: string;
  tagColor: string;
}

interface TestCardProps {
  project: ProjectResponse;
}

export function CreateTestCard({ project }: TestCardProps) {
  console.log(project)
  const [isCreateTestWizardOpen, setIsCreateTestWizardOpen] = useState(false);

  return (
   <> <div className="hover:bg-accent transition-colors cursor-pointer flex flex-col justify-center items-center" onClick={()=>setIsCreateTestWizardOpen(true)} role="button">
        {/* Create New Project Card */}
        {/* <CreateProjectIcon className="w-full h-full max-w-[200px] max-h-[200px]" />
         */}
         <p><CreativeCommonsIcon/> Create Test Icon</p>
      
        
      </div>
       <CreateTestWizard
        open={isCreateTestWizardOpen}
        onOpenChange={setIsCreateTestWizardOpen}
        // onCreateProject={()=>{
        //   console.log("Create Project Api Call")
        // }}
      />
      </>
  );
}
