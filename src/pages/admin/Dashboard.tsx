import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { 
  Settings, 
  Briefcase, 
  BookOpen, 
  Code, 
  LogOut, 
  Plus, 
  Trash2, 
  Save,
  Loader2
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { type Experience, type Education, type Project, type Skill } from "@/db/schema";

interface PortfolioData {
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  settings: Record<string, string>;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  const { data, isLoading, error } = useQuery<PortfolioData>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      return res.json();
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Record<string, string | string[] | boolean | number>) => {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(settings),
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Settings updated!");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const crudMutation = useMutation({
    mutationFn: async ({ entity, method, id, body }: { entity: string, method: string, id?: number, body?: Record<string, string | string[] | boolean | number> }) => {
      const url = `/api/admin/${entity}${id ? `/${id}` : ""}`;
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Change saved!");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
    onError: () => toast.error("Action failed"),
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  const [editingItem, setEditingItem] = useState<{ type: string, item: Experience | Project | Education | Skill } | null>(null);

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent italic">
            Portfolio Admin
          </h1>
          <Button variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-6xl">
        <Tabs defaultValue="settings" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-transparent h-auto">
            <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="experiences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Code className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <BookOpen className="w-4 h-4 mr-2" />
              Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Plus className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Site Settings */}
          <TabsContent value="settings">
            <Card className="backdrop-blur-glass bg-card/80 border-border">
              <CardHeader>
                <CardTitle>General Site Settings</CardTitle>
                <CardDescription>Update your personal info, hero section, and contact details.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const settings = Object.fromEntries(formData.entries()) as Record<string, string>;
                  updateSettingsMutation.mutate(settings);
                }} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hero Name</label>
                      <Input name="hero_name" defaultValue={data?.settings?.hero_name} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hero Subtitle</label>
                      <Input name="hero_subtitle" defaultValue={data?.settings?.hero_subtitle} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hero Tagline</label>
                    <Textarea name="hero_tagline" defaultValue={data?.settings?.hero_tagline} />
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input name="location" defaultValue={data?.settings?.location} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone</label>
                      <Input name="phone" defaultValue={data?.settings?.phone} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input name="email" defaultValue={data?.settings?.email} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">About Me (Part 1)</label>
                    <Textarea name="about_me_1" defaultValue={data?.settings?.about_me_1} />
                  </div>
                  <Button type="submit" disabled={updateSettingsMutation.isPending} className="w-full h-12">
                    {updateSettingsMutation.isPending ? "Saving..." : "Save Settings"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiences */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader>
                  <CardTitle>Add Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const body = Object.fromEntries(formData.entries()) as Record<string, string>;
                    // Convert achievements/responsibilities strings to JSON arrays
                    const formattedBody = {
                      ...body,
                      achievements: (body.achievements as string).split("\n"),
                      responsibilities: (body.responsibilities as string).split("\n"),
                      technologies: (body.technologies as string).split(","),
                      current: body.current === "on"
                    };
                    crudMutation.mutate({ entity: "experiences", method: "POST", body: formattedBody as Record<string, string | string[] | boolean | number> });
                    e.currentTarget.reset();
                  }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="company" placeholder="Company Name" required />
                      <Input name="position" placeholder="Position" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="date" placeholder="Date (e.g. 2024 - Present)" required />
                      <Input name="location" placeholder="Location" required />
                    </div>
                    <Textarea name="achievements" placeholder="Achievements (one per line)" />
                    <Textarea name="responsibilities" placeholder="Responsibilities (one per line)" />
                    <Input name="technologies" placeholder="Technologies (comma separated)" />
                    <Button type="submit" className="w-full">Add Experience</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {data?.experiences.map((exp) => (
                  <Card key={exp.id} className="bg-card/50 border-border group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">{exp.company}</CardTitle>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "experiences", method: "DELETE", id: exp.id })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{exp.position} | {exp.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Projects */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader>
                  <CardTitle>Add Project</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const body = Object.fromEntries(formData.entries()) as Record<string, string>;
                    const formattedBody = {
                      ...body,
                      technologies: (body.technologies as string).split(","),
                      featured: body.featured === "on"
                    };
                    crudMutation.mutate({ entity: "projects", method: "POST", body: formattedBody as Record<string, string | string[] | boolean | number> });
                    e.currentTarget.reset();
                  }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="title" placeholder="Project Title" required />
                      <Input name="icon" placeholder="Icon (Code, Database, Globe)" />
                    </div>
                    <Textarea name="description" placeholder="Description" required />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="github" placeholder="GitHub URL" />
                      <Input name="demo" placeholder="Demo URL" />
                    </div>
                    <Input name="technologies" placeholder="Technologies (comma separated)" />
                    <Button type="submit" className="w-full">Add Project</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {data?.projects.map((proj) => (
                  <Card key={proj.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">{proj.title}</CardTitle>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "projects", method: "DELETE", id: proj.id })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Education */}
          <TabsContent value="education">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader>
                  <CardTitle>Add Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const body = Object.fromEntries(formData.entries()) as Record<string, string>;
                    crudMutation.mutate({ entity: "education", method: "POST", body: { ...body, current: body.current === "on" } as Record<string, string | string[] | boolean | number> });
                    e.currentTarget.reset();
                  }} className="space-y-4">
                    <Input name="institution" placeholder="Institution" required />
                    <Input name="degree" placeholder="Degree" required />
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="date" placeholder="Date" required />
                      <Input name="grade" placeholder="Grade/CGPA" />
                    </div>
                    <Button type="submit" className="w-full">Add Education</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {data?.education.map((edu) => (
                  <Card key={edu.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg">{edu.institution}</CardTitle>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "education", method: "DELETE", id: edu.id })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{edu.degree} | {edu.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Skills */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader>
                  <CardTitle>Add Skill</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const body = Object.fromEntries(formData.entries()) as Record<string, string>;
                    crudMutation.mutate({ entity: "skills", method: "POST", body: { ...body, level: parseInt(body.level as string) } as Record<string, string | string[] | boolean | number> });
                    e.currentTarget.reset();
                  }} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="name" placeholder="Skill Name" required />
                      <Input name="category" placeholder="Category" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input name="level" type="number" placeholder="Level (0-100)" required />
                      <Input name="icon" placeholder="Icon Name" />
                    </div>
                    <Button type="submit" className="w-full">Add Skill</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-3 gap-6">
                {data?.skills.map((skill) => (
                  <Card key={skill.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-bold">{skill.name}</CardTitle>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "skills", method: "DELETE", id: skill.id })}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{skill.category} | {skill.level}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
