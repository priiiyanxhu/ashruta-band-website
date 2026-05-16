/*
 * Ashruta the Band - Home Page (10/10 Version)
 * Design: Dark heavy metal aesthetic with red/crimson accents
 * Typography: Oswald (headings), Montserrat (body)
 * Layout: Full-width cinematic sections with generous spacing
 * Animations: Scroll-triggered entrance animations for premium feel
 * Features: Gallery, Enhanced Blog, Origin Story, Premium UX
 */

import { useState, useRef } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { Instagram, Youtube, Mail, Play, MapPin, Calendar, ArrowRight, X, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import EnhancedMusicPlayer from "@/components/EnhancedMusicPlayer";
import { generatePlaceholderTracks, createPlaceholderAudioUrl } from "@/lib/audioGenerator";
import VideoModal from "@/components/VideoModal";
import MemberModal from "@/components/MemberModal";
import MemberCard from "@/components/MemberCard";
import { InstagramFeed } from "@/components/InstagramFeed";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import FAQAccordion from "@/components/FAQAccordion";
import StreamingPlatforms from "@/components/StreamingPlatforms";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useScrollAnimations, useInViewport } from "@/hooks/useScrollAnimations";
import { useScrollPosition, useActiveSection } from "@/hooks/useScrollPosition";
import ParallaxSection from "@/components/ParallaxSection";
import { FAQ_ITEMS } from "@/data/faqData";

// Generate placeholder tracks with audio URLs
const PLACEHOLDER_TRACKS = generatePlaceholderTracks().map((track) => ({
  ...track,
  url: createPlaceholderAudioUrl(track.duration),
}));

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
  // Gallery Images
  gallery1: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/band-photo-1-UTrdJiW9yWdgN65gLsVgWi.webp",
  gallery2: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/band-photo-2-2ztQFBSzaLgHop9zidUEZK.webp",
  gallery3: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/band-photo-3-TsH528h8wwQXmXMBtNqw8P.webp",
  gallery4: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/band-photo-4-4FHFjYyUn8YVpdZ7yYvm9G.webp",
};

