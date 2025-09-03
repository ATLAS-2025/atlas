/*
 * Copyright (c) 2025. Sayat Raykul
 */

"use client";

import { Grid3X3, List, Search, Plus, FolderPlus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

export function RecentTopBar() {
  return (
    <div className="flex items-center justify-between p-6 border-b border-border">
      {/* Left side - Title and View Controls */}
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-semibold text-foreground">Recent</h1>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-10 w-64 h-8" />
        </div>
      </div>

      {/* Right side - Create Buttons */}
      <div className="flex items-center gap-3">
        <Button variant="outline" className="flex items-center gap-2 h-8 px-3">
          <FolderPlus className="h-4 w-4" />
          Create a New Project
        </Button>
        <Button className="flex items-center gap-2 h-8 px-3 bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Create a New Test
        </Button>
      </div>
    </div>
  );
}
