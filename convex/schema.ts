import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  journeyEvents: defineTable({
    year: v.number(),
    location: v.string(),
    country: v.string(),
    title: v.string(),
    description: v.string(),
    significance: v.string(),
    coordinates: v.object({
      lat: v.number(),
      lng: v.number(),
    }),
    imageUrl: v.optional(v.string()),
  }).index("by_year", ["year"]),
  
  quotes: defineTable({
    text: v.string(),
    context: v.string(),
    year: v.optional(v.number()),
    category: v.string(),
  }),
  
  galleryImages: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    year: v.optional(v.number()),
    category: v.string(),
  }),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
