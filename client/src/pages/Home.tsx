import { Button } from "@/components/ui/button";
import { Mail, Instagram, Youtube, Music, Play } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const bandMembers = [
    {
      name: "Goutam Das",
      role: "Founder & Vocalist",
      instagram: "https://www.instagram.com/goutam_d_gaayak",
      description: "Visionary founder bringing powerful vocals to the fusion sound",
    },
    {
      name: "Chinmay",
      role: "Electric Guitarist",
      instagram: "https://www.instagram.com/chinmax_mewzik",
      description: "Master of heavy riffs and metal guitar techniques",
    },
    {
      name: "Parth",
      role: "On Keys",
      instagram: "https://www.instagram.com/parth_plays_keys",
      description: "Creates melodic layers bridging Bollywood and metal",
    },
    {
      name: "Rachita",
      role: "Flute",
      instagram: "#",
      description: "Brings traditional Indian flute elements to the metal sound",
    },
    {
      name: "Ayan Yash",
      role: "Managing Director",
      instagram: "https://www.instagram.com/ayanyash_",
      description: "Visionary manager guiding the band's direction",
    },
  ];

  const blogPosts = [
    {
      title: "Behind the Scenes: Recording Our Latest Album",
      excerpt: "Dive into the creative process as we blend Bollywood melodies with heavy metal intensity.",
      date: "April 15, 2026",
    },
    {
      title: "Ashruta Live at the Metal Festival",
      excerpt: "An unforgettable performance that left the crowd electrified. See highlights from our set.",
      date: "April 8, 2026",
    },
    {
      title: "The Fusion Revolution: Why Bollywood Meets Metal",
      excerpt: "Exploring the unique intersection of two powerful musical traditions.",
      date: "March 28, 2026",
    },
  ];

  const upcomingEvents = [
    {
      date: "May 10, 2026",
      venue: "The Metal Dome",
      city: "Mumbai, India",
    },
    {
      date: "May 25, 2026",
      venue: "Rock Arena",
      city: "Delhi, India",
    },
    {
      date: "June 8, 2026",
      venue: "Bangalore Metal Fest",
      city: "Bangalore, India",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-red-600/30">
        <div className="container flex items-center justify-between py-4">
          <div className="text-2xl font-bold text-red-600">ASHRUTA</div>
          <div className="hidden md:flex gap-8">
            <a href="#about" className="hover:text-red-600 transition">About</a>
            <a href="#members" className="hover:text-red-600 transition">Members</a>
            <a href="#music" className="hover:text-red-600 transition">Music</a>
            <a href="#tour" className="hover:text-red-600 transition">Tour</a>
            <a href="#blog" className="hover:text-red-600 transition">Blog</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-red-950/20 to-black">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8 animate-pulse">
            <div className="text-6xl md:text-8xl font-bold text-red-600 mb-4 drop-shadow-lg" style={{ textShadow: '0 0 30px rgba(204, 0, 0, 0.5)' }}>
              ASHRUTA
            </div>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
            The Evolution of Rock Metal
          </h2>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Pioneering Bollywood Fusion in Heavy Metal
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 border-2 border-red-600">
              Listen Now
            </button>
            <button className="px-8 py-4 border-2 border-red-600 text-red-600 font-bold uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all duration-300">
              Tour Dates
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black border-t border-b border-red-600/20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-video bg-gradient-to-br from-red-900/30 to-black border-2 border-red-600/30 rounded-sm flex items-center justify-center">
              <div className="text-center">
                <Music className="w-24 h-24 text-red-600 mx-auto mb-4" />
                <p className="text-gray-400">Performance footage coming soon</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-red-600">About Ashruta</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Ashruta represents a groundbreaking fusion of two powerful musical traditions. We blend the raw intensity and aggression of heavy metal with the rich, melodic traditions of Bollywood music.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our unique sound bridges cultures, creating an immersive experience that honors both the classical Indian musical heritage and the modern metal aesthetic. Each performance is a journey through fire and melody.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With a five-member ensemble featuring vocals, electric guitar, keys, and traditional flute, we create a sonic landscape unlike anything you've heard before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Band Members Section */}
      <section id="members" className="py-20 bg-gradient-to-b from-black to-red-950/10">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-red-600">Meet the Band</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bandMembers.map((member, idx) => (
              <div
                key={idx}
                className="group relative bg-card border border-red-600/20 hover:border-red-600/60 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20"
              >
                <div className="aspect-square bg-gradient-to-br from-red-900/20 to-black mb-4 flex items-center justify-center border border-red-600/30 group-hover:border-red-600/60 transition-colors">
                  <Music className="w-12 h-12 text-red-600/50 group-hover:text-red-600 transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                <p className="text-red-600 text-sm font-bold mb-3 uppercase tracking-wider">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4">{member.description}</p>
                
                {member.instagram !== "#" && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-400 transition text-sm font-bold"
                  >
                    <Instagram className="w-4 h-4" />
                    Follow
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music & Media Section */}
      <section id="music" className="py-20 bg-black border-t border-red-600/20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-red-600">Music & Media</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Music Player */}
            <div className="bg-card border border-red-600/30 p-8 rounded-sm">
              <h3 className="text-2xl font-bold mb-6 text-white">Listen to Our Tracks</h3>
              <div className="space-y-4">
                <div className="bg-black/50 p-4 border border-red-600/20 hover:border-red-600/60 transition cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <Play className="w-6 h-6 text-red-600 group-hover:text-red-400" />
                    <div className="flex-1">
                      <p className="font-bold text-white">Track coming soon</p>
                      <p className="text-sm text-gray-400">Ashruta Original</p>
                    </div>
                  </div>
                </div>
                <div className="bg-black/50 p-4 border border-red-600/20 hover:border-red-600/60 transition cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <Play className="w-6 h-6 text-red-600 group-hover:text-red-400" />
                    <div className="flex-1">
                      <p className="font-bold text-white">Track coming soon</p>
                      <p className="text-sm text-gray-400">Ashruta Original</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Gallery */}
            <div className="bg-card border border-red-600/30 p-8 rounded-sm">
              <h3 className="text-2xl font-bold mb-6 text-white">Performance Videos</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-video bg-black/50 border border-red-600/20 hover:border-red-600/60 flex items-center justify-center cursor-pointer group transition">
                    <Play className="w-12 h-12 text-red-600/50 group-hover:text-red-600 transition" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Dates Section */}
      <section id="tour" className="py-20 bg-gradient-to-b from-black to-red-950/10">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-red-600">Upcoming Tour Dates</h2>
          
          <div className="space-y-4">
            {upcomingEvents.map((event, idx) => (
              <div key={idx} className="bg-card border border-red-600/20 hover:border-red-600/60 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-red-600 font-bold text-lg mb-2">{event.date}</p>
                  <p className="text-white text-xl font-bold">{event.venue}</p>
                  <p className="text-gray-400">{event.city}</p>
                </div>
                <button className="px-6 py-3 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 border-2 border-red-600 w-full md:w-auto">
                  Get Tickets
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-black border-t border-red-600/20">
        <div className="container">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-red-600">Latest News & Blog</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="bg-card border border-red-600/20 hover:border-red-600/60 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 overflow-hidden group cursor-pointer">
                <div className="h-40 bg-gradient-to-br from-red-900/20 to-black border-b border-red-600/20 flex items-center justify-center">
                  <Music className="w-16 h-16 text-red-600/30 group-hover:text-red-600/50 transition" />
                </div>
                <div className="p-6">
                  <p className="text-red-600 text-sm font-bold mb-2">{post.date}</p>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-red-600 transition">{post.title}</h3>
                  <p className="text-gray-400 mb-4">{post.excerpt}</p>
                  <a href="#" className="text-red-600 hover:text-red-400 font-bold text-sm uppercase tracking-wider transition">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-black to-red-950/10 border-t border-red-600/20">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-red-600">Join the Cult</h2>
            <p className="text-gray-300 text-lg">Get the latest tracks and tour dates first</p>
          </div>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 bg-card border border-red-600/30 text-white placeholder-gray-500 focus:outline-none focus:border-red-600 transition"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider hover:bg-red-700 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/50 border-2 border-red-600 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          {subscribed && (
            <p className="text-center text-green-400 mt-4 font-bold">Thanks for subscribing! 🔥</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-red-600/20 py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">ASHRUTA</h3>
              <p className="text-gray-400">Pioneering Bollywood Fusion in Heavy Metal</p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#about" className="hover:text-red-600 transition">About</a></li>
                <li><a href="#members" className="hover:text-red-600 transition">Members</a></li>
                <li><a href="#tour" className="hover:text-red-600 transition">Tour</a></li>
                <li><a href="#blog" className="hover:text-red-600 transition">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/goutam_d_gaayak" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-600 transition">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600 transition">
                  <Youtube className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600 transition">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-red-600/20 pt-8 text-center text-gray-500">
            <p>&copy; 2026 Ashruta the Band. All rights reserved. | Pioneering the future of metal music.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
