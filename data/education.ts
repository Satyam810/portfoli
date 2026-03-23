export type EducationItem = {
  id: number;
  degree: string;
  major: string;
  institute: string;
  location: string;
  date: string;
  score: string;
  images: string[];
  bgGradient: string;
  accent: string;
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 1,
    degree: "Bachelor of Technology",
    major: "Computer Science and Engineering",
    institute: "Lovely Professional University",
    location: "Phagwara, Punjab",
    date: "Aug' 23 - Present",
    score: "CGPA: 7",
    images: [
      "/images/education/lpu-1.jpg", 
      "/images/education/lpu-2.jpg"
    ],
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
    accent: "#a78bfa",
  },
  {
    id: 2,
    degree: "Intermediate (10+2)",
    major: "Science / General",
    institute: "St. Joseph's Public School",
    location: "Dalsinghsarai, Bihar",
    date: "Apr' 22 - Mar' 23",
    score: "Percentage: 80%",
    images: [
      "/images/education/12th-1.jpg",
      "/images/education/12th-2.jpg",
      "/images/education/12th-3.jpg"
    ],
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
    accent: "#a78bfa",
  },
  {
    id: 3,
    degree: "Matriculation (10th)",
    major: "General Subjects",
    institute: "St. Joseph's Public School",
    location: "Dalsinghsarai, Bihar",
    date: "Apr' 21 - Mar' 22",
    score: "Percentage: 87%",
    images: [
      "/images/education/10th-1.jpg",
      "/images/education/10th-2.jpg"
    ],
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
    accent: "#a78bfa",
  },
];
