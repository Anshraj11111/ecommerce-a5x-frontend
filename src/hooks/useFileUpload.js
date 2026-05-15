import { useState } from "react";

function useFileUpload({ types = [], maxMb = 5 } = {}) {
  const [state, setState] = useState({ progress: 0, previewUrl: "", storedKey: "", error: "", duration: 0 });
  const upload = (file) => {
    if (!file) return;
    if (types.length && !types.some((type) => file.type.includes(type))) return setState({ progress: 0, previewUrl: "", storedKey: "", error: "Unsupported file type", duration: 0 });
    if (file.size > maxMb * 1024 * 1024) return setState({ progress: 0, previewUrl: "", storedKey: "", error: `Max ${maxMb}MB`, duration: 0 });
    
    const storedKey = `a5x-upload-${Date.now()}-${file.name}`;
    setState({ progress: 12, previewUrl: "", storedKey, error: "", duration: 0 });
    
    const reader = new FileReader();
    reader.onloadstart = () => {
      setState((current) => ({ ...current, progress: 20 }));
    };
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = Math.round((e.loaded / e.total) * 80) + 20;
        setState((current) => ({ ...current, progress }));
      }
    };
    reader.onload = (e) => {
      const base64String = e.target.result;
      setState({ progress: 100, previewUrl: base64String, storedKey, error: "", duration: 0 });
      
      if (file.type.includes("video")) {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.onloadedmetadata = () => setState((current) => ({ ...current, duration: Math.round(video.duration || 0) }));
        video.src = base64String;
      }
    };
    reader.onerror = () => {
      setState({ progress: 0, previewUrl: "", storedKey: "", error: "Upload failed", duration: 0 });
    };
    
    reader.readAsDataURL(file);
  };
  return { ...state, upload };
}

export default useFileUpload;
