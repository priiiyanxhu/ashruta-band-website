/**
 * Ashruta the Band - Home Page
 * Design: Dark heavy metal aesthetic with red/crimson accents
 * Typography: Oswald (headings), Montserrat (body)
 * Layout: Full-width cinematic sections with generous spacing
 * Animations: Scroll-triggered entrance animations for premium feel
 */

import { useState } from "react";
import { Instagram, Youtube, Mail, Play, MapPin, Calendar, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import VideoModal from "@/components/VideoModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

/* ── Asset URLs ── */
const ASSETS = {
  logo: "/manus-storage/WhatsAppImage2026-04-29at01.56.32_3039dc2e.jpeg",
  rachita: "/manus-storage/WhatsAppImage2026-04-29at02.22.41_a6d6491b.jpeg",
  heroBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/hero-bg-AHdpq9qaaH23735YtZtS3A.webp",
  aboutBg: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/about-bg-HvC92GWG3Wvs2xawkQbmRD.webp",
  blog1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/blog-1-HRfjfZqEvkkqfBVRdgekxg.webp",
  blog2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/blog-2-MYQ77Fxze2k2qXkNbeJSGK.webp",
  blog3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/blog-3-MMTsxaC5LPwxATrWntf3EV.webp",
  video1: "/manus-storage/WhatsAppVideo2026-04-29at01.59.25_0bb533f6.mp4",
  video2: "/manus-storage/WhatsAppVideo2026-04-29at01.59.26_0910b637.mp4",
  video3: "/manus-storage/WhatsAppVideo2026-04-29at02.01.26_02512d93.mp4",
  video4: "/manus-storage/WhatsAppVideo2026-04-29at02.01.52_0c85a537.mp4",
};

/* ── Data ── */
const BAND_MEMBERS = [
  {
    name: "Goutam Das",
    role: "Founder & Vocalist",
    instagram: "https://www.instagram.com/goutam_d_gaayak",
    description: "The visionary force behind Ashruta, delivering powerful vocals that fuse raw metal intensity with soulful Bollywood melodies.",
    image: null,
  },
  {
    name: "Chinmay",
    role: "Electric Guitarist",
    instagram: "https://www.instagram.com/chinmax_mewzik",
    description: "Master of crushing riffs and intricate solos, Chinmay brings the heavy metal backbone to every performance.",
    image: null,
  },
  {
    name: "Parth",
    role: "Keys",
    instagram: "https://www.instagram.com/parth_plays_keys",
    description: "Creates rich melodic layers and atmospheric textures that bridge the gap between Bollywood and metal.",
    image: null,
  },
  {
    name: "Rachita",
    role: "Flute",
    instagram: null,
    description: "Brings the haunting beauty of traditional Indian flute into the metal soundscape, creating a truly unique fusion.",
    image: ASSETS.rachita,
  },
  {
    name: "Ayan Yash",
    role: "Managing Director",
    instagram: "https://www.instagram.com/ayanyash_",
    description: "The strategic mind guiding Ashruta's vision, managing the band's creative direction and growth.",
    image: null,
  },
];

const PERFORMANCE_VIDEOS = [
  { src: ASSETS.video1, title: "Live Performance - Concert Highlights" },
  { src: ASSETS.video2, title: "Live Performance - Stage Energy" },
  { src: ASSETS.video3, title: "Live Performance - Crowd Interaction" },
  { src: ASSETS.video4, title: "Live Performance - Full Set Excerpt" },
];

const TRACKS = [
  { title: "Agni Raag (Fire Melody)", artist: "Ashruta the Band", src: "", duration: "4:32" },
  { title: "Dhwani of Destruction", artist: "Ashruta the Band", src: "", duration: "5:18" },
  { title: "Tandav Metal", artist: "Ashruta the Band", src: "", duration: "6:05" },
  { title: "Bollywood Inferno", artist: "Ashruta the Band", src: "", duration: "4:47" },
  { title: "Raga of the Fallen", artist: "Ashruta the Band", src: "", duration: "5:55" },
];

const BLOG_POSTS = [
  {
    title: "Behind the Scenes: Recording Our Latest Album",
    excerpt: "Dive into the creative process as we blend Bollywood melodies with heavy metal intensity in the studio.",
    date: "April 15, 2026",
    image: ASSETS.blog1,
  },
  {
    title: "Ashruta Live at the Metal Festival",
    excerpt: "An unforgettable performance that left the crowd electrified. See highlights from our set.",
    date: "April 8, 2026",
    image: ASSETS.blog2,
  },
  {
    title: "The Fusion Revolution: Why Bollywood Meets Metal",
    excerpt: "Exploring the unique intersection of two powerful musical traditions and what it means for the future.",
    date: "March 28, 2026",
    image: ASSETS.blog3,
  },
];

const UPCOMING_EVENTS = [
  { date: "May 10, 2026", day: "SAT", venue: "The Metal Dome", city: "Mumbai, India" },
  { date: "May 25, 2026", day: "SUN", venue: "Rock Arena", city: "Delhi, India" },
  { date: "June 8, 2026", day: "SAT", venue: "Bangalore Metal Fest", city: "Bangalore, India" },
  { date: "June 22, 2026", day: "SAT", venue: "Kolkata Underground", city: "Kolkata, India" },
];

/* ── Component ── */
export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ src: string; title: string } | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 overflow-x-hidden">
      <Navbar />

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={ASSETS.heroBg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
          {/* Logo */}
          <div className="mb-6 animate-fade-in-down animate-stagger-1">
            <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full overflow-hidden" style={{ background: 'radial-gradient(circle, rgba(204,0,0,0.15) 0%, transparent 70%)' }}>
              <img
                src={ASSETS.logo}
                alt="Ashruta Logo"
                className="w-full h-full object-cover mix-blend-lighten"
              />
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-4 tracking-wider animate-fade-in-up animate-stagger-2"
            style={{
              fontFamily: "'Oswald', sans-serif",
              textShadow: "0 0 60px rgba(204, 0, 0, 0.3), 0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            ASHRUTA
          </h1>

          <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up animate-stagger-3">
            <span className="h-px w-16 bg-red-600/60" />
            <p
              className="text-red-500 text-sm md:text-base uppercase tracking-[0.3em] font-semibold"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Bollywood Fusion in Rock Metal
            </p>
            <span className="h-px w-16 bg-red-600/60" />
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-stagger-4">
            Where the raw power of heavy metal collides with the soul of Bollywood.
            A sonic revolution forged in fire.
          </p>

          <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up animate-stagger-5">
            <a
              href="#music"
              className="group px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-700 transition-all duration-300 hover:shadow-xl hover:shadow-red-600/40 flex items-center gap-2"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Play className="w-4 h-4" />
              Listen Now
            </a>
            <a
              href="#tour"
              className="group px-8 py-4 border-2 border-red-600/60 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-600/10 hover:border-red-600 transition-all duration-300 flex items-center gap-2"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <Calendar className="w-4 h-4" />
              Tour Dates
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-red-600 to-transparent" />
        </div>
      </section>

      {/* ═══════════════ ABOUT SECTION ═══════════════ */}
      <AboutSection />

      {/* ═══════════════ BAND MEMBERS ═══════════════ */}
      <MembersSection />

      {/* ═══════════════ MUSIC & MEDIA ═══════════════ */}
      <MusicSection activeVideo={activeVideo} setActiveVideo={setActiveVideo} />

      {/* Video Modal */}
      {activeVideo && (
        <VideoModal
          videoSrc={activeVideo.src}
          title={activeVideo.title}
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* ═══════════════ TOUR DATES ═══════════════ */}
      <TourSection />

      {/* ═══════════════ BLOG ═══════════════ */}
      <BlogSection />

      {/* ═══════════════ NEWSLETTER ═══════════════ */}
      <NewsletterSection email={email} setEmail={setEmail} subscribed={subscribed} handleSubscribe={handleSubscribe} />

      {/* ═══════════════ FOOTER ═══════════════ */}
      <FooterSection />
    </div>
  );
}

/* ═══════════════ ABOUT SECTION COMPONENT ═══════════════ */
function AboutSection() {
  const { ref: imageRef, isInView: imageInView } = useScrollAnimation({ threshold: 0.2 });
  const { ref: textRef, isInView: textInView } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="about" className="relative py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div
            ref={imageRef}
            className={`relative transition-all duration-1000 ${
              imageInView ? "animate-fade-in-left" : "opacity-0 translate-x-[-40px]"
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                src={ASSETS.aboutBg}
                alt="Electric guitar close-up"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>
            {/* Decorative border */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-red-600/20 -z-10" />
          </div>

          {/* Text Side */}
          <div
            ref={textRef}
            className={`transition-all duration-1000 ${
              textInView ? "animate-fade-in-right" : "opacity-0 translate-x-[40px]"
            }`}
          >
            <p className="text-red-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Our Story
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-tight"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Where Two Worlds <br />
              <span className="text-red-600">Collide</span>
            </h2>

            <div className="space-y-5 text-gray-400 leading-relaxed">
              <p>
                Ashruta represents a groundbreaking fusion of two powerful musical traditions. Born from the vision of founder Goutam Das, the band blends the raw intensity and aggression of heavy metal with the rich, melodic traditions of Bollywood music.
              </p>
              <p>
                Our unique sound bridges cultures, creating an immersive experience that honors both the classical Indian musical heritage and the modern metal aesthetic. Each performance is a journey through fire and melody, where distorted guitars meet the haunting beauty of the Indian flute.
              </p>
              <p>
                With a five-member ensemble featuring powerful vocals, crushing electric guitar, atmospheric keys, and traditional flute, we create a sonic landscape unlike anything you have heard before. This is not just music. This is a revolution.
              </p>
            </div>

            <div className="mt-8 flex gap-8">
              <div>
                <p className="text-3xl font-black text-red-600" style={{ fontFamily: "'Oswald', sans-serif" }}>5</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Members</p>
              </div>
              <div className="w-px bg-red-600/20" />
              <div>
                <p className="text-3xl font-black text-red-600" style={{ fontFamily: "'Oswald', sans-serif" }}>2</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Genres Fused</p>
              </div>
              <div className="w-px bg-red-600/20" />
              <div>
                <p className="text-3xl font-black text-red-600" style={{ fontFamily: "'Oswald', sans-serif" }}>1</p>
                <p className="text-sm text-gray-500 uppercase tracking-wider">Revolution</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MEMBERS SECTION COMPONENT ═══════════════ */
function MembersSection() {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation({ threshold: 0.3 });
  const memberRefs = BAND_MEMBERS.map(() => useScrollAnimation({ threshold: 0.3 }));

  return (
    <section id="members" className="py-28 bg-[#080808]">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
          }`}
        >
          <p className="text-red-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            The Lineup
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Meet the <span className="text-red-600">Band</span>
          </h2>
        </div>

        {/* Members Grid - 3 on top, 2 centered below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {BAND_MEMBERS.slice(0, 3).map((member, idx) => (
            <div
              key={idx}
              ref={memberRefs[idx].ref}
              className={`transition-all duration-1000 ${
                memberRefs[idx].isInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
          {BAND_MEMBERS.slice(3).map((member, idx) => (
            <div
              key={idx + 3}
              ref={memberRefs[idx + 3].ref}
              className={`transition-all duration-1000 ${
                memberRefs[idx + 3].isInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
              }`}
              style={{ animationDelay: `${(idx + 3) * 100}ms` }}
            >
              <MemberCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ MUSIC SECTION COMPONENT ═══════════════ */
function MusicSection({ activeVideo, setActiveVideo }: { activeVideo: any; setActiveVideo: any }) {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation({ threshold: 0.3 });
  const { ref: playerRef, isInView: playerInView } = useScrollAnimation({ threshold: 0.3 });
  const { ref: galleryRef, isInView: galleryInView } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="music" className="py-28">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
          }`}
        >
          <p className="text-red-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Listen & Watch
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Music & <span className="text-red-600">Media</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Music Player */}
          <div
            ref={playerRef}
            className={`transition-all duration-1000 ${
              playerInView ? "animate-fade-in-left" : "opacity-0 translate-x-[-40px]"
            }`}
          >
            <h3
              className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span className="w-8 h-px bg-red-600" />
              Featured Tracks
            </h3>
            <MusicPlayer tracks={TRACKS} />
            <p className="text-gray-500 text-sm mt-4 italic">
              Tracks will be available for streaming soon. Stay tuned for our debut releases.
            </p>
          </div>

          {/* Video Gallery */}
          <div
            ref={galleryRef}
            className={`transition-all duration-1000 ${
              galleryInView ? "animate-fade-in-right" : "opacity-0 translate-x-[40px]"
            }`}
          >
            <h3
              className="text-2xl font-bold text-white mb-6 flex items-center gap-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span className="w-8 h-px bg-red-600" />
              Performance Videos
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {PERFORMANCE_VIDEOS.map((video, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideo(video)}
                  className="video-thumbnail group relative aspect-video bg-black border border-red-600/20 hover:border-red-600 transition-all duration-300"
                >
                  <video
                    src={video.src}
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-500"
                  />
                  <div className="video-overlay absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300">
                    <div className="play-button w-12 h-12 flex items-center justify-center bg-red-600/80 rounded-full transition-all duration-300 group-hover:shadow-lg">
                      <Play className="w-5 h-5 text-white ml-0.5" />
                    </div>
                  </div>
                  <div className="video-title absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300">
                    <p className="text-white text-xs font-semibold truncate">{video.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ TOUR SECTION COMPONENT ═══════════════ */
function TourSection() {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation({ threshold: 0.3 });
  const eventRefs = UPCOMING_EVENTS.map(() => useScrollAnimation({ threshold: 0.3 }));

  return (
    <section id="tour" className="py-28 bg-[#080808]">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
          }`}
        >
          <p className="text-red-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            On the Road
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            Upcoming <span className="text-red-600">Shows</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {UPCOMING_EVENTS.map((event, idx) => (
            <div
              key={idx}
              ref={eventRefs[idx].ref}
              className={`group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 bg-[#0d0d0d] border border-red-600/10 hover:border-red-600/40 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/10 ${
                eventRefs[idx].isInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {/* Date Block */}
              <div className="flex md:flex-col items-center gap-2 md:gap-0 md:w-20 shrink-0 md:text-center">
                <span className="text-red-600 text-xs font-bold uppercase tracking-wider">{event.day}</span>
                <span className="text-white text-sm font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {event.date.split(",")[0]}
                </span>
              </div>

              <div className="hidden md:block w-px h-12 bg-red-600/20" />

              {/* Venue Info */}
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {event.venue}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {event.city}
                </p>
              </div>

              {/* CTA */}
              <button className="px-6 py-3 bg-red-600 text-white text-sm font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/40 flex items-center gap-2 w-full md:w-auto justify-center"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Get Tickets
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ BLOG SECTION COMPONENT ═══════════════ */
function BlogSection() {
  const { ref: titleRef, isInView: titleInView } = useScrollAnimation({ threshold: 0.3 });
  const postRefs = BLOG_POSTS.map(() => useScrollAnimation({ threshold: 0.3 }));

  return (
    <section id="blog" className="py-28">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
          }`}
        >
          <p className="text-red-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Latest Updates
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            News & <span className="text-red-600">Blog</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {BLOG_POSTS.map((post, idx) => (
            <article
              key={idx}
              ref={postRefs[idx].ref}
              className={`group bg-[#0d0d0d] border border-red-600/10 hover:border-red-600/40 transition-all duration-300 overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-red-600/10 ${
                postRefs[idx].isInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-red-500 text-xs font-bold mb-3 uppercase tracking-wider">{post.date}</p>
                <h3
                  className="text-lg font-bold text-white mb-3 group-hover:text-red-500 transition-colors leading-snug"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
                <span className="text-red-500 text-sm font-bold uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════ NEWSLETTER SECTION COMPONENT ═══════════════ */
function NewsletterSection({ email, setEmail, subscribed, handleSubscribe }: any) {
  const { ref, isInView } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section id="contact" className="py-28 bg-[#080808] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-3xl" />

      <div
        ref={ref}
        className={`container relative z-10 max-w-2xl text-center transition-all duration-1000 ${
          isInView ? "animate-fade-in-up" : "opacity-0 translate-y-[40px]"
        }`}
      >
        <p className="text-red-500 text-sm uppercase tracking-[0.3em] font-semibold mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Stay Connected
        </p>
        <h2
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          Join the <span className="text-red-600">Cult</span>
        </h2>
        <p className="text-gray-400 text-lg mb-10">
          Be the first to hear new tracks, get exclusive content, and receive tour date announcements.
        </p>

        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-6 py-4 bg-[#0d0d0d] border border-red-600/20 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors text-sm"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          />
          <button
            type="submit"
            className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider text-sm hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/40 whitespace-nowrap flex items-center justify-center gap-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            <Mail className="w-4 h-4" />
            Subscribe
          </button>
        </form>

        {subscribed && (
          <p className="text-green-400 mt-4 font-semibold text-sm animate-pulse">
            Welcome to the cult. You are now part of the revolution.
          </p>
        )}
      </div>
    </section>
  );
}

/* ═══════════════ FOOTER COMPONENT ═══════════════ */
function FooterSection() {
  return (
    <footer className="bg-black border-t border-red-600/20 py-16">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={ASSETS.logo} alt="Ashruta" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold text-red-600 tracking-widest" style={{ fontFamily: "'Oswald', sans-serif" }}>
                ASHRUTA
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Pioneering Bollywood Fusion in Heavy Metal. A sonic revolution born from the collision of two powerful musical traditions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="font-bold text-white mb-6 uppercase tracking-wider text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              {["About", "Members", "Music", "Tour", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-red-500 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="font-bold text-white mb-6 uppercase tracking-wider text-sm"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/goutam_d_gaayak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-red-600/30 text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-600 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-red-600/30 text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-600 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="w-10 h-10 flex items-center justify-center border border-red-600/30 text-gray-400 hover:text-white hover:bg-red-600/20 hover:border-red-600 transition-all"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <p className="text-gray-600 text-xs mt-6">
              For bookings & inquiries:<br />
              <a href="mailto:contact@ashrutaband.com" className="text-red-500/80 hover:text-red-500 transition">
                contact@ashrutaband.com
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-red-600/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">
            &copy; 2026 Ashruta the Band. All rights reserved.
          </p>
          <p className="text-gray-700 text-xs">
            Pioneering the future of metal music.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Member Card Sub-Component ── */
function MemberCard({ member }: { member: typeof BAND_MEMBERS[number] }) {
  return (
    <div className="group relative bg-[#0d0d0d] border border-red-600/10 hover:border-red-600/40 transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-red-600/10">
      {/* Image / Placeholder */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-red-900/10 to-black">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-red-600/20 flex items-center justify-center group-hover:border-red-600/60 transition-colors">
                <span className="text-3xl font-black text-red-600/40 group-hover:text-red-600 transition-colors" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {member.name.charAt(0)}
                </span>
              </div>
              <p className="text-gray-600 text-xs">Photo coming soon</p>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-80" />
      </div>

      {/* Info */}
      <div className="p-5 relative">
        <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {member.role}
        </p>
        <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
          {member.name}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.description}</p>

        {member.instagram && (
          <a
            href={member.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-red-500/80 hover:text-red-500 text-sm font-semibold transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Follow</span>
          </a>
        )}
      </div>
    </div>
  );
}
