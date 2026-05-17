import React, { useRef, useState } from "react";
import SEO from "../components/common/SEO";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Check, ChevronLeft, ChevronRight, ListVideo, Play, Upload } from "lucide-react";
import useAdminStore from "../stores/useAdminStore";
import ProductCard from "../components/common/ProductCard";
import { useWatchProgress } from "../hooks/useWatchProgress";
import { courseCategories, seconds } from "../config/constants";
import learnGrid from "../assets/learn-grid.jpg";
import a5xCarKit from "../assets/a5x-car-kit.jpg";

function VideoPlayer({ videoUrl, poster, youtubeId }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const controlsTimer = useRef(null);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const patterns = [/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/, /youtube\.com\/shorts\/([^&\n?#]+)/];
    for (const p of patterns) { const m = url.match(p); if (m) return m[1]; }
    return null;
  };

  const ytId = youtubeId || getYoutubeId(videoUrl);
  const isYoutube = Boolean(ytId);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); } else { video.play().catch(() => {}); setPlaying(true); }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    setProgress((video.currentTime / video.duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    video.currentTime = ((e.clientX - rect.left) / rect.width) * video.duration;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

  if (isYoutube) {
    return (
      <div className="vp-wrapper vp-youtube">
        <iframe src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`} title="YouTube video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="vp-iframe" />
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="vp-wrapper">
        <div className="vp-no-video">
          <div className="vp-no-video-inner"><Play size={48} style={{ opacity: 0.3 }} /><p>No video available for this lesson</p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="vp-wrapper" onMouseMove={handleMouseMove} onClick={togglePlay}>
      <video ref={videoRef} src={videoUrl} poster={poster || a5xCarKit} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)} onEnded={() => setPlaying(false)} className="vp-video" />
      {!playing && <div className="vp-play-overlay"><div className="vp-play-btn"><Play size={36} /></div></div>}
      <div className={`vp-controls ${showControls || !playing ? 'visible' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="vp-progress" onClick={handleSeek}>
          <div className="vp-progress-fill" style={{ width: `${progress}%` }} />
          <div className="vp-progress-thumb" style={{ left: `${progress}%` }} />
        </div>
        <div className="vp-controls-row">
          <div className="vp-controls-left">
            <button className="vp-btn" onClick={togglePlay}>{playing ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <Play size={16} />}</button>
            <span className="vp-time">{fmt(currentTime)} / {fmt(duration)}</span>
          </div>
          <div className="vp-controls-right">
            <select className="vp-speed" value={speed} onChange={(e) => { const s = Number(e.target.value); setSpeed(s); if (videoRef.current) videoRef.current.playbackRate = s; }}>
              {[0.5, 1, 1.25, 1.5, 2].map(v => <option key={v} value={v}>{v}x</option>)}
            </select>
            <button className="vp-btn" onClick={() => videoRef.current?.requestFullscreen?.()}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoPlayerPage() {
  const { courseId, videoId } = useParams();
  const navigate = useNavigate();
  const courses = useAdminStore((state) => state.courses);
  const course = courses.find((item) => item.id === courseId) || courses[0];
  const videos = course?.videos || [];
  const video = videos.find((item) => item.id === videoId) || videos[0];
  const watchProgress = useWatchProgress(course);
  const relatedIds = video?.relatedProducts || [];
  const products = useAdminStore((state) => state.products).filter((product) => relatedIds.includes(product.id));
  const hasPDF = course?.pdfUrl && course.pdfUrl.trim() !== '';

  if (!course || !videos.length || !video) return (
    <main className="page player-page">
      <section style={{ textAlign: "center", paddingTop: "120px" }}>
        <h1>No Videos Available</h1>
        <p style={{ color: "var(--brand-steel)" }}>This course has no videos yet.</p>
        <button className="btn" onClick={() => navigate("/learn")}>Back to Courses</button>
      </section>
    </main>
  );

  const currentIndex = videos.findIndex(v => v.id === video.id);
  const prevVideo = currentIndex > 0 ? videos[currentIndex - 1] : null;
  const nextVideo = currentIndex < videos.length - 1 ? videos[currentIndex + 1] : null;

  return (
    <main className="watch-page">
      <div className="watch-breadcrumb">
        <Link to="/learn">Learn</Link><span>›</span>
        <Link to={`/learn/${course.id}/${videos[0]?.id}`}>{course.title}</Link><span>›</span>
        <span>{video.title}</span>
      </div>
      <div className="watch-layout-new">
        <div className="watch-main">
          <div className="watch-player-wrap">
            <VideoPlayer videoUrl={video.videoUrl} poster={video.thumbnailUrl || course.thumbnailUrl} youtubeId={video.youtubeId} />
          </div>
          <div className="watch-video-info">
            <div className="watch-video-header">
              <div>
                <span className="watch-video-num">Lesson {currentIndex + 1} of {videos.length}</span>
                <h1 className="watch-video-title">{video.title}</h1>
                <p className="watch-video-desc">{video.description}</p>
              </div>
              <div className="watch-video-actions">
                <button className={`watch-mark-btn ${watchProgress.isWatched(video.id) ? 'watched' : ''}`} onClick={() => watchProgress.markWatched(video.id)}>
                  <Check size={16} /> {watchProgress.isWatched(video.id) ? 'Watched' : 'Mark as Watched'}
                </button>
                {hasPDF && <a href={course.pdfUrl} download className="watch-pdf-btn"><Upload size={16} /> {course.pdfName || 'Download PDF'}</a>}
              </div>
            </div>
            <div className="watch-nav-btns">
              {prevVideo ? <Link to={`/learn/${course.id}/${prevVideo.id}`} className="watch-nav-btn"><ChevronLeft size={16} /> Previous</Link> : <div />}
              {nextVideo && <Link to={`/learn/${course.id}/${nextVideo.id}`} className="watch-nav-btn next">Next <ChevronRight size={16} /></Link>}
            </div>
          </div>
          {products.length > 0 && (
            <div className="watch-products">
              <h3 className="watch-section-title">🛒 Products Used in This Lesson</h3>
              <div className="watch-products-grid">{products.map((p) => <ProductCard key={p.id} product={p} compact />)}</div>
            </div>
          )}
        </div>
        <aside className="watch-sidebar">
          <div className="watch-sidebar-header">
            <img src={course.thumbnailUrl || learnGrid} alt={course.title} className="watch-sidebar-thumb" />
            <div><h3 className="watch-sidebar-title">{course.title}</h3><p className="watch-sidebar-instructor">By {course.instructor}</p></div>
          </div>
          <div className="watch-progress-bar">
            <div className="watch-progress-info"><span>Progress</span><span>{watchProgress.getCourseProgress()}%</span></div>
            <div className="watch-progress-track"><div className="watch-progress-fill" style={{ width: `${watchProgress.getCourseProgress()}%` }} /></div>
          </div>
          <div className="watch-playlist">
            {videos.map((item, index) => (
              <Link key={item.id} to={`/learn/${course.id}/${item.id}`} className={`watch-playlist-item ${item.id === video.id ? 'active' : ''} ${watchProgress.isWatched(item.id) ? 'watched' : ''}`}>
                <div className="watch-playlist-num">
                  {watchProgress.isWatched(item.id) ? <Check size={14} /> : item.id === video.id ? <Play size={14} /> : <span>{String(index + 1).padStart(2, '0')}</span>}
                </div>
                <div className="watch-playlist-info">
                  <span className="watch-playlist-title">{item.title}</span>
                  <span className="watch-playlist-dur">{seconds(item.duration || 0)}</span>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

function LearnPage() {
  const courses = useAdminStore((state) => state.courses).filter((course) => course.isPublished);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? courses : courses.filter((course) => course.level === active.toUpperCase() || course.category === active);
  const featured = courses.find((course) => course.isFeatured) || courses[0];
  const featuredLink = featured ? (featured.videos?.length ? `/learn/${featured.id}/${featured.videos[0].id}` : `/learn/${featured.id}`) : "/learn";
  const totalVideos = courses.reduce((sum, c) => sum + (c.videos?.length || 0), 0);

  return (
    <main className="learn-page-new">
      <SEO
        title="A5X Academy — Free Robotics & AI Video Courses"
        description="Learn robotics and AI for free with A5X Academy. Step-by-step video courses on Arduino, ESP32, sensors, and building autonomous robots. Beginner to advanced."
        keywords="free robotics courses india, learn arduino online, esp32 tutorial, robotics video course, a5x academy"
        url="/learn"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          "name": "A5X Academy",
          "url": "https://shop.a5x.in/learn",
          "description": "Free robotics and AI video courses for students and makers.",
          "provider": { "@type": "Organization", "name": "A5X Robotics" }
        }}
      />
      <div className="learn-hero-new">
        <div className="learn-hero-bg">
          <div className="learn-hero-orb learn-hero-orb-1" /><div className="learn-hero-orb learn-hero-orb-2" /><div className="learn-hero-grid" />
        </div>
        <div className="learn-hero-content">
          <p className="learn-eyebrow">A5X ACADEMY</p>
          <h1 className="learn-hero-title"><span className="learn-title-main">LEARN</span><span className="learn-title-sub">ROBOTICS & AI</span></h1>
          <p className="learn-hero-desc">Step-by-step video courses built by engineers. From blinking an LED to building a full autonomous robot.</p>
          <div className="learn-hero-stats">
            <div className="learn-stat"><span className="learn-stat-num">{totalVideos}+</span><span className="learn-stat-label">Videos</span></div>
            <div className="learn-stat-div" />
            <div className="learn-stat"><span className="learn-stat-num">{courses.length}</span><span className="learn-stat-label">Courses</span></div>
            <div className="learn-stat-div" />
            <div className="learn-stat"><span className="learn-stat-num">Free</span><span className="learn-stat-label">Forever</span></div>
          </div>
          {featured && <Link to={featuredLink} className="learn-start-btn"><Play size={18} /> Start Learning Free</Link>}
        </div>
      </div>

      <div className="learn-filter-bar">
        <div className="learn-filter-scroll">
          {courseCategories.map((cat) => (
            <button key={cat} className={`learn-filter-pill ${active === cat ? "active" : ""}`} onClick={() => setActive(cat)}>{cat}</button>
          ))}
        </div>
      </div>

      {featured && (
        <div className="learn-featured-section">
          <p className="learn-section-label">⭐ FEATURED COURSE</p>
          <div className="learn-featured-card">
            <div className="learn-featured-img">
              <img src={featured.thumbnailUrl || learnGrid} alt={featured.title} />
              <div className="learn-featured-play"><Play size={32} /></div>
              <span className="learn-featured-level">{featured.level}</span>
            </div>
            <div className="learn-featured-info">
              <span className="learn-featured-category">{featured.category}</span>
              <h2 className="learn-featured-title">{featured.title}</h2>
              <p className="learn-featured-desc">{featured.description}</p>
              <div className="learn-featured-meta">
                <span><ListVideo size={14} /> {featured.videos?.length || 0} videos</span>
                <span>By {featured.instructor}</span>
                <span className="learn-featured-tags">{featured.tags?.map(t => <span key={t} className="learn-tag">{t}</span>)}</span>
              </div>
              <div className="learn-featured-cta">
                {featured.youtubeUrl ? (
                  <a href={featured.youtubeUrl} target="_blank" rel="noopener noreferrer" className="learn-cta-btn"><Play size={16} /> Watch Now</a>
                ) : featured.videos?.length > 0 ? (
                  <Link to={`/learn/${featured.id}/${featured.videos[0].id}`} className="learn-cta-btn"><Play size={16} /> Watch Now</Link>
                ) : (
                  <span className="learn-cta-btn" style={{ opacity: 0.5 }}>Coming Soon</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="learn-courses-section">
        <div className="learn-section-header">
          <p className="learn-section-label">ALL COURSES</p>
          <span className="learn-count">{filtered.length} courses</span>
        </div>
        {filtered.length === 0 ? (
          <div className="learn-empty"><p>No courses found in this category.</p></div>
        ) : (
          <div className="learn-courses-grid">
            {filtered.map((course) => (
              <div key={course.id} className="learn-course-card">
                <div className="learn-course-thumb">
                  <img src={course.thumbnailUrl || learnGrid} alt={course.title} />
                  <div className="learn-course-play"><Play size={20} /></div>
                  <span className="learn-course-level-badge">{course.level}</span>
                </div>
                <div className="learn-course-body">
                  <span className="learn-course-category">{course.category}</span>
                  <h3 className="learn-course-title">{course.title}</h3>
                  <p className="learn-course-desc">{course.description}</p>
                  <div className="learn-course-footer">
                    <span className="learn-course-videos"><ListVideo size={13} /> {course.videos?.length || 0} videos</span>
                    <span className="learn-course-instructor">By {course.instructor}</span>
                  </div>
                  <div className="learn-course-tags">{course.tags?.slice(0, 3).map(t => <span key={t} className="learn-tag">{t}</span>)}</div>
                  {course.youtubeUrl ? (
                    <a href={course.youtubeUrl} target="_blank" rel="noopener noreferrer" className="learn-watch-now-btn" onClick={e => e.stopPropagation()}><Play size={15} /> Watch Now</a>
                  ) : course.videos?.length > 0 ? (
                    <Link to={`/learn/${course.id}/${course.videos[0].id}`} className="learn-watch-now-btn"><Play size={15} /> Watch Now</Link>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export { VideoPlayerPage, VideoPlayer };
export default LearnPage;
