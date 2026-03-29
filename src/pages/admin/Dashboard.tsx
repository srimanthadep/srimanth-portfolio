/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Settings, 
  Briefcase, 
  BookOpen, 
  Code, 
  LogOut, 
  Plus, 
  Trash2, 
  Pencil,
  Save,
  Loader2,
  X
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { type Experience, type Education, type Project, type Skill } from "../../types/portfolio";

interface PortfolioData {
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  settings: Record<string, string>;
}

type EditTarget =
  | { type: "experience"; item: Experience }
  | { type: "project"; item: Project }
  | { type: "education"; item: Education }
  | { type: "skill"; item: Skill }
  | null;

function arr(val: string | string[] | undefined): string {
  if (!val) return "";
  return Array.isArray(val) ? val.join("\n") : val;
}

function csv(val: string | string[] | undefined): string {
  if (!val) return "";
  return Array.isArray(val) ? val.join(", ") : val;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("admin_token");
  const [editTarget, setEditTarget] = useState<EditTarget>(null);

  useEffect(() => {
    if (!token) navigate("/admin/login");
  }, [token, navigate]);

  const { data, isLoading, error } = useQuery<PortfolioData>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to load portfolio data");
      }
      return res.json();
    },
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Record<string, string | string[] | boolean | number>) => {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
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
    mutationFn: async ({ entity, method, id, body }: {
      entity: string; method: string; id?: string | number; body?: Record<string, string | string[] | boolean | number>;
    }) => {
      const url = `/api/admin/${entity}${id ? `/${id}` : ""}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: body ? JSON.stringify(body) : undefined,
      });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Saved!");
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      setEditTarget(null);
    },
    onError: () => toast.error("Action failed"),
  });

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  // --- Shared Edit Modal ---
  const renderEditModal = () => {
    if (!editTarget) return null;

    const handleClose = () => setEditTarget(null);

    if (editTarget.type === "experience") {
      const exp = editTarget.item;
      return (
        <Dialog open onOpenChange={handleClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Experience</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const body = Object.fromEntries(fd.entries()) as Record<string, string>;
              crudMutation.mutate({
                entity: "experiences", method: "PUT", id: exp.id,
                body: {
                  ...body,
                  achievements: body.achievements.split("\n").filter(Boolean),
                  responsibilities: body.responsibilities.split("\n").filter(Boolean),
                  technologies: body.technologies.split(",").map(s => s.trim()).filter(Boolean),
                  current: body.current === "on",
                } as Record<string, string | string[] | boolean | number>,
              });
            }} className="space-y-4 pt-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">Company</label><Input name="company" defaultValue={exp.company} required /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Position</label><Input name="position" defaultValue={exp.position} required /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">Date</label><Input name="date" defaultValue={exp.date} required /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Location</label><Input name="location" defaultValue={(exp as any).location} /></div>
              </div>
              <div className="space-y-1"><label className="text-xs font-medium">Achievements (one per line)</label><Textarea name="achievements" defaultValue={arr((exp as any).achievements)} rows={4} /></div>
              <div className="space-y-1"><label className="text-xs font-medium">Responsibilities (one per line)</label><Textarea name="responsibilities" defaultValue={arr((exp as any).responsibilities)} rows={4} /></div>
              <div className="space-y-1"><label className="text-xs font-medium">Technologies (comma separated)</label><Input name="technologies" defaultValue={csv((exp as any).technologies)} /></div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}><X className="w-4 h-4 mr-1" />Cancel</Button>
                <Button type="submit" disabled={crudMutation.isPending}><Save className="w-4 h-4 mr-1" />{crudMutation.isPending ? "Saving..." : "Save Changes"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    }

    if (editTarget.type === "project") {
      const proj = editTarget.item;
      return (
        <Dialog open onOpenChange={handleClose}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const body = Object.fromEntries(fd.entries()) as Record<string, string>;
              crudMutation.mutate({
                entity: "projects", method: "PUT", id: proj.id,
                body: {
                  ...body,
                  technologies: body.technologies.split(",").map(s => s.trim()).filter(Boolean),
                  featured: body.featured === "on",
                } as Record<string, string | string[] | boolean | number>,
              });
            }} className="space-y-4 pt-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">Title</label><Input name="title" defaultValue={proj.title} required /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Icon (Code, Database, Globe)</label><Input name="icon" defaultValue={(proj as any).icon} /></div>
              </div>
              <div className="space-y-1"><label className="text-xs font-medium">Description</label><Textarea name="description" defaultValue={proj.description} required rows={3} /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">GitHub URL</label><Input name="github" defaultValue={(proj as any).github} /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Demo URL</label><Input name="demo" defaultValue={(proj as any).demo} /></div>
              </div>
              <div className="space-y-1"><label className="text-xs font-medium">Technologies (comma separated)</label><Input name="technologies" defaultValue={csv((proj as any).technologies)} /></div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}><X className="w-4 h-4 mr-1" />Cancel</Button>
                <Button type="submit" disabled={crudMutation.isPending}><Save className="w-4 h-4 mr-1" />{crudMutation.isPending ? "Saving..." : "Save Changes"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    }

    if (editTarget.type === "education") {
      const edu = editTarget.item;
      return (
        <Dialog open onOpenChange={handleClose}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Education</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const body = Object.fromEntries(fd.entries()) as Record<string, string>;
              crudMutation.mutate({
                entity: "education", method: "PUT", id: edu.id,
                body: { ...body, current: body.current === "on" } as Record<string, string | string[] | boolean | number>,
              });
            }} className="space-y-4 pt-2">
              <div className="space-y-1"><label className="text-xs font-medium">Institution</label><Input name="institution" defaultValue={edu.institution} required /></div>
              <div className="space-y-1"><label className="text-xs font-medium">Degree</label><Input name="degree" defaultValue={edu.degree} required /></div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">Date</label><Input name="date" defaultValue={edu.date} required /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Grade/CGPA</label><Input name="grade" defaultValue={(edu as any).grade} /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}><X className="w-4 h-4 mr-1" />Cancel</Button>
                <Button type="submit" disabled={crudMutation.isPending}><Save className="w-4 h-4 mr-1" />{crudMutation.isPending ? "Saving..." : "Save Changes"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    }

    if (editTarget.type === "skill") {
      const skill = editTarget.item;
      return (
        <Dialog open onOpenChange={handleClose}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Pencil className="w-4 h-4" /> Edit Skill</DialogTitle>
            </DialogHeader>
            <form onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              const body = Object.fromEntries(fd.entries()) as Record<string, string>;
              crudMutation.mutate({
                entity: "skills", method: "PUT", id: skill.id,
                body: { ...body, level: parseInt(body.level) } as Record<string, string | string[] | boolean | number>,
              });
            }} className="space-y-4 pt-2">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">Skill Name</label><Input name="name" defaultValue={skill.name} required /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Category</label><Input name="category" defaultValue={skill.category} required /></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1"><label className="text-xs font-medium">Level (0-100)</label><Input name="level" type="number" min="0" max="100" defaultValue={String(skill.level)} required /></div>
                <div className="space-y-1"><label className="text-xs font-medium">Icon Name</label><Input name="icon" defaultValue={(skill as any).icon} /></div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}><X className="w-4 h-4 mr-1" />Cancel</Button>
                <Button type="submit" disabled={crudMutation.isPending}><Save className="w-4 h-4 mr-1" />{crudMutation.isPending ? "Saving..." : "Save Changes"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    }

    return null;
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="w-10 h-10 animate-spin" /></div>;
  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="bg-destructive/10 text-destructive p-4 rounded-lg border border-destructive/20 max-w-md">
        <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
        <p className="font-mono text-sm">{(error as any).message || "Unknown error"}</p>
        <Button className="mt-4" onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {renderEditModal()}

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
              <Settings className="w-4 h-4 mr-2" />Settings
            </TabsTrigger>
            <TabsTrigger value="experiences" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Briefcase className="w-4 h-4 mr-2" />Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Code className="w-4 h-4 mr-2" />Projects
            </TabsTrigger>
            <TabsTrigger value="education" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <BookOpen className="w-4 h-4 mr-2" />Education
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-12 rounded-lg border border-border">
              <Plus className="w-4 h-4 mr-2" />Skills
            </TabsTrigger>
          </TabsList>

          {/* ── Site Settings ── */}
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
                    <div className="space-y-2"><label className="text-sm font-medium">Hero Name</label><Input name="hero_name" defaultValue={data?.settings?.hero_name} /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Hero Subtitle</label><Input name="hero_subtitle" defaultValue={data?.settings?.hero_subtitle} /></div>
                  </div>
                  <div className="space-y-2"><label className="text-sm font-medium">Hero Tagline</label><Textarea name="hero_tagline" defaultValue={data?.settings?.hero_tagline} /></div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2"><label className="text-sm font-medium">Location</label><Input name="location" defaultValue={data?.settings?.location} /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Phone</label><Input name="phone" defaultValue={data?.settings?.phone} /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">Email</label><Input name="email" defaultValue={data?.settings?.email} /></div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><label className="text-sm font-medium">LinkedIn URL</label><Input name="linkedin" defaultValue={data?.settings?.linkedin} /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">GitHub URL</label><Input name="github_profile" defaultValue={data?.settings?.github_profile} /></div>
                  </div>

                  {/* Resume Management */}
                  <div className="space-y-4 p-4 rounded-lg border border-border bg-card/30">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Resume Management 
                      <span className="text-xs font-normal text-muted-foreground">(Cloud Storage - Vercel)</span>
                    </label>
                    <div className="flex flex-col md:flex-row gap-4 items-end">
                      <div className="flex-1 space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Current: {data?.settings?.resume_url || "No resume uploaded"}
                        </p>
                        <Input type="file" accept=".pdf" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const fd = new FormData();
                          fd.append("file", file);
                          toast.promise(
                            fetch("/api/admin/resume/upload", {
                              method: "POST",
                              headers: { "Authorization": `Bearer ${token}` },
                              body: fd
                            }).then(res => res.json()),
                            {
                              loading: "Uploading resume...",
                              success: () => { queryClient.invalidateQueries({ queryKey: ["portfolio"] }); return "Resume uploaded!"; },
                              error: "Upload failed"
                            }
                          );
                        }} />
                      </div>
                      {data?.settings?.resume_url && (
                        <Button type="button" variant="destructive" onClick={() => {
                          if (!confirm("Delete current resume?")) return;
                          toast.promise(
                            fetch("/api/admin/resume/delete", {
                              method: "DELETE",
                              headers: { "Authorization": `Bearer ${token}` }
                            }).then(res => res.json()),
                            {
                              loading: "Deleting...",
                              success: () => { queryClient.invalidateQueries({ queryKey: ["portfolio"] }); return "Resume deleted!"; },
                              error: "Delete failed"
                            }
                          );
                        }}>
                          <Trash2 className="w-4 h-4 mr-2" />Delete Current
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2"><label className="text-sm font-medium">About Me (Part 1)</label><Textarea name="about_me_1" defaultValue={data?.settings?.about_me_1} rows={4} /></div>
                    <div className="space-y-2"><label className="text-sm font-medium">About Me (Part 2)</label><Textarea name="about_me_2" defaultValue={data?.settings?.about_me_2} rows={4} /></div>
                  </div>

                  <Button type="submit" disabled={updateSettingsMutation.isPending} className="w-full h-12">
                    {updateSettingsMutation.isPending ? "Saving..." : "Save Settings"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Experiences ── */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-4 h-4" />Add Experience</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
                    crudMutation.mutate({
                      entity: "experiences", method: "POST",
                      body: {
                        ...body,
                        achievements: body.achievements.split("\n").filter(Boolean),
                        responsibilities: body.responsibilities.split("\n").filter(Boolean),
                        technologies: body.technologies.split(",").map(s => s.trim()).filter(Boolean),
                        current: body.current === "on",
                      } as Record<string, string | string[] | boolean | number>,
                    });
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

              <div className="grid gap-4">
                {(data?.experiences || []).map((exp) => (
                  <Card key={exp.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-lg">{exp.company}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">{exp.position} | {exp.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditTarget({ type: "experience", item: exp })}>
                          <Pencil className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "experiences", method: "DELETE", id: exp.id })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Projects ── */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-4 h-4" />Add Project</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
                    crudMutation.mutate({
                      entity: "projects", method: "POST",
                      body: {
                        ...body,
                        technologies: body.technologies.split(",").map(s => s.trim()).filter(Boolean),
                        featured: body.featured === "on",
                      } as Record<string, string | string[] | boolean | number>,
                    });
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

              <div className="grid md:grid-cols-2 gap-4">
                {(data?.projects || []).map((proj) => (
                  <Card key={proj.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-base">{proj.title}</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditTarget({ type: "project", item: proj })}>
                          <Pencil className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "projects", method: "DELETE", id: proj.id })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">{proj.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Education ── */}
          <TabsContent value="education">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-4 h-4" />Add Education</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
                    crudMutation.mutate({
                      entity: "education", method: "POST",
                      body: { ...body, current: body.current === "on" } as Record<string, string | string[] | boolean | number>,
                    });
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

              <div className="grid gap-4">
                {(data?.education || []).map((edu) => (
                  <Card key={edu.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <div>
                        <CardTitle className="text-lg">{edu.institution}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-0.5">{edu.degree} | {edu.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => setEditTarget({ type: "education", item: edu })}>
                          <Pencil className="w-4 h-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => crudMutation.mutate({ entity: "education", method: "DELETE", id: edu.id })}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Skills ── */}
          <TabsContent value="skills">
            <div className="space-y-6">
              <Card className="backdrop-blur-glass bg-card/80 border-border">
                <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-4 h-4" />Add Skill</CardTitle></CardHeader>
                <CardContent>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const body = Object.fromEntries(fd.entries()) as Record<string, string>;
                    crudMutation.mutate({
                      entity: "skills", method: "POST",
                      body: { ...body, level: parseInt(body.level) } as Record<string, string | string[] | boolean | number>,
                    });
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

              <div className="grid md:grid-cols-3 gap-4">
                {(data?.skills || []).map((skill) => (
                  <Card key={skill.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between pb-1">
                      <CardTitle className="text-sm font-bold">{skill.name}</CardTitle>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setEditTarget({ type: "skill", item: skill })}>
                          <Pencil className="w-3 h-3 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => crudMutation.mutate({ entity: "skills", method: "DELETE", id: skill.id })}>
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground">{skill.category}</p>
                      <div className="mt-2 bg-muted rounded-full h-1.5 overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${skill.level}%` }} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 text-right">{skill.level}%</p>
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
