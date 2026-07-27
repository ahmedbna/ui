import { v } from 'convex/values';
import { authTables } from '@convex-dev/auth/server';
import { defineSchema, defineTable } from 'convex/server';

export default defineSchema({
  ...authTables,

  users: defineTable({
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    gender: v.optional(v.string()),
    birthday: v.optional(v.number()),
    image: v.optional(v.union(v.string(), v.null())),
    emailVerificationTime: v.optional(v.float64()),
    phoneVerificationTime: v.optional(v.float64()),
    isAnonymous: v.optional(v.boolean()),
    githubId: v.optional(v.number()),
  })
    .index('email', ['email'])
    .index('phone', ['phone']),
});
