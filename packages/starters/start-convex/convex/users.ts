import { v } from 'convex/values';
import { getAuthUserId } from '@convex-dev/auth/server';
import { internalQuery, mutation, query } from './_generated/server';

export const get = query({
  handler: async (ctx) => {
    const authId = await getAuthUserId(ctx);

    if (!authId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db.get(authId);

    return user;
  },
});

export const getbyemail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const authId = await getAuthUserId(ctx);

    if (!authId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db
      .query('users')
      .withIndex('email', (q) => q.eq('email', args.email))
      .unique();

    return user;
  },
});

export const getAll = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const allUser = await ctx.db.query('users').take(100);

    const users = allUser.filter((user) => user._id !== userId);

    return users;
  },
});

export const getId = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    return userId;
  },
});

export const getUserInfo = internalQuery({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error('Not found');
    }

    return user;
  },
});

export const update = mutation({
  args: {
    name: v.optional(v.string()),
    bio: v.optional(v.string()),
    gender: v.optional(v.string()),
    birthday: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await ctx.db.patch(user._id, {
      ...args,
    });

    return user._id;
  },
});
