// Portfolio.jsx
import PortfolioDesktop from "./PortfolioDesktop.jsx";
import PortfolioTablet from "./PortfolioTablet.jsx";
import PortfolioMobile from "./PortfolioMobile.jsx";
import { useBreakpoint } from "./useBreakpoint";
import "./portfolio.css";

const items = [
  {
    id: 1,
    img: "/projects/NextRpg.jpg",
    title: "Next RPG",
    desc: "Next RPG is a text-based role-playing game that allows users to battle, gather resources, and embark on quests to enhance their characters. I developed the entire application, including the back-end, front-end, and design.",
    github_link: "https://github.com/aabazary/nextRPG",
    live_link: "https://nextrpg.onrender.com",
    technologies: [
      "/logos/tailwind.svg",
      "/logos/mongodb.svg",
      "/logos/express.svg",
      "/logos/react.svg",
      "/logos/nodejs.svg",
    ],
  },
  {
    id: 2,
    img: "/projects/Ascension.jpg",
    title: "Ascension",
    desc: "World of Ascension is a game that lets users battle and progress through their journey. My key contributions include creating battle logic and implementing game mechanics.",
    github_link: "https://github.com/yourrepo/school-system",
    live_link: "https://world-of-ascension.onrender.com/",
    technologies: [
      "/logos/tailwind.svg",
      "/logos/mongodb.svg",
      "/logos/express.svg",
      "/logos/react.svg",
      "/logos/nodejs.svg",
    ],
  },
  {
    id: 3,
    img: "/projects/TravelApp.jpg",
    title: "Mobile Android Vacation App",
    desc: "Mobile Vacation App is a mobile application designed to help users plan their vacations. It features clean navigation, a well-designed user interface, and a secure database-backed infrastructure.",
    github_link: "https://github.com/aabazary/MobileVacationApp",
    download: "/projects/app-release.apk",
    technologies: ["/logos/java.svg", "/logos/androidstudio.png"],
  },
  {
    id: 4,
    img: "/projects/WeatherDashboard.jpg",
    title: "Weather Dashboard",
    desc: "Weather Dashboard is a tool that allows users to search for a city and view the current weather as well as a 5-day forecast. It includes a local storage feature to save previous searches for quick access",
    live_link: "https://aabazary.github.io/weather_dashboard/",
    github_link: "https://github.com/aabazary/weather_dashboard",
    technologies: ["/logos/javascript.svg", "/logos/html5.svg", "/logos/css.svg"],
  },
  {
    id: 5,
    img: "/projects/EmployeeManager.jpg",
    title: "Employee Manager CLI",
    desc: "Employee Tracker is a command-line application that helps manage company employees. It allows users to add departments, roles, and employees, and view or update their information.",
    github_link: "https://github.com/aabazary/employee_tracker",
    technologies: ["/logos/javascript.svg", "/logos/mysql.svg", "/logos/nodejs.svg"],
  },
];

const Portfolio = () => {
  const breakpoint = useBreakpoint();

  if (breakpoint === "desktop") {
    return <PortfolioDesktop items={items} />;
  } else if (breakpoint === "tablet") {
    return <PortfolioTablet items={items} />;
  } else {
    return <PortfolioMobile items={items} />;
  }
};

export default Portfolio;
