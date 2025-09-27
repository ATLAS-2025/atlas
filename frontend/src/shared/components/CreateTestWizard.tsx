

"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Badge } from "@/shared/components/ui/badge";
import { Calendar } from "@/shared/components/ui/calendar";
import { CategoryResponse, EquipmentResponse, PeopleResponse, ProjectResponse } from "@/apiClient";
interface CreateTestWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTest?: (testData: any) => void;  equiqments?: EquipmentResponse[]
  categories?: CategoryResponse[]
  peoples?: PeopleResponse[]
  project?:ProjectResponse
}

const tabs = [
  { id: "admin", label: "Admin" },
  { id: "resources", label: "Resources" },
  { id: "subject-profile", label: "Subject Profile" },
  { id: "measurement-equipment", label: "Measurement Equipment" },
  { id: "schedule", label: "Schedule" },
  { id: "test-layout", label: "Test layout & Simulation" },
  { id: "documents", label: "Documents & Instructions" },
  { id: "test-summary", label: "Test Summary" },
];

export function CreateTestWizard({
  open,
  onOpenChange,
  onCreateTest,  equiqments,
categories,
peoples,project
}: CreateTestWizardProps) {
  const [activeTab, setActiveTab] = useState("admin");
  const [testData, setTestData] = useState({
    testName: "Drop Test Project",
    projectName: project?.title,
    tags: ["#tag1", "#tag2", "#UAV", "#6Dof", "#Flight", "#Droptest", "#Balistics"],
    testLocation: "Test Location",
    subLocation: "",
    subjectType: "Example",
    subjectId: "",
    safetyLevels: ["level 1", "level 4"],
    clearances: ["level 2", "level 3", "level 5"],
    primaryDate: new Date(),
    optionalDate: null,
    description: "",
  });

  if (!open) return null;

  const renderAdminTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Test Setup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Test Setup</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="test-name" className="text-sm text-foreground">Test name</Label>
                <Input
                  id="test-name"
                  value={testData.testName}
                  onChange={(e) => setTestData({...testData, testName: e.target.value})}
                  className="bg-background border-border text-foreground"
                />
              </div>
              <div>
                <Label htmlFor="project-name" className="text-sm text-foreground">Project Name</Label>
                <div className="flex gap-2">
                  <Input
                    id="project-name"
                    value={testData.projectName}
                    onChange={(e) => setTestData({...testData, projectName: e.target.value})}
                    className="bg-background border-border text-foreground"
                  />
                  <Button variant="outline" size="sm">Add new</Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground">Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {testData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
                      {tag}
                      {index < 2 && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Project Leaders */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Project Leaders</h3>
            <div className="space-y-3">
              {["Project Leader", "Test Engineer/Operator", "Safety Officer", "Support Teams"].map((role, index) => (
                <div key={index} className="flex gap-2">
                  <Input placeholder="Name" className="bg-background border-border text-foreground" />
                  <Input value={role} className="bg-background border-border text-foreground" />
                </div>
              ))}
              <div className="flex justify-end">
                <Button variant="outline" size="sm" className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Location */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Location</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="test-location" className="text-sm text-foreground">Test location / Range</Label>
                <div className="flex gap-2">
                  <Input
                    id="test-location"
                    placeholder="Test Location"
                    className="bg-background border-border text-foreground"
                  />
                  <Button variant="outline" size="sm">Add new</Button>
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground">Sub-Location</Label>
                <div className="space-y-2 mt-2">
                  {["The Traveler's Shield", "The Adventure Pack", "The Explorer's Case", "The Guardian Case"].map((item, index) => (
                    <div key={index} className="text-sm text-muted-foreground">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Test Subject */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Test Subject</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="subject-type" className="text-sm text-foreground">Subject type (UAV model/Radar type)</Label>
                <div className="flex gap-2">
                  <Input
                    id="subject-type"
                    placeholder="Example"
                    className="bg-background border-border text-foreground"
                  />
                  <Button variant="outline" size="sm">Add new</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="subject-id" className="text-sm text-foreground">Subject ID</Label>
                <Input
                  id="subject-id"
                  placeholder="ID number/name"
                  className="bg-background border-border text-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Safety & Compliance */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Safety & Compliance</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-foreground">Safety Level / Classification (Low, Medium, High)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {testData.safetyLevels.map((level, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
                      {level}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-sm text-foreground">Clearances / Permits Required</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {testData.clearances.map((clearance, index) => (
                    <Badge key={index} variant="secondary" className="bg-primary/20 text-primary">
                      {clearance}
                      {index === 1 && <X className="ml-1 h-3 w-3" />}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Timeline</h3>
            <div className="space-y-3">
              <div>
                <Label className="text-sm text-foreground">Primary Date</Label>
                <Calendar className="bg-background border-border" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <Label className="text-sm text-foreground">Optional date</Label>
                </div>
                <Calendar className="bg-background border-border mt-2" />
              </div>
            </div>
          </div>

          {/* Test Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Test Description</h3>
            <Textarea
              placeholder="Free Text"
              className="bg-background border-border text-foreground min-h-[100px]"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Manage Resources</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground">People</Button>
            <Button variant="outline" size="sm">Facilities</Button>
            <Button variant="outline" size="sm">Logistics</Button>
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Search" className="w-64" />
            <Button variant="outline" size="sm">Filter</Button>
            <Button variant="outline" size="sm">Sort</Button>
          </div>
          <div className="text-sm text-muted-foreground">Total People 46</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Panel - People List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">People</h3>
          <Input placeholder="Search people" className="w-full" />
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Untitled</div>
            <div className="text-sm text-muted-foreground">HS Cameras</div>
            <div className="pl-4 space-y-1">
              <div className="text-sm text-foreground bg-primary/20 px-2 py-1 rounded">Ohad Zangi - Motiontech</div>
              <div className="text-sm text-muted-foreground">Denis Itkin - Motiontech</div>
              <div className="text-sm text-muted-foreground">Barak Alkobi - Motiontech</div>
              <div className="text-sm text-muted-foreground">Alon Michaeli - Motiontech</div>
              <div className="text-sm text-muted-foreground">Lior Katz - Motiontech</div>
              <div className="text-sm text-muted-foreground">Ohad Mitrani - Motiontech</div>
              <div className="text-sm text-muted-foreground">Dianne Russell - [AI]</div>
              <div className="text-sm text-muted-foreground">Cameron Williamson - [AI]</div>
              <div className="text-sm text-muted-foreground">Theresa Webb - [AI]</div>
            </div>
            <div className="text-sm text-muted-foreground">DAQ</div>
            <div className="pl-4 space-y-1">
              <div className="text-sm text-foreground">Lila Chen - DesignHub</div>
              <div className="text-sm text-muted-foreground">Ravi Patel - InnovateX</div>
              <div className="text-sm text-muted-foreground">Sofia Kim - CreativePulse</div>
              <div className="text-sm text-muted-foreground">Jasmine Chen - DesignHub</div>
              <div className="text-sm text-muted-foreground">Raj Patel - InnovateX</div>
            </div>
            <div className="text-sm text-muted-foreground">Radar</div>
            <div className="pl-4 space-y-1">
              <div className="text-sm text-muted-foreground">Omar Patel - CreativeWorks</div>
              <div className="text-sm text-muted-foreground">Ava Gomez - Innovate Studio</div>
              <div className="text-sm text-muted-foreground">Rajesh Kumar - Pixel Artistry</div>
              <div className="text-sm text-muted-foreground">Sofia Martinez - Visionary Designs</div>
              <div className="text-sm text-muted-foreground">Ethan Lee - NextGen Creatives</div>
            </div>
          </div>
        </div>

        {/* Middle Panel - Resource Categories */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Recent Categories</span>
            <div className="flex gap-1">
              <Badge variant="secondary" className="text-xs bg-primary/20 text-primary">Engineer</Badge>
              <Badge variant="secondary" className="text-xs">System Architect</Badge>
              <Badge variant="secondary" className="text-xs">Telemetry</Badge>
              <Badge variant="secondary" className="text-xs">Validation</Badge>
              <Badge variant="secondary" className="text-xs">Finance</Badge>
              <Badge variant="secondary" className="text-xs">Security</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Total People 0</span>
            <div className="w-4 h-4 bg-muted rounded"></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-4 flex items-center justify-center">
                <X className="h-8 w-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Contact Details */}
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground">Contact Details</Button>
            <Button variant="outline" size="sm">Add Person</Button>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-foreground">Primary</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <X className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">Add a photo</Button>
            
            <div>
              <Label className="text-sm text-foreground">Class Category</Label>
              <div className="flex items-center gap-2 mt-2">
                <Input placeholder="Search for categories" className="bg-background border-border flex-1" />
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  High Speed Cameras
                  <X className="ml-1 h-3 w-3" />
                </Badge>
                <Badge variant="secondary" className="bg-primary/20 text-primary">
                  DAQ
                  <X className="ml-1 h-3 w-3" />
                </Badge>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                <Button variant="outline" size="sm" className="text-xs">UAV</Button>
                <Button variant="outline" size="sm" className="text-xs">Flight</Button>
                <Button variant="outline" size="sm" className="text-xs">Product Manager</Button>
                <Button variant="outline" size="sm" className="text-xs">Safety</Button>
                <Button variant="outline" size="sm" className="text-xs">Radar</Button>
                <Button variant="outline" size="sm" className="text-xs">Logistics</Button>
                <Button variant="outline" size="sm" className="text-xs">Navigation</Button>
                <Button variant="outline" size="sm" className="text-xs">Control</Button>
              </div>
            </div>

            <div>
              <Label className="text-sm text-foreground">Secondary</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
                <Input placeholder="Name" className="bg-background border-border" />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Upload vCard</Button>
              <Button variant="outline" size="sm" className="flex-1">Upload CSV</Button>
              <Button variant="outline" size="sm" className="flex-1">Clear</Button>
            </div>
            <Button className="w-full bg-primary text-primary-foreground">Add the Contact</Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "admin":
        return renderAdminTab();
      case "resources":
        return renderResourcesTab();
      default:
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h3>
              <p className="text-muted-foreground">This tab is under development</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">Untitled test</span>
            <X className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Main Navigation Tabs */}
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={activeTab === tab.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Button className="bg-primary text-primary-foreground">Publish</Button>
          <span className="text-sm text-muted-foreground">v - 0.128</span>
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar - Only show for Resources tab */}
        {activeTab === "resources" && (
          <div className="w-64 border-r border-border p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Manage Resources</h3>
            <div className="space-y-2">
              <Button variant="default" className="w-full justify-start bg-primary text-primary-foreground">People</Button>
              <Button variant="ghost" className="w-full justify-start">Facilities</Button>
              <Button variant="ghost" className="w-full justify-start">Logistics</Button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderTabContent()}
           <pre>Availabe People: {JSON.stringify(peoples)}</pre>
      <pre>Availabe Equipments: {JSON.stringify(equiqments)}</pre>
      <pre>Availabe Categories: {JSON.stringify(categories)}</pre>
        </div>
      </div>

     
    </div>
  );
}
