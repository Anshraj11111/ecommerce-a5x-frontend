import React from "react";
import { Link } from "react-router-dom";
import { ListVideo, Play, Star } from "lucide-react";
import { seconds } from "../../config/constants";
import a5xCarKit from "../../assets/a5x-car-kit.jpg";

export function CourseMiniCard({ course }) {
  const videos = course.videos || [];
  const total = videos.reduce((sum, video) => sum + (video.duration || 0), 0);
  const firstVideo = videos[0];
  const watchLink = firstVideo ? `/learn/${course.id}/${firstVideo.id}` : `/learn/${course.id}`;
  return (
    <Link to={watchLink} className="course-mini-card">
      <div className="course-mini-thumb">
        <img src={course.thumbnailUrl || a5xCarKit} alt={course.title} />
        <div className="course-mini-play"><Play size={18} /></div>
      </div>
      <div className="course-mini-body">
        <span className="course-mini-level">{course.level}</span>
        <h4>{course.title}</h4>
        <div className="course-mini-meta">
          <span><ListVideo size={13} /> {videos.length} videos</span>
          <span>{seconds(total)}</span>
        </div>
      </div>
    </Link>
  );
}

export function LargeCourseCard({ course }) {
  const videos = course.videos || [];
  const tags = course.tags || [];
  const firstVideo = videos[0];
  const watchLink = firstVideo ? `/learn/${course.id}/${firstVideo.id}` : `/learn/${course.id}`;
  return (
    <div className="large-course-card">
      <Link to={watchLink} className="large-course-thumb">
        <img src={course.thumbnailUrl || a5xCarKit} alt={course.title} />
        <div className="large-course-play"><Play size={28} /></div>
        <span className="large-course-level">{course.level}</span>
      </Link>
      <div className="large-course-body">
        <span className="large-course-category">{course.category}</span>
        <h3><Link to={watchLink}>{course.title}</Link></h3>
        <p>{course.description}</p>
        <div className="large-course-tags">
          {tags.map((t) => <span key={t} className="learn-tag">{t}</span>)}
        </div>
        <div className="large-course-meta">
          <span><ListVideo size={14} /> {videos.length} videos</span>
          <span>By {course.instructor}</span>
        </div>
      </div>
    </div>
  );
}
