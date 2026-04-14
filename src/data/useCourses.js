import Papa from "papaparse";
import coursesCSV from "./courses.csv?raw";

// Parse once at module load — synchronous, no hook needed
const parsed = Papa.parse(coursesCSV, {
  header: true,
  skipEmptyLines: true,
});

export const ALL_COURSES = parsed.data
  .filter((row) => row["Course Code"]?.trim())
  .map((row) => ({
    code: row["Course Code"]?.trim(),
    title: row["Title"]?.trim(),
    department: row["Department"]?.trim(),
    credits: parseInt(row["Credits"]) || 0,
    description: row["Description"]?.trim(),
    prerequisites: row["Prerequisites"]?.trim(),
    typicallyOffered: row["Typically Offered"]?.trim(),
    lastOffered: row["Last Offered (Catalog)"]?.trim(),
    offeredNextSemester: row["Offered Fall 2026?"]?.trim() === "Yes",
    minGPA: row["Min GPA Required"]?.trim(),
    notes: row["Notes"]?.trim(),
    catalogURL: row["Catalog URL"]?.trim(),
  }));

// Look up a single course by code
export function getCourseFromCSV(code) {
  return ALL_COURSES.find((c) => c.code === code) || null;
}

// React hook for components that need reactive data
import { useState, useEffect } from "react";

export function useCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCourses(ALL_COURSES);
    setLoading(false);
  }, []);

  return { courses, loading };
}