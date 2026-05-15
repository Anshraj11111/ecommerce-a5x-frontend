import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import AdminPage from "./AdminPage";
import a5xCarKit from "../assets/a5x-car-kit.jpg";

function AdminCourses() {
  const { courses, deleteCourse, updateCourse } = useAdminStore();
  return (
    <AdminPage title="Courses & Videos">
      <div className="admin-tools">
        <Link to="/admin/courses/new" className="btn">+ New Course</Link>
      </div>
      <div className="admin-courses-grid">
        {courses.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--brand-steel)' }}>
            <p>No courses yet. Create your first course!</p>
          </div>
        )}
        {courses.map((course) => (
          <div key={course.id} className="admin-course-card">
            <div className="admin-course-thumb">
              <img src={course.thumbnailUrl || a5xCarKit} alt={course.title} />
              <span className={`admin-course-status ${course.isPublished ? 'published' : 'draft'}`}>
                {course.isPublished ? 'Published' : 'Draft'}
              </span>
              <span className="admin-course-level-tag">{course.level}</span>
            </div>
            <div className="admin-course-info">
              <h3 className="admin-course-title">{course.title}</h3>
              <p className="admin-course-meta">
                <span>{course.category}</span>
                <span>·</span>
                <span>{course.videos?.length || 0} videos</span>
                <span>·</span>
                <span>By {course.instructor || 'Unknown'}</span>
              </p>
              {course.youtubeUrl && (
                <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer" className="admin-course-yt-link">
                  🔗 YouTube Link
                </a>
              )}
            </div>
            <div className="admin-course-actions">
              <label className="admin-course-toggle">
                <input type="checkbox" checked={course.isPublished} onChange={(e) => updateCourse(course.id, { isPublished: e.target.checked })} />
                <span>{course.isPublished ? 'Published' : 'Draft'}</span>
              </label>
              <div className="admin-course-btns">
                <Link to={`/admin/courses/${course.id}`} className="admin-course-edit-btn"><Pencil size={14} /> Edit</Link>
                <button className="admin-course-delete-btn" onClick={() => { if (confirm(`Delete "${course.title}"?`)) deleteCourse(course.id); }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}

export default AdminCourses;
