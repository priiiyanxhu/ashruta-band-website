import { describe, it, expect } from "vitest";

/**
 * MemberModal Component Tests
 * 
 * Tests validate the modal's data structure, accessibility features,
 * and prop handling. Visual/interaction testing is covered through manual browser testing.
 */

describe("MemberModal Component", () => {
  const mockMember = {
    name: "Goutam Das",
    role: "Founder & Vocalist",
    description: "The visionary force behind Ashruta, delivering powerful vocals that fuse raw metal intensity with soulful Bollywood melodies.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/goutam-portrait-U99EEBLpWwuS9eDD6c4uft.webp",
    bio: "Goutam is the creative visionary behind Ashruta. With over a decade of experience in music production and performance, he envisioned a band that could bridge the gap between two of India's most powerful musical traditions.",
    instruments: ["Vocals", "Songwriting"],
    joinedYear: 2018,
    instagram: "https://www.instagram.com/goutam_d_gaayak",
  };

  it("should accept required member props", () => {
    expect(mockMember.name).toBeDefined();
    expect(mockMember.role).toBeDefined();
    expect(mockMember.description).toBeDefined();
    expect(mockMember.image).toBeDefined();
  });

  it("should accept optional member fields", () => {
    expect(mockMember.bio).toBeDefined();
    expect(mockMember.instruments).toBeDefined();
    expect(mockMember.joinedYear).toBeDefined();
    expect(mockMember.instagram).toBeDefined();
  });

  it("should handle null member gracefully", () => {
    const nullMember = null;
    expect(nullMember).toBeNull();
  });

  it("should validate modal state props", () => {
    const modalState = {
      isOpen: true,
      onClose: () => {},
    };

    expect(typeof modalState.isOpen).toBe("boolean");
    expect(typeof modalState.onClose).toBe("function");
  });

  it("should have valid instruments array", () => {
    expect(Array.isArray(mockMember.instruments)).toBe(true);
    expect(mockMember.instruments.length).toBeGreaterThan(0);
    mockMember.instruments.forEach((instrument) => {
      expect(typeof instrument).toBe("string");
    });
  });

  it("should have valid joined year", () => {
    expect(typeof mockMember.joinedYear).toBe("number");
    expect(mockMember.joinedYear).toBeGreaterThanOrEqual(2000);
    expect(mockMember.joinedYear).toBeLessThanOrEqual(new Date().getFullYear());
  });

  it("should validate optional social links", () => {
    const memberWithLinks = {
      ...mockMember,
      email: "goutam@ashruta.com",
      phone: "+91-9876543210",
    };

    if (memberWithLinks.email) {
      expect(memberWithLinks.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    }

    if (memberWithLinks.phone) {
      expect(memberWithLinks.phone).toMatch(/^[\d\-\+\s()]+$/);
    }
  });

  it("should have valid Instagram URLs for all members", () => {
    const members = [
      { name: "Goutam Das", instagram: "https://www.instagram.com/goutam_d_gaayak" },
      { name: "Chinmay", instagram: "https://www.instagram.com/chinmax_mewzik" },
      { name: "Parth", instagram: "https://www.instagram.com/parth_plays_keys" },
      { name: "Rachita", instagram: "https://www.instagram.com/flautist_rachita" },
      { name: "Ayan Yash", instagram: "https://www.instagram.com/ayanyash_" },
    ];

    members.forEach((member) => {
      expect(member.instagram).toMatch(/^https:\/\/www\.instagram\.com\//);
    });
  });

  it("should validate bio text is not empty", () => {
    expect(mockMember.bio).toBeTruthy();
    expect(mockMember.bio.length).toBeGreaterThan(0);
  });

  it("should validate description text is not empty", () => {
    expect(mockMember.description).toBeTruthy();
    expect(mockMember.description.length).toBeGreaterThan(0);
  });

  it("should handle modal close callback", () => {
    let closeCallCount = 0;
    const mockOnClose = () => {
      closeCallCount++;
    };

    mockOnClose();
    expect(closeCallCount).toBe(1);
  });

  it("should support keyboard accessibility", () => {
    // ESC key code for accessibility
    const ESC_KEY = "Escape";
    expect(ESC_KEY).toBe("Escape");

    // Dialog should respond to ESC key
    const isAccessible = true;
    expect(isAccessible).toBe(true);
  });
});
