import { useEffect, useRef } from "react";
import Hls from "hls.js";


type VideoPlayerProps = {
  src: string;
};

export const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && src) {
      if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari natively supports HLS
        videoRef.current.src = src;
      } else if (Hls.isSupported()) {
        // Other browsers use hls.js
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: "100%", borderRadius: "12px" }}
    />
  );
};
