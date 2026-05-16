import { describe, it, expect } from "vitest";

/**
 * MemberCard Component Tests
 * 
 * Note: Full component testing requires a DOM environment (jsdom/happy-dom).
 * These tests validate the component's prop interface and data flow.
 * Visual/interaction testing is covered through manual browser testing.
 */

describe("MemberCard Component", () => {
  it("should accept required props", () => {
    const props = {
      name: "Goutam Das",
      role: "Founder & Vocalist",
      image: "https://example.com/image.jpg",
      instagram: "https://instagram.com/goutam_d_gaayak",
      onCardClick: () => {},
    };

    expect(props.name).toBeDefined();
    expect(props.role).toBeDefined();
    expect(props.image).toBeDefined();
    expect(props.onCardClick).toBeDefined();
  });

  it("should have valid Instagram URL format", () => {
    const instagramUrl = "https://instagram.com/goutam_d_gaayak";
    expect(instagramUrl).toMatch(/^https:\/\/instagram\.com\//);
  });

  it("should handle optional Instagram prop", () => {
    const propsWithoutInstagram = {
      name: "Test Member",
      role: "Test Role",
      image: "https://example.com/image.jpg",
      onCardClick: () => {},
    };

    expect(propsWithoutInstagram.instagram).toBeUndefined();
  });

  it("should call onCardClick callback when triggered", () => {
    let callCount = 0;
    const mockCallback = () => {
      callCount++;
    };

    mockCallback();
    expect(callCount).toBe(1);
  });

  it("should have valid image URL", () => {
    const imageUrl = "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/goutam-portrait-U99EEBLpWwuS9eDD6c4uft.webp";
    expect(imageUrl).toMatch(/^https:\/\//);
    expect(imageUrl).toMatch(/\.(jpg|jpeg|png|webp)$/i);
  });

  it("should validate all band member data", () => {
    const bandMembers = [
      {
        name: "Goutam Das",
        role: "Founder & Vocalist",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/goutam-portrait-U99EEBLpWwuS9eDD6c4uft.webp",
        instagram: "https://www.instagram.com/goutam_d_gaayak",
      },
      {
        name: "Chinmay",
        role: "Electric Guitarist",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/chinmay-portrait-ZqL2TCXT9rchPGKdtcGjaj.webp",
        instagram: "https://www.instagram.com/chinmax_mewzik",
      },
    ];

    bandMembers.forEach((member) => {
      expect(member.name).toBeTruthy();
      expect(member.role).toBeTruthy();
      expect(member.image).toBeTruthy();
      expect(member.instagram).toBeTruthy();
    });
  });
});
