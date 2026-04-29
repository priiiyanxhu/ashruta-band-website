import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from "lucide-react";

interface Track {
  title: string;
  artist: string;
  src: string;
  duration: string;
}

interface MusicPlayerProps {
  tracks: Track[];
}

export default function MusicPlayer({ tracks }: MusicPlayerProps) {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, []);

  const handleEnded = useCallback(() => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack((prev) => prev + 1);
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentTrack, tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [handleTimeUpdate, handleLoadedMetadata, handleEnded]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current && tracks[currentTrack]?.src) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [currentTrack]);

  const togglePlay = () => {
    if (!audioRef.current || !tracks[currentTrack]?.src) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handlePrev = () => {
    if (currentTrack > 0) {
      setCurrentTrack((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentTrack < tracks.length - 1) {
      setCurrentTrack((prev) => prev + 1);
    }
  };

  const selectTrack = (idx: number) => {
    setCurrentTrack(idx);
    setIsPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 100);
  };

  const formatTime = (t: number) => {
    if (isNaN(t)) return "0:00";
    const mins = Math.floor(t / 60);
    const secs = Math.floor(t % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#0d0d0d] border border-red-600/30 rounded-sm overflow-hidden">
      {/* Track List */}
      <div className="divide-y divide-red-600/10">
        {tracks.map((track, idx) => (
          <button
            key={idx}
            onClick={() => selectTrack(idx)}
            className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-all duration-200 hover:bg-red-600/10 ${
              currentTrack === idx ? "bg-red-600/15 border-l-2 border-red-600" : "border-l-2 border-transparent"
            }`}
          >
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              {currentTrack === idx && isPlaying ? (
                <div className="flex items-end gap-[2px] h-4">
                  <span className="w-[3px] bg-red-600 animate-pulse" style={{ height: "60%", animationDelay: "0ms" }} />
                  <span className="w-[3px] bg-red-600 animate-pulse" style={{ height: "100%", animationDelay: "150ms" }} />
                  <span className="w-[3px] bg-red-600 animate-pulse" style={{ height: "40%", animationDelay: "300ms" }} />
                </div>
              ) : (
                <span className="text-gray-500 text-sm font-mono">{String(idx + 1).padStart(2, "0")}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm truncate ${currentTrack === idx ? "text-red-500" : "text-white"}`}>
                {track.title}
              </p>
              <p className="text-xs text-gray-500 truncate">{track.artist}</p>
            </div>
            <span className="text-xs text-gray-500 font-mono shrink-0">{track.duration}</span>
          </button>
        ))}
      </div>

      {/* Player Controls */}
      <div className="bg-[#111] border-t border-red-600/30 p-4">
        <audio ref={audioRef}>
          {tracks[currentTrack]?.src && <source src={tracks[currentTrack].src} />}
        </audio>

        {/* Progress Bar */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-gray-500 font-mono w-10 text-right">{formatTime(currentTime)}</span>
          <div className="flex-1 relative h-1 bg-gray-800 rounded-full">
            <div
              className="absolute h-full bg-red-600 rounded-full"
              style={{ width: duration ? `${(currentTime / duration) * 100}%` : "0%" }}
            />
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <span className="text-xs text-gray-500 font-mono w-10">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 text-gray-400 hover:text-red-500 transition"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                setIsMuted(false);
              }}
              className="w-20 h-1 accent-red-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2 text-gray-400 hover:text-white transition disabled:opacity-30"
              disabled={currentTrack === 0}
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-red-600/40"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </button>
            <button
              onClick={handleNext}
              className="p-2 text-gray-400 hover:text-white transition disabled:opacity-30"
              disabled={currentTrack === tracks.length - 1}
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="w-24" />
        </div>
      </div>
    </div>
  );
}
