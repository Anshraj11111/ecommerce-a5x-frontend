import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAdminStore from "../../stores/useAdminStore";
import AdminPage from "../AdminPage";
import { seconds } from "../../config/constants";
import a5xCarKit from "../../assets/a5x-car-kit.jpg";

function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, addCourse, updateCourse } = useAdminStore();
  const course = courses.find((item) => item.id === id);
  const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnailUrl || '');

  function handleThumbnailChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setThumbnailPreview(ev.target.result);
    reader.readAsDataURL(file);
  }

  function submit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const payload = {
      ...course, ...data,
      thumbnailUrl: thumbnailPreview || course?.thumbnailUrl || a5xCarKit,
      youtubeUrl: data.youtubeUrl || course?.youtubeUrl || '',
      tags: data.tags ? data.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      isFeatured: data.isFeatured === "on",
      isPublished: data.isPublished === "on",
      videos: course?.videos || [],
      createdAt: course?.createdAt || new Date().toISOString().slice(0, 10),
    };
    course ? updateCourse(course.id, payload) : addCourse(payload);
    navigate("/admin/courses");
  }

  return (
    <AdminPage title={course ? "Edit Course" : "New Course"}>
      <form className="admin-form" onSubmit={submit}>
        <div className="admin-form-group">
          <label className="admin-label">Course Title *</label>
          <input name="title" defaultValue={course?.title} placeholder="e.g. Robotics From Zero" required />
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Description</label>
          <textarea name="description" defaultValue={course?.description} placeholder="What will students learn?" rows={3} />
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Level</label>
            <select name="level" defaultValue={course?.level || "BEGINNER"}>
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Category</label>
            <input name="category" defaultValue={course?.category || "Robotics"} placeholder="e.g. Arduino, ESP32" />
          </div>
        </div>
        <div className="admin-form-row">
          <div className="admin-form-group">
            <label className="admin-label">Instructor Name</label>
            <input name="instructor" defaultValue={course?.instructor} placeholder="Instructor name" />
          </div>
          <div className="admin-form-group">
            <label className="admin-label">Tags (comma separated)</label>
            <input name="tags" defaultValue={course?.tags?.join(", ")} placeholder="Arduino, Motors, Sensors" />
          </div>
        </div>
        <div className="admin-form-group">
          <label className="admin-label">Course Thumbnail Image</label>
          <input type="file" accept="image/*" onChange={handleThumbnailChange} />
          {thumbnailPreview && <img src={thumbnailPreview} alt="Thumbnail preview" style={{ width: '200px', height: '120px', objectFit: 'cover', borderRadius: '8px', marginTop: '8px' }} />}
        </div>
        <div className="admin-form-group">
          <label className="admin-label">🎬 YouTube Video Link</label>
          <input name="youtubeUrl" defaultValue={course?.youtubeUrl} placeholder="https://www.youtube.com/watch?v=..." />
          <small style={{ color: 'var(--brand-steel)', fontSize: '12px', marginTop: '4px' }}>Paste your YouTube video URL here. Students click "Watch Now" to open it.</small>
        </div>
        <div className="admin-form-row">
          <label className="admin-checkbox-label"><input type="checkbox" name="isFeatured" defaultChecked={course?.isFeatured} /><span>Featured Course</span></label>
          <label className="admin-checkbox-label"><input type="checkbox" name="isPublished" defaultChecked={course?.isPublished ?? true} /><span>Published</span></label>
        </div>
        <button type="submit" className="admin-save-btn">{course ? "Update Course" : "Create Course"}</button>
      </form>

      {course && (
        <div className="admin-videos-section">
          <div className="admin-videos-header">
            <h3>Course Videos ({course.videos?.length || 0})</h3>
            <Link to={`/admin/courses/${course.id}/videos/new`} className="btn">+ Add Video</Link>
          </div>
          {course.videos?.length > 0 ? (
            <div className="admin-videos-list">
              {course.videos.map((video, index) => (
                <div key={video.id} className="admin-video-item">
                  <span className="admin-video-num">{String(index + 1).padStart(2, '0')}</span>
                  <img src={video.thumbnailUrl || a5xCarKit} alt="" className="admin-video-thumb" />
                  <div className="admin-video-info">
                    <strong>{video.title}</strong>
                    <span>{video.videoUrl ? '🔗 YouTube Link' : '📝 No video'} • {seconds(video.duration || 0)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--brand-steel)', padding: '20px 0' }}>No videos yet. Add your first video!</p>
          )}
        </div>
      )}
    </AdminPage>
  );
}

export default CourseForm;