/* ── Data ── */
const BAND_MEMBERS = [
  {
    name: "Goutam Das",
    role: "Founder & Vocalist",
    instagram: "https://www.instagram.com/goutam_d_gaayak",
    description: "The visionary force behind Ashruta, delivering powerful vocals that fuse raw metal intensity with soulful Bollywood melodies.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/goutam-portrait-U99EEBLpWwuS9eDD6c4uft.webp",
    bio: "Goutam is the creative visionary behind Ashruta. With over a decade of experience in music production and performance, he envisioned a band that could bridge the gap between two of India's most powerful musical traditions.",
    instruments: ["Vocals", "Songwriting"],
    joinedYear: 2018,
  },
  {
    name: "Chinmay",
    role: "Electric Guitarist",
    instagram: "https://www.instagram.com/chinmax_mewzik",
    description: "Master of crushing riffs and intricate solos, Chinmay brings the heavy metal backbone to every performance.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/chinmay-portrait-ZqL2TCXT9rchPGKdtcGjaj.webp",
    bio: "A virtuoso guitarist with roots in classical training, Chinmay seamlessly blends metal aggression with Indian classical techniques.",
    instruments: ["Electric Guitar", "Acoustic Guitar"],
    joinedYear: 2018,
  },
  {
    name: "Parth",
    role: "Keys",
    instagram: "https://www.instagram.com/parth_plays_keys",
    description: "Creates rich melodic layers and atmospheric textures that bridge the gap between Bollywood and metal.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/parth-portrait-WBoQr4zDEZoDHrDS8376MA.webp",
    bio: "Parth's keyboard mastery adds depth and complexity to Ashruta's sound, weaving together classical Indian ragas with modern synthesizer textures.",
    instruments: ["Keyboard", "Synthesizer", "Piano"],
    joinedYear: 2018,
  },
  {
    name: "Rachita",
    role: "Flute",
    instagram: "https://www.instagram.com/flautist_rachita",
    description: "Brings the haunting beauty of traditional Indian flute into the metal soundscape, creating a truly unique fusion.",
    image: ASSETS.rachita,
    bio: "A classically trained flautist, Rachita's mastery of traditional Indian ragas brings an authentic and soulful dimension to Ashruta's fusion sound.",
    instruments: ["Flute", "Bansuri"],
    joinedYear: 2019,
  },
  {
    name: "Ayan Yash",
    role: "Managing Director",
    instagram: "https://www.instagram.com/ayanyash_",
    description: "The strategic mind guiding Ashruta's vision, managing the band's creative direction and growth.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663610606370/HHQJazzH5Fe87jLaRJU782/ayan-yash-portrait-oAU2aqWokV64mALWttDHc6.webp",
    bio: "Ayan Yash is the strategic visionary who manages Ashruta's operations and creative direction, ensuring the band's message reaches audiences worldwide.",
    instruments: ["Management", "Production"],
    joinedYear: 2018,
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
    author: "Goutam Das",
    image: ASSETS.blog1,
    content: "Our latest album represents a breakthrough in the Bollywood-metal fusion genre. We spent months in the studio experimenting with traditional Indian instruments alongside heavy guitar riffs and thunderous drums. The result is a sound that's uniquely Ashruta.",
  },
  {
    title: "Ashruta Live at the Metal Festival",
    excerpt: "An unforgettable performance that left the crowd electrified. See highlights from our set.",
    date: "April 8, 2026",
    author: "Ayan Yash",
    image: ASSETS.blog2,
    content: "The energy at the metal festival was absolutely insane. Our performance was the perfect blend of raw metal aggression and intricate Bollywood-inspired melodies. The crowd's response was overwhelming, and we're grateful for every single fan who came to support us.",
  },
  {
    title: "The Fusion Revolution: Why Bollywood Meets Metal",
    excerpt: "Exploring the unique intersection of two powerful musical traditions and what it means for the future.",
    date: "April 1, 2026",
    author: "Parth",
    image: ASSETS.blog3,
    content: "Bollywood and metal might seem like opposite ends of the musical spectrum, but they share a common thread: passion and intensity. Both genres demand virtuosity and emotional depth. Ashruta was born from the idea that these two worlds don't just coexist—they enhance each other.",
  },
];

const GALLERY_IMAGES = [
  { src: ASSETS.gallery1, title: "Live Performance - Full Band Energy", category: "Live" },
  { src: ASSETS.gallery2, title: "Studio Session - Creative Process", category: "Studio" },
  { src: ASSETS.gallery3, title: "Festival Performance - Crowd Interaction", category: "Live" },
  { src: ASSETS.gallery4, title: "Vocal Performance - Raw Intensity", category: "Live" },
];

const TOUR_DATES = [
  { date: "May 10, 2026", venue: "The Metal Dome", city: "Mumbai", status: "Tickets Available", bookingUrl: "https://www.ticketmaster.in" },
  { date: "May 25, 2026", venue: "Rock Arena", city: "Delhi", status: "Coming Soon", bookingUrl: "https://www.ticketmaster.in" },
  { date: "June 8, 2026", venue: "Festival Grounds", city: "Bangalore", status: "Coming Soon", bookingUrl: "https://www.ticketmaster.in" },
];

