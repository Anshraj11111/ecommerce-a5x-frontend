import { useState } from "react";

export function useWatchProgress(course) {
  const key = "a5x-watch-progress";
  const [data, setData] = useState(() => JSON.parse(localStorage.getItem(key) || "{}"));
  const save = (next) => { setData(next); localStorage.setItem(key, JSON.stringify(next)); };
  const videos = course?.videos || [];
  return {
    isWatched: (videoId) => Boolean(data[course?.id]?.includes(videoId)),
    markWatched: (videoId) => { if (course?.id) save({ ...data, [course.id]: Array.from(new Set([...(data[course.id] || []), videoId])) }); },
    getCourseProgress: () => course && videos.length ? Math.round(((data[course.id] || []).length / videos.length) * 100) : 0
  };
}