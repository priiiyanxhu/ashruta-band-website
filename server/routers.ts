import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import {
  subscribeNewsletter,
  getAllNewsletterSubscribers,
  createContactSubmission,
  getAllContactSubmissions,
  markContactAsRead,
  createBookingInquiry,
  getAllBookingInquiries,
  updateBookingStatus,
  getAllBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "./db";
import { notifyOwner } from "./_core/notification";

// Helper: admin-only guard
const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
  return next({ ctx });
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // Newsletter
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Please enter a valid email"),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await subscribeNewsletter({ email: input.email, name: input.name });
        await notifyOwner({
          title: "New Newsletter Subscriber",
          content: `${input.name ? input.name + " (" + input.email + ")" : input.email} just subscribed to the Ashruta newsletter!`,
        }).catch(() => {});
        return { success: true, message: "You've joined the cult! Welcome to Ashruta." };
      }),
    list: adminProcedure.query(async () => {
      return getAllNewsletterSubscribers();
    }),
  }),

  // Contact
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Please enter a valid email"),
        subject: z.string().min(1, "Subject is required"),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        await createContactSubmission(input);
        await notifyOwner({
          title: `New Contact: ${input.subject}`,
          content: `From: ${input.name} (${input.email})\n\n${input.message}`,
        }).catch(() => {});
        return { success: true, message: "Message received! We'll get back to you within 24 hours." };
      }),
    list: adminProcedure.query(async () => {
      return getAllContactSubmissions();
    }),
    markRead: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await markContactAsRead(input.id);
        return { success: true };
      }),
  }),

  // Bookings
  booking: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Please enter a valid email"),
        phone: z.string().optional(),
        eventDate: z.string().optional(),
        eventType: z.string().optional(),
        venue: z.string().optional(),
        city: z.string().optional(),
        message: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        await createBookingInquiry(input);
        await notifyOwner({
          title: "New Booking Inquiry",
          content: `From: ${input.name} (${input.email})\nEvent: ${input.eventType || "N/A"} on ${input.eventDate || "TBD"} at ${input.venue || "N/A"}, ${input.city || "N/A"}\n\n${input.message || ""}`,
        }).catch(() => {});
        return { success: true, message: "Booking inquiry received! We'll contact you soon." };
      }),
    list: adminProcedure.query(async () => {
      return getAllBookingInquiries();
    }),
    updateStatus: adminProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "contacted", "confirmed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await updateBookingStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // Blog
  blog: router({
    list: publicProcedure.query(async () => {
      return getAllBlogPosts(true);
    }),
    listAll: adminProcedure.query(async () => {
      return getAllBlogPosts(false);
    }),
    create: adminProcedure
      .input(z.object({
        title: z.string().min(1),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        imageUrl: z.string().optional(),
        isPublished: z.boolean().default(true),
      }))
      .mutation(async ({ input }) => {
        await createBlogPost(input);
        return { success: true };
      }),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        author: z.string().optional(),
        imageUrl: z.string().optional(),
        isPublished: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateBlogPost(id, data);
        return { success: true };
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBlogPost(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
