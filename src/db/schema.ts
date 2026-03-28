import { pgTable, serial, text, varchar, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { type InferSelectModel } from "drizzle-orm";

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 255 }).notNull(),
  logo: text("logo"), // path to logo image
  position: varchar("position", { length: 255 }).notNull(),
  date: varchar("date", { length: 100 }).notNull(), // e.g. "2024 – Present"
  location: varchar("location", { length: 255 }),
  current: boolean("current").default(false),
  technologies: text("technologies").array().notNull(),
  achievements: text("achievements").array().notNull(),
  responsibilities: text("responsibilities").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Experience = InferSelectModel<typeof experiences>;

export const education = pgTable("education", {
  id: serial("id").primaryKey(),
  institution: varchar("institution", { length: 255 }).notNull(),
  degree: varchar("degree", { length: 255 }).notNull(),
  grade: varchar("grade", { length: 100 }), // e.g. "CGPA: 7.94"
  date: varchar("date", { length: 100 }).notNull(),
  current: boolean("current").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Education = InferSelectModel<typeof education>;

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").array().notNull(),
  icon: varchar("icon", { length: 50 }), // lucide icon name
  github: text("github"),
  demo: text("demo"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export type Project = InferSelectModel<typeof projects>;

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  level: serial("level").notNull(), // 0-100
  icon: varchar("icon", { length: 50 }), // lucide icon name
  color: varchar("color", { length: 50 }), // tailwind color class
  createdAt: timestamp("created_at").defaultNow(),
});

export type Skill = InferSelectModel<typeof skills>;

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).unique().notNull(), // e.g. "hero_title", "about_text", "resume_url"
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type SiteSetting = InferSelectModel<typeof siteSettings>;

