import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  subscribeNewsletter: vi.fn().mockResolvedValue(undefined),
  getAllNewsletterSubscribers: vi.fn().mockResolvedValue([]),
  createContactSubmission: vi.fn().mockResolvedValue(undefined),
  getAllContactSubmissions: vi.fn().mockResolvedValue([]),
  markContactAsRead: vi.fn().mockResolvedValue(undefined),
  createBookingInquiry: vi.fn().mockResolvedValue(undefined),
  getAllBookingInquiries: vi.fn().mockResolvedValue([]),
  updateBookingStatus: vi.fn().mockResolvedValue(undefined),
  getAllBlogPosts: vi.fn().mockResolvedValue([]),
  createBlogPost: vi.fn().mockResolvedValue(undefined),
  updateBlogPost: vi.fn().mockResolvedValue(undefined),
  deleteBlogPost: vi.fn().mockResolvedValue(undefined),
}));

// Mock owner notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-user",
      email: "admin@ashrutaband.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 2,
      openId: "regular-user",
      email: "fan@example.com",
      name: "Fan",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("newsletter.subscribe", () => {
  it("allows public users to subscribe with valid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.newsletter.subscribe({ email: "fan@example.com" });
    expect(result.success).toBe(true);
    expect(result.message).toContain("cult");
  });

  it("rejects invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.newsletter.subscribe({ email: "not-an-email" })).rejects.toThrow();
  });

  it("blocks non-admin from listing subscribers", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.newsletter.list()).rejects.toThrow();
  });

  it("allows admin to list subscribers", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.newsletter.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("contact.submit", () => {
  it("allows public users to submit contact form", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.contact.submit({
      name: "John",
      email: "john@example.com",
      subject: "Booking inquiry",
      message: "I would like to book Ashruta for my event.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects message that is too short", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.submit({
        name: "John",
        email: "john@example.com",
        subject: "Hi",
        message: "Short",
      })
    ).rejects.toThrow();
  });

  it("allows admin to list contact submissions", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.contact.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("booking.submit", () => {
  it("allows public users to submit booking inquiry", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.booking.submit({
      name: "Event Organizer",
      email: "organizer@events.com",
      phone: "+91 9876543210",
      eventDate: "June 15, 2026",
      eventType: "Corporate Event",
      venue: "Grand Ballroom",
      city: "Mumbai",
      message: "We would like to book Ashruta for our annual event.",
    });
    expect(result.success).toBe(true);
  });

  it("blocks non-admin from listing bookings", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.booking.list()).rejects.toThrow();
  });
});

describe("blog.list", () => {
  it("allows public access to blog posts", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.blog.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("blocks non-admin from creating blog posts", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.blog.create({ title: "New Post", isPublished: true })
    ).rejects.toThrow();
  });
});
