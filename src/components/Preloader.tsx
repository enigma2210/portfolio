import { useEffect, useRef, useState } from 'react';
import LoadingScreen from './LoadingScreen';

interface PreloaderProps {
  onLoaded: () => void;
}

export default function Preloader({ onLoaded }: PreloaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);

  useEffect(() => {
    // Check if video has already been played in this session
    const hasPlayed = sessionStorage.getItem('preloaderPlayed');
    
    if (hasPlayed) {
      // Skip directly to loading screen
      setShowLoadingScreen(true);
      return;
    }

    const video = videoRef.current;
    if (!video) {
      // If video ref is not available, skip to loading screen
      setShowLoadingScreen(true);
      return;
    }

    const handleVideoEnd = () => {
      // Remove event listeners immediately to prevent multiple triggers
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      
      // Mark video as played in session storage
      sessionStorage.setItem('preloaderPlayed', 'true');
      
      // Transition to loading screen
      setShowLoadingScreen(true);
    };

    const handleVideoError = () => {
      // Remove event listeners immediately
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      
      // Mark as played even on error to prevent repeated errors
      sessionStorage.setItem('preloaderPlayed', 'true');
      
      // Skip to loading screen on error
      setShowLoadingScreen(true);
    };

    video.addEventListener('ended', handleVideoEnd);
    video.addEventListener('error', handleVideoError);

    // Try to play the video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Video playback failed:', error);
        handleVideoError();
      });
    }

    // Disable scrolling while preloader is visible
    document.body.style.overflow = 'hidden';

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      video.removeEventListener('error', handleVideoError);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (showLoadingScreen) {
    return <LoadingScreen onComplete={onLoaded} />;
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/assets/loader-video.mp4"
          muted
          playsInline
          loop={false}
        />
      </div>
    </div>
  );
}
