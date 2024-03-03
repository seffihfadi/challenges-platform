import { useRef, useEffect } from "react";

const Backdrop = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = .4
    }
  }, []);

  return (
    <div className="back">
      <video 
        className="h-screen object-cover" 
        ref={videoRef} 
        src="/signup.mp4" 
        muted 
        loop 
        autoPlay 
      >
      </video>
      <div className="backdrop"></div>
    </div>
  )
}

export default Backdrop