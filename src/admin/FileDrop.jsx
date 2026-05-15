import React from "react";
import { Upload } from "lucide-react";

function FileDrop({ upload, accept = "image/*,video/*" }) {
  return (
    <label className="drop">
      <Upload />
      <span>{upload.previewUrl ? "Uploaded preview ready" : "Drop or click to upload"}</span>
      <input type="file" accept={accept} onChange={(e) => upload.upload(e.target.files[0])} />
      {upload.progress > 0 && <i style={{ width: `${upload.progress}%` }} />}
      {upload.previewUrl && <img src={upload.previewUrl} alt="" />}
      {upload.error && <p>{upload.error}</p>}
    </label>
  );
}

export default FileDrop;
