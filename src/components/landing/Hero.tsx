import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Volume2, VolumeX, Maximize } from "lucide-react";
import heroVideo from "@/assets/hero-mockup.webm";
import { useRef, useState } from "react";

import profile1 from "@/assets/profile-1.jpg";
import profile2 from "@/assets/profile-2.jpg";
import profile3 from "@/assets/profile-3.jpg";
import profile4 from "@/assets/profile-4.jpg";
import { Link } from "react-router-dom";

export const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 md:pt-0 pb-8 md:pb-0">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-90"
        style={{
          background: "var(--gradient-hero)",
          backgroundSize: "200% 200%",
        }}
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-3 lg:mb-6 animate-scale-in">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Meeting Assistant</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 lg:mb-6 leading-tight">
              <span className="lg:inline">Your AI</span>
              <br className="lg:hidden" />
              <span className="lg:inline whitespace-nowrap"> Meeting Assistant</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-4 lg:mb-8 leading-relaxed">
              Schedule Smarter, Not Harder
            </p>
            
            <p className="text-base lg:text-lg text-white/80 mb-6 lg:mb-10 max-w-2xl">
              Let AI handle your meeting scheduling through WhatsApp. Get automatic reminders, conflict resolution, and meeting summaries - all in your pocket.
            </p>

            {/* Mobile video - appears here on mobile only */}
            <div className="lg:hidden mb-6 relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative w-full aspect-video">
                <video 
                  ref={videoRef}
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover rounded-lg drop-shadow-2xl cursor-pointer"
                  onClick={togglePlay}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      togglePlay();
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                />
                
                {/* Custom video controls */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-white" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={toggleFullscreen}
                    className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
                    aria-label="Enter fullscreen"
                  >
                    <Maximize className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/auth?tab=signup">
                <Button size="xl" variant="hero" className="group">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            <a 
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Button size="xl" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">
                See How It Works
              </Button>
            </a>
            </div>
            
            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start text-white/80">
              <div className="flex -space-x-2">
                <img src={profile1} alt="User" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" />
                <img src={profile2} alt="User" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" />
                <img src={profile3} alt="User" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" />
                <img src={profile4} alt="User" className="w-10 h-10 rounded-full border-2 border-white/30 object-cover" />
              </div>
              <span className="text-sm">Trusted by 500+ professionals</span>
            </div>
          </div>

          {/* Right content - Hero mockup - Desktop only */}
          <div className="hidden lg:block relative animate-scale-in group" style={{ animationDelay: "0.2s" }}>
            <div className="relative w-full aspect-video">
              <video 
                ref={videoRef}
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 h-full w-full object-cover rounded-lg drop-shadow-2xl cursor-pointer"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    togglePlay();
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              />
              
              {/* Custom video controls */}
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={toggleMute}
                  className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-200"
                  aria-label="Enter fullscreen"
                >
                  <Maximize className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
