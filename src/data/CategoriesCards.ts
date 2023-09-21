import KEducation from "@/components/Icons/KEducation";
import Language from "@/components/Icons/Language";
import Education from "@/components/Icons/Education";
import Stem from "@/components/Icons/Stem";
import Arts from "@/components/Icons/Arts";
import BusinessAndFinance from "@/components/Icons/BusinessAndFinance";

const categoriesCards = [
  {
    id: 1,
    title: "K-12 Education",
    description:
      " Jobs and teachers specializing in primary and secondary education, including elementary and high school.",
    bc: "#37254b",
    symbol: KEducation,
  },
  {
    id: 2,
    title: "Higher Education",
    description:
      "Opportunities and instructors for colleges and universities, covering various academic disciplines and courses",
    bc: "red.500",
    symbol: Education,
  },
  {
    id: 3,
    title: "Language",
    description:
      "Teaching jobs and instructors in languages, including foreign languages, ESL and linguistics",
    bc: "green.500",
    symbol: Language,
  },
  {
    id: 4,
    title: "STEM",
    description:
      "Teaching positions and educators in science, technology, engineering, and mathematics fields, promoting STEM education",
    bc: "yellow.500",
    symbol: Stem,
  },
  {
    id: 5,
    title: "Creative Arts",
    description:
      "Opportunities for jobs and teachers in the arts, encompassing music, visual arts, performing arts, and creative writing",
    bc: "green.500",
    symbol: Arts,
  },
  {
    id: 6,
    title: "Business & Finance",
    description:
      " Opportunities and instructors specializing in business, finance, economics, and entrepreneurship",
    bc: "#37254b",
    symbol: BusinessAndFinance,
  },
];

export default categoriesCards;
