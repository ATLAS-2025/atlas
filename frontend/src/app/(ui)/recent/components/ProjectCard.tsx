/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { FolderOpenIcon } from "@/shared/components/icons";

interface Project {
  id: string;
  date: string;
  name: string;
  tag: string;
  tagColor: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div
      className="hover:bg-accent transition-colors cursor-pointer h-48 flex flex-col justify-between rounded-lg"
      style={{
        gap: "0.25rem",
        background:
          "var(--bg-gradient2, linear-gradient(176deg, rgba(68, 68, 86, 0.20) 0%, rgba(16, 16, 23, 0.20) 100%))",
        boxShadow:
          "0 56px 16px 0 rgba(0, 0, 0, 0.00), 0 36px 14px 0 rgba(0, 0, 0, 0.03), 0 20px 12px 0 rgba(0, 0, 0, 0.09), 0 9px 9px 0 rgba(0, 0, 0, 0.16), 0 2px 5px 0 rgba(0, 0, 0, 0.19)",
        padding: "0.25rem",
      }}
    >
      {/* Folder Icon */}
      <div className="flex justify-center bg-card flex-grow rounded-lg">
        <div className="flex items-center justify-center">
          <FolderOpenIcon className="h-10 w-10 text-muted-foreground" />
        </div>
      </div>

      {/* Content wrapper */}
      <div className="bg-card rounded-lg flex justify-between flex-shrink items-start p-[0.375rem]">
        <div className="flex flex-col">
          {/* Date */}
          <div className="text-sm text-muted-foreground mb-2">
            {project.date}
          </div>

          {/* Project Name */}
          <div className="text-sm font-medium text-foreground flex-1">
            {project.name}
          </div>
        </div>

        {/* Tag */}
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center px-0.5 px-1 rounded-full text-xs font-medium border bg-transparent ${project.tagColor}`}
          >
            {project.tag}
          </span>
        </div>
      </div>
    </div>
  );
}