export default function Home() {
  const { user } = useAuth();
  
  // Fetch blog posts from database
  const { data: dbBlogPosts = [] } = trpc.blog.list.useQuery();
  const blogPosts = dbBlogPosts.length > 0 ? dbBlogPosts : BLOG_POSTS;

  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const heroRef = useScrollAnimation();
  const aboutRef = useScrollAnimation();
  const membersRef = useScrollAnimation();
  const musicRef = useScrollAnimation();
  const galleryRef = useScrollAnimation();
  const tourRef = useScrollAnimation();
  const blogRef = useScrollAnimation();
  const newsletterRef = useScrollAnimation();
  const contactRef = useScrollAnimation();
  const [contactFormData, setContactFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({ name: "", email: "", phone: "", eventDate: "", eventType: "", venue: "", city: "", message: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [selectedMember, setSelectedMember] = useState<typeof BAND_MEMBERS[0] | null>(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  const openMemberModal = (member: typeof BAND_MEMBERS[0]) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

  const closeMemberModal = () => {
    setIsMemberModalOpen(false);
    setTimeout(() => setSelectedMember(null), 300);
  };

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: (data) => {
      setContactSubmitted(true);
      setContactFormData({ name: "", email: "", subject: "", message: "" });
      toast.success(data.message);
      setTimeout(() => setContactSubmitted(false), 5000);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send message. Please try again.");
    },
  });

  const bookingMutation = trpc.booking.submit.useMutation({
    onSuccess: (data) => {
      setBookingSubmitted(true);
      setBookingFormData({ name: "", email: "", phone: "", eventDate: "", eventType: "", venue: "", city: "", message: "" });
      toast.success(data.message);
      setTimeout(() => setBookingSubmitted(false), 5000);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to submit booking inquiry. Please try again.");
    },
  });

  const newsletterMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setNewsletterEmail("");
      toast.success(data.message);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to subscribe. Please try again.");
    },
  });

  const { scrollY } = useScrollPosition();
  const activeSection = useActiveSection(['hero', 'about', 'members', 'music', 'gallery', 'blog', 'tour', 'contact', 'faq']);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar activeSection={activeSection} />

      {/* ── HERO SECTION ── */}
      <section
        id="hero"
        ref={heroRef.ref}
        className="relative min-h-screen flex items-center justify-center overflow-hidden parallax-bg"
        style={{
          backgroundImage: `url(${ASSETS.heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8 flex justify-center">
            <img
              src={ASSETS.logo}
              alt="Ashruta Logo"
              className="h-32 w-32 object-cover rounded-full shadow-2xl"
              style={{
                filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.8))",
              }}
            />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-4 animate-slide-up font-oswald tracking-wider">
            ASHRUTA
          </h1>
          <p className="text-xl md:text-2xl text-red-400 mb-8 font-light animate-slide-up" style={{ animationDelay: "0.2s" }}>
            BOLLYWOOD FUSION IN ROCK METAL
          </p>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.4s" }}>
            Where the raw power of heavy metal collides with the soul of Bollywood. Experience the revolution.
          </p>
          <div className="flex gap-4 justify-center flex-wrap animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <a href="#music" className="px-8 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50">
              LISTEN NOW
            </a>
            <a href="#tour" className="px-8 py-3 border-2 border-red-600 hover:bg-red-600/10 rounded text-white font-bold transition-all duration-300">
              TOUR DATES
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" style={{ opacity: Math.max(0, 1 - scrollY / 300) }}>
          <div className="text-red-500 text-2xl">↓</div>
        </div>
      </section>

      {/* ── ABOUT SECTION ── */}
      <section id="about" ref={aboutRef.ref} className="py-20 px-4 bg-black relative diagonal-cut-top-padding overflow-hidden" style={{ backgroundImage: `url(${ASSETS.aboutBg})`, backgroundAttachment: "fixed", backgroundSize: "cover", backgroundPosition: "center", clipPath: "polygon(0 3%, 100% 0, 100% 100%, 0 100%)" }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-purple-600/5" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-left">
              {/* Accent line */}
              <div className="h-1 w-16 bg-gradient-to-r from-red-600 to-red-400 mb-6 rounded-full" />
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-oswald text-red-500 leading-tight">
                WHERE TWO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">WORLDS</span> COLLIDE
              </h2>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed border-l-4 border-red-600/50 pl-4 hover:border-red-600 transition-colors duration-300">
                Ashruta represents a groundbreaking fusion of two powerful musical traditions. Born from a vision to blend the intensity of heavy metal with the soul and complexity of Bollywood, we've created something entirely new—a sound that's aggressive, melodic, intricate, and utterly unforgettable.
              </p>
              
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Our journey began when five musicians from different backgrounds realized that their unique perspectives could create magic together. What started as an experiment has evolved into a movement, challenging conventions and redefining what metal can be.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Every note we play, every riff we craft, and every lyric we deliver is a testament to the beauty of cultural fusion and the universal language of music. This is Ashruta—this is the future of metal.
              </p>
              
              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 hover:bg-red-600/20 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
                  <div className="text-2xl font-bold text-red-500 font-oswald">5</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Musicians</div>
                </div>
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 hover:bg-red-600/20 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
                  <div className="text-2xl font-bold text-red-500 font-oswald">∞</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Possibilities</div>
                </div>
                <div className="bg-red-600/10 border border-red-600/30 rounded-lg p-4 hover:bg-red-600/20 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20">
                  <div className="text-2xl font-bold text-red-500 font-oswald">1</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Sound</div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-right relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 to-purple-600/20 rounded-lg blur-2xl" />
              
              <img
                src={ASSETS.aboutBg}
                alt="Band performing"
                className="rounded-lg shadow-2xl w-full h-96 object-cover relative z-10 border-2 border-red-600/30 hover:border-red-600/60 transition-all duration-300 hover:shadow-2xl hover:shadow-red-600/40"
              />
              
              {/* Corner accents */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-red-600 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-red-600 rounded-bl-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERS SECTION ── */}
      <section id="members" ref={membersRef.ref} className="py-20 px-4 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-oswald text-red-500 animate-fade-in">
            THE CULT
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {BAND_MEMBERS.map((member, i) => (
              <div
                key={i}
                className="animate-scale-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <MemberCard
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  instagram={member.instagram}
                  onCardClick={() => openMemberModal(member)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MUSIC & MEDIA SECTION ── */}
      <section id="music" ref={musicRef.ref} className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">LISTEN & WATCH</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              Music & <span className="text-red-500">Media</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Music Player - Coming Soon */}
            <div className="animate-slide-left">
              <div className="bg-gradient-to-br from-red-950/30 to-black border-2 border-red-600/50 rounded-lg p-12 text-center">
                <h3 className="text-2xl font-bold mb-4 font-oswald text-red-500">Featured Tracks</h3>
                <div className="mb-8">
                  <div className="text-6xl mb-4">🎵</div>
                  <p className="text-gray-300 text-lg mb-2">Original Music Coming Soon</p>
                  <p className="text-gray-400 text-sm">We are working on our debut album. Stay tuned for exclusive tracks and releases.</p>
                </div>
                <div className="flex gap-3 justify-center flex-wrap">
                  <a href="#newsletter" className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50">
                    Notify Me
                  </a>
                </div>
              </div>
              <StreamingPlatforms comingSoon={true} />
            </div>

            {/* Video Gallery */}
            <div className="animate-slide-right">
              <h3 className="text-2xl font-bold mb-6 font-oswald text-red-500">Performance Videos</h3>
              <div className="grid grid-cols-2 gap-4">
            {PERFORMANCE_VIDEOS.map((video, i) => (
              <button
                key={i}
                onClick={() => { setSelectedVideo(video); setVideoModalOpen(true); }}
                className="video-thumbnail relative group overflow-hidden rounded-lg h-32"
              >
                    <video
                      src={video.src}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <Play className="w-12 h-12 text-red-500 group-hover:scale-125 transition-transform duration-300" fill="currentColor" />
                    </div>
                    <p className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-xs p-2 group-hover:bg-red-600/80 transition-colors">
                      {video.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section id="gallery" ref={galleryRef.ref} className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">VISUAL MOMENTS</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              Photo <span className="text-red-500">Gallery</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Behind-the-scenes moments, live performances, and studio sessions that capture the essence of Ashruta
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((image, i) => (
              <button
                key={i}
                onClick={() => setSelectedGalleryImage(image.src)}
                className={`group relative overflow-hidden rounded-lg h-64 ${
                  i === 0 ? 'rotate-scale' : i === 1 ? 'rotate-scale' : i === 2 ? 'rotate-scale' : 'rotate-scale'
                }`}
                style={{ opacity: 0, animationDelay: `${i * 0.15}s` }}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-300 flex flex-col items-center justify-center">
                  <Play className="w-12 h-12 text-red-500 mb-2 group-hover:scale-125 transition-transform duration-300" fill="currentColor" />
                  <p className="text-white text-sm font-semibold text-center px-2">{image.title}</p>
                  <span className="text-red-400 text-xs mt-2">{image.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOUR DATES SECTION ── */}
      <section id="tour" ref={tourRef.ref} className="py-20 px-4 bg-gradient-to-b from-black via-gray-900 to-black atmosphere-haze">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">LIVE SHOWS</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              Upcoming <span className="text-red-500">Shows</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TOUR_DATES.map((show, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br from-gray-900 to-gray-950 p-8 rounded-lg border border-gray-800 hover:border-red-600/50 transition-all duration-300 ${
                  i === 0 ? 'bounce-pop-in-1' : i === 1 ? 'bounce-pop-in-2' : 'bounce-pop-in-3'
                } group`}
                style={{ opacity: 0 }}
              >
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-red-500 mb-3">
                    <Calendar size={18} />
                    <span className="font-bold text-sm tracking-wide">{show.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">{show.venue}</h3>
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin size={16} />
                    <span className="text-sm">{show.city}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-widest ${
                    show.status === "Tickets Available" 
                      ? "bg-green-600/20 text-green-400 border border-green-600/50" 
                      : "bg-yellow-600/20 text-yellow-400 border border-yellow-600/50"
                  }`}>
                    {show.status}
                  </span>
                </div>
                
                <a
                  href={show.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-block px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-bold text-center transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 group-hover:scale-105 transform"
                >
                  BUY TICKETS
                </a>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 bg-gradient-to-r from-red-600/10 to-red-600/5 border border-red-600/30 rounded-lg text-center animate-fade-in">
            <p className="text-gray-400 mb-3">Can't find your show or need to book directly?</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <span className="text-white font-semibold">Call us to book tickets:</span>
              <a href="tel:8076861755" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 flex items-center gap-2">
                <Phone size={18} />
                +91 8076861755
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG SECTION ── */}
      <section id="blog" ref={blogRef.ref} className="py-20 px-4 bg-gradient-to-b from-blue-950/20 via-gray-950 to-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">STORIES & INSIGHTS</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              The <span className="text-red-500">Blog</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                className={`bg-black rounded-lg overflow-hidden hover:shadow-2xl hover:shadow-red-600/30 transition-all duration-300 ${
                  i === 0 ? 'slide-in-left-1' : i === 1 ? 'slide-in-left-2' : 'slide-in-left-3'
                }`}
                style={{ opacity: 0 }}
              >
                <img src={'image' in post ? post.image : post.imageUrl || ASSETS.blog1} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-red-500 text-sm font-semibold">{'date' in post ? post.date : new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span className="text-gray-500 text-sm">By {post.author || 'Ashruta'}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{post.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
                  <button
                    onClick={() => setExpandedBlog(expandedBlog === i ? null : i)}
                    className="text-red-500 hover:text-red-400 font-semibold text-sm flex items-center gap-2 transition-colors"
                  >
                    READ MORE <ArrowRight size={14} />
                  </button>
                  {expandedBlog === i && (
                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <p className="text-gray-300 text-sm leading-relaxed">{post.content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTAGRAM SECTION ── */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">FOLLOW US</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              Connect on <span className="text-red-500">Instagram</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Stay updated with behind-the-scenes content, live performances, and exclusive updates from Ashruta and our members.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="animate-slide-left">
              <InstagramFeed
                username="ashruta_theband"
                profileUrl="https://www.instagram.com/ashruta_theband"
                displayName="ASHRUTA--ARAMBH"
                bio="Bollywood Fusion in Rock Metal | Official Band Account"
                followers="1.2K+"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section id="contact" ref={contactRef.ref} className="py-20 px-4 bg-gradient-to-b from-gray-900 via-red-950/30 to-black relative diagonal-cut-bottom-padding atmosphere-smoke" style={{ clipPath: "polygon(0 0, 100% 2%, 100% 100%, 0 98%)" }}>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">GET IN TOUCH</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              Contact <span className="text-red-500">Ashruta</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Have questions, booking inquiries, or just want to say hello? Reach out to us and let's connect.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-slide-left">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  contactMutation.mutate(contactFormData);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={contactFormData.name}
                    onChange={(e) => setContactFormData({ ...contactFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={contactFormData.email}
                    onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactFormData.subject}
                    onChange={(e) => setContactFormData({ ...contactFormData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Message subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message</label>
                  <textarea
                    value={contactFormData.message}
                    onChange={(e) => setContactFormData({ ...contactFormData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors h-32 resize-none"
                    placeholder="Your message here..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed rounded text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
                >
                  {contactMutation.isPending ? "SENDING..." : "SEND MESSAGE"}
                </button>
                {contactSubmitted && (
                  <p className="text-green-400 text-sm text-center animate-fade-in">✓ Message received! We'll get back to you within 24 hours.</p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="animate-slide-right space-y-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-red-600/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                    <p className="text-gray-400">contact@ashrutaband.com</p>
                    <p className="text-gray-500 text-sm mt-1">We respond within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-red-600/50 transition-colors">
                <div className="flex items-start gap-4">
                  <Instagram className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Instagram</h3>
                    <div className="space-y-1">
                      <p className="text-gray-400 text-sm"><a href="https://www.instagram.com/goutam_d_gaayak" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">@goutam_d_gaayak</a></p>
                      <p className="text-gray-400 text-sm"><a href="https://www.instagram.com/chinmax_mewzik" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">@chinmax_mewzik</a></p>
                      <p className="text-gray-400 text-sm"><a href="https://www.instagram.com/parth_plays_keys" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">@parth_plays_keys</a></p>
                      <p className="text-gray-400 text-sm"><a href="https://www.instagram.com/ayanyash_" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors">@ayanyash_</a></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-red-600/50 transition-colors">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Location</h3>
                    <p className="text-gray-400">India</p>
                    <p className="text-gray-500 text-sm mt-1">Based in India, performing worldwide</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-600/20 to-red-600/5 p-6 rounded-lg border border-red-600/50 hover:border-red-600 transition-colors">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Book Tickets</h3>
                    <a href="tel:8076861755" className="text-red-400 hover:text-red-300 transition-colors font-semibold">+91 8076861755</a>
                    <p className="text-gray-500 text-sm mt-1">Call us for direct booking inquiries</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOOKING SECTION ── */}
      <section id="booking" className="py-20 px-4 bg-gradient-to-b from-black via-purple-950/20 to-black border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <p className="text-red-500 font-semibold tracking-widest mb-2">BOOK ASHRUTA</p>
            <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
              Event <span className="text-red-500">Booking</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Interested in booking Ashruta for your event? Fill out the form below and we'll get back to you with details and availability.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                bookingMutation.mutate(bookingFormData);
              }}
              className="space-y-4 animate-slide-left"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={bookingFormData.name}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Email *</label>
                  <input
                    type="email"
                    value={bookingFormData.email}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={bookingFormData.phone}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Event Date</label>
                  <input
                    type="date"
                    value={bookingFormData.eventDate}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, eventDate: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Event Type</label>
                  <select
                    value={bookingFormData.eventType}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, eventType: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                  >
                    <option value="">Select event type</option>
                    <option value="Festival">Festival</option>
                    <option value="Concert">Concert</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Private Party">Private Party</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Venue Name</label>
                  <input
                    type="text"
                    value={bookingFormData.venue}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, venue: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Venue or location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    value={bookingFormData.city}
                    onChange={(e) => setBookingFormData({ ...bookingFormData, city: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="City"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Additional Details</label>
                <textarea
                  value={bookingFormData.message}
                  onChange={(e) => setBookingFormData({ ...bookingFormData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us more about your event (budget, expected attendance, special requirements, etc.)"
                  rows={5}
                />
              </div>

              <button
                type="submit"
                disabled={bookingMutation.isPending || bookingSubmitted}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold rounded transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 disabled:cursor-not-allowed"
              >
                {bookingMutation.isPending ? "Submitting..." : "Submit Booking Inquiry"}
              </button>

              {bookingSubmitted && (
                <p className="text-green-400 text-sm text-center animate-fade-in">✓ Booking inquiry received! We'll contact you within 48 hours.</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ── FAQ SECTION ── */}
      <section id="faq" className="py-20 px-4 bg-black border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <FAQAccordion
            items={FAQ_ITEMS}
            title="Frequently Asked Questions"
            description="Find answers to common questions about booking, our music, and the band."
          />
        </div>
      </section>

      {/* ── NEWSLETTER SECTION ── */}
      <section id="newsletter" ref={newsletterRef.ref} className="py-20 px-4 bg-gradient-to-b from-black to-red-950/20">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="text-red-500 font-semibold tracking-widest mb-4">STAY CONNECTED</p>
          <h2 className="text-4xl md:text-5xl font-bold font-oswald mb-4">
            Join the <span className="text-red-500">Cult</span>
          </h2>
          <p className="text-gray-300 mb-8">
            Be the first to hear new tracks, get exclusive content, and receive tour date announcements.
          </p>
          <form className="flex gap-2 mb-6" onSubmit={(e) => { e.preventDefault(); newsletterMutation.mutate({ email: newsletterEmail }); }}>
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-gray-900 text-white rounded border border-gray-800 focus:border-red-600 focus:outline-none transition-colors"
              required
            />
            <button
              type="submit"
              disabled={newsletterMutation.isPending}
              className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed rounded text-white font-bold transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50"
            >
              {newsletterMutation.isPending ? "..." : "SUBSCRIBE"}
            </button>
          </form>
          <p className="text-gray-500 text-sm">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-black border-t border-gray-900 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">ASHRUTA</h3>
              <p className="text-gray-400 text-sm">Bollywood Fusion in Rock Metal</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-red-500 transition-colors">About</a></li>
                <li><a href="#music" className="hover:text-red-500 transition-colors">Music</a></li>
                <li><a href="#tour" className="hover:text-red-500 transition-colors">Tour</a></li>
                <li><a href="#blog" className="hover:text-red-500 transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4">FOLLOW US</h3>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/goutam_d_gaayak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Ashruta the Band. All rights reserved. | Crafted with 🔥 and 🎸</p>
          </div>
        </div>
      </footer>

      {/* ── VIDEO MODAL ── */}
      {selectedVideo && (
        <VideoModal videoSrc={selectedVideo.src} title={selectedVideo.title} isOpen={videoModalOpen} onClose={() => { setVideoModalOpen(false); setSelectedVideo(null); }} />
      )}

      {/* ── GALLERY IMAGE MODAL ── */}
      {selectedGalleryImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedGalleryImage(null)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-500 transition-colors"
            >
              <X size={32} />
            </button>
            <img src={selectedGalleryImage} alt="Gallery" className="w-full rounded-lg" />
          </div>
        </div>
      )}

      {/* Member Modal */}
      <MemberModal
        member={selectedMember}
        isOpen={isMemberModalOpen}
        onClose={closeMemberModal}
      />
    </div>
  );
}
