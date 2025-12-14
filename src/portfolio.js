/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Shehan Kavishka",
  title: "Hi all, I'm Shehan",
  subTitle: emoji(
    "Data Scientist | Specializing in machine learning, deep learning, and data-driven solutions | Python • TensorFlow • scikit-learn • FastAPI"
  ),
  resumeLink:
    "https://drive.google.com/file/d/1flITT_lp9WMyNpC5q53iVjMx22ilS8my/view?usp=sharing", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/Shehank98",
  linkedin: "https://www.linkedin.com/in/shehan-kavishka/",
  gmail: "shehan.k98@gmail.com",
  //gitlab: "https://gitlab.com/saadpasta",
  //facebook: "https://www.facebook.com/saad.pasta7",
  medium: "https://medium.com/@shehan_kavishka",
  //stackoverflow: "https://stackoverflow.com/users/10422806/saad-pasta",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "MACHINE LEARNING • DEEP LEARNING • DATA SCIENCE • AI SOLUTIONS",
  skills: [
    emoji(
      "⚡ Build, train & deploy ML models (classification, regression, ensemble methods) with scikit-learn & TensorFlow"
    ),
    emoji(
      "⚡ Deep learning architectures: CNNs, custom dense networks, fine-tuned models (Inception V3, Xception)"
    ),
    emoji(
      "⚡ Create interactive dashboards & data apps with Streamlit and Power BI"
    ),
    emoji(
      "⚡ Data wrangling, EDA, feature engineering & visualization with pandas, NumPy, Matplotlib"
    ),
    emoji("⚡ Deploy ML APIs with FastAPI and manage projects with Git/GitHub")
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
    {skillName: "Python", fontAwesomeClassname: "fab fa-python"},
    {skillName: "TensorFlow", fontAwesomeClassname: "fas fa-brain"},
    {skillName: "Keras", fontAwesomeClassname: "fas fa-project-diagram"},
    {skillName: "scikit-learn", fontAwesomeClassname: "fas fa-cogs"},
    {skillName: "pandas", fontAwesomeClassname: "fas fa-table"},
    {skillName: "NumPy", fontAwesomeClassname: "fas fa-calculator"},
    {skillName: "Matplotlib", fontAwesomeClassname: "fas fa-chart-area"},
    {skillName: "Seaborn", fontAwesomeClassname: "fas fa-chart-bar"},
    {skillName: "Streamlit", fontAwesomeClassname: "fas fa-stream"},
    {skillName: "Jupyter", fontAwesomeClassname: "fas fa-book-open"},
    {skillName: "SQL", fontAwesomeClassname: "fas fa-database"},
    {skillName: "FastAPI", fontAwesomeClassname: "fas fa-rocket"},
    {skillName: "Git/GitHub", fontAwesomeClassname: "fab fa-github"},
    {skillName: "Docker", fontAwesomeClassname: "fab fa-docker"}
  ],
  display: true // Set false to hide this section, defaults to true
};

// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
    {
      schoolName: "London Metropolitan University (UK)",
      logo: require("./assets/images/londonMetLogo.png"),
      subHeader: "BSc (Hons) in Data Science",
      duration: "2025 – 2026 (Reading)",
      desc: "Core areas: Programming, Database Design, Data Analytics, Machine Learning, Big Data Analytics & Visualization"
      //descBullets: [
      //"Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      // "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      //]
    },
    {
      schoolName: "ESOFT Metro Campus",
      logo: require("./assets/images/esoftLogo.jpg"),
      subHeader: "Higher National Diploma in Computing (Data Analytics)",
      duration: "2022 – 2024",
      desc: "Grade: Merit"
      //descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    },
    {
      schoolName: "InfoTech International",
      logo: require("./assets/images/infotechLogo.jpg"),
      subHeader: "Diploma in Information Technology",
      duration: "2014"
      //desc: "Grade: Merit",
      //descBullets: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit"]
    }
  ]
};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Deep Learning & Neural Networks", //Insert stack or technology you have experience in
      progressPercentage: "85%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Machine Learning & Classification",
      progressPercentage: "70%"
    },
    {
      Stack: "Data Analysis & Visualization",
      progressPercentage: "80%"
    },
    {
      Stack: "Model Deployment & APIs",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section

const workExperiences = {
  display: true, //Set it to true to show workExperiences Section
  experience: [
    {
      role: "Media Executive",
      company: "Ogilvy Media",
      companylogo: require("./assets/images/ogilvyLogo.jpeg"),
      //date: "June 2025 – Present",
      desc: "Applying ML and data analytics to optimize media operations. Developing automated solutions and insights-driven systems."
      //descBullets: [
      //"Media Reconciliation System: Built automated reconciliation workflow reducing manual processing time from hours to ~10 minutes using data matching algorithms",
      //"Operational Analytics Dashboards: Created tracking dashboards using BI tools to extract actionable insights from media schedules and reconciliation data"
      //]
    },
    {
      role: "Scheduling Officer",
      company: "Wijeya Newspapers Ltd",
      companylogo: require("./assets/images/wijeyaLogo.png"),
      //date: "Sep 2019 – Sep 2024",
      desc: "Managed advertising scheduling and workflows. Developed systems and processes for efficient ad placement coordination."
    },
    {
      role: "Research field assistant",
      company: "University of Sri Jayewardenepura",
      companylogo: require("./assets/images/Japuralogo.png")
      //date: "Jan 2019 – Sep 2019",
      //desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
  ]
};

/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "Featured Projects",
  subtitle: "Research & production-grade ML/AI systems",
  projects: [
    {
      image: require("./assets/images/brain.webp"),
      projectName: "Brain Tumor Classification - Ensemble Learning Research",
      projectDesc:
        "Advanced deep learning system achieving 98.2% accuracy on MRI classification. Compared CNNs, fine-tuned models (Inception V3, Xception), and ensemble methods. Processed 9,047 MRI images across 4 tumor classes. Implemented with FastAPI for production deployment.",
      footerLink: [
        {
          name: "Download the Research Paper",
          url: "http://test.com/"
        }
        //  you can add extra buttons here.
      ]
    },
    {
      image: require("./assets/images/heart.webp"),
      projectName: "Heart Disease Prediction System",
      projectDesc:
        "Developed a machine learning model to predict heart disease risk using patient data. Achieved 85% accuracy with feature engineering and model optimization.",
      footerLink: [
        {
          name: "View on GitHub",
          url: "https://github.com/Shehank98/Heart-Disease-Prediction-System-Using-Machine-Learning"
        }
      ]
    },
    {
      image: require("./assets/images/drone.png"),
      projectName: "Image Classification with Deep Learning (CNN)",
      projectDesc:
        "CNN-based image classification for drone vs bird detection using TensorFlow and Keras. Built production-ready web interface with Streamlit providing real-time predictions and confidence scores.",
      footerLink: [
        {
          name: "View on GitHub",
          url: "https://github.com/Shehank98/Image-Classification-using-CNN"
        }
      ]
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Certifications 🏆 "),
  subtitle: "Professional certifications from leading platforms",

  achievementsCards: [
    {
      title: "AI/ML Engineer - Stage 2",
      subtitle: "Centre for Open & Distance Education - SLIIT (Dec 2023)",
      image: require("./assets/images/sliitlogo.jpeg"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Credential",
          url: "https://code.sliit.org/certificates/fr1mpyurlj"
        }
      ]
    },
    {
      title: "Google Data Analytics Certificate - Stage 2",
      subtitle: "Google Career Certificates (Oct 2023)",
      image: require("./assets/images/google.png"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Credential",
          url: "https://coursera.org/share/829989b4e24f34a505c22ffe6bb34a6e"
        }
      ]
    },

    {
      title: "Google Data Analytics Certificate - Stage 1",
      subtitle: "Google Career Certificates (Sep 2023)",
      image: require("./assets/images/google.png"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Credential",
          url: "https://coursera.org/share/3c2884ba3fa1383db298a4ce0127f8d0"
        }
      ]
    },

    {
      title: "Introduction to Generative AI",
      subtitle: "Google Cloud Training Online (Sep 2023)",
      image: require("./assets/images/google.png"),
      imageAlt: "Certificate",
      footerLink: []
    },

    {
      title: "Supervised Machine Learning: Regression & Classification",
      subtitle: "DeepLearning.AI via Coursera (Jul 2023)",
      image: require("./assets/images/deep.png"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Credential",
          url: "https://www.coursera.org/account/accomplishments/certificate/G9GZMMBEB8CZ"
        }
      ]
    },

    {
      title: "Introduction to Statistics - Stanford University",
      subtitle: "Coursera (Apr 2023)",
      image: require("./assets/images/stanford.jpg"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Credential",
          url: "https://coursera.org/share/7a65c72579adebb40458c45f53d9a7e7"
        }
      ]
    },

    {
      title: "AI/ML Engineer - Stage 1",
      subtitle: "Centre for Open & Distance Education - SLIIT (Apr 2023)",
      image: require("./assets/images/sliitlogo.jpeg"),
      imageAlt: "Certificate",
      footerLink: [
        {
          name: "Credential",
          url: "https://code.sliit.org/certificates/cyaknebl1j"
        }
      ]
    },

    {
      title: "The Fundamentals of Digital Marketing",
      subtitle: "Google Digital Garage (Oct 2020)",
      image: require("./assets/images/google.png"),
      imageAlt: "Certificate",
      footerLink: []
    }
  ],
  display: true // Set false to hide this section, defaults to true
};

// ============================================
// 10. AWARDS & HONORS
// ============================================
const honorsSection = {
  title: emoji("Awards & Honors 🏅"),
  subtitle: "Recognition for outstanding achievements",
  awards: [
    {
      title:
        "Grand Award Winner at INTEL International Science & Engineering Fair",
      description:
        "Made history as Sri Lanka's first-ever Grand Award winner at ISEF. Represented Sri Lanka at the world's premier science competition in Los Angeles, California, competing among 1,700+ participants from 78 countries in the Earth and Environmental Science category.",
      date: "May 2017",
      image: require("./assets/images/isef.png"),
      imageAlt: "ISEF Grand Award",
      footer: []
    },
    {
      title:
        "Special Award Winner at INTEL International Science & Engineering Fair",
      description:
        "Recognized with a Special Award at ISEF for outstanding achievement and innovation. This recognition highlighted the exceptional quality of the research and its potential impact on environmental remediation and water technology solutions.",
      date: "May 2017",
      image: require("./assets/images/isef.png"),
      imageAlt: "ISEF Special Award",
      footer: []
    },
    {
      title: "National Winner - Sri Lanka Science & Engineering Fair",
      description:
        "National Winner for the project 'Toxic Cr(VI) Remediation using Biochar and Nanoparticles from Wastewater'",
      date: "May 2017",
      image: require("./assets/images/brain.jpeg"),
      video: "https://www.youtube.com/embed/vFGGkyWPhTw",
      imageAlt: "National Winner Certificate",
      footer: []
    },
    {
      title: "Best School Inventor of the Year",
      description:
        "Recognition of Outstanding Performance in the field of Environmental Science",
      date: "Sep 2017",
      image: require("./assets/images/ures.jpg"),
      imageAlt: "Best School Inventor Award",
      footer: []
    }
  ],
  display: true
};

// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle: "I share insights on ML, data analytics & deployment",
  displayMediumBlogs: "true", // Set true to display fetched medium blogs instead of hardcoded ones
  display: true // Set false to hide this section, defaults to true
};

// Talks Sections

const talkSection = {
  title: "Talks",
  display: false
};

// Podcast Section

const podcastSection = {
  title: emoji("Podcast 🎙️"),
  display: false
};

// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Download my resume",
  display: true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for all.",
  number: "+94-764219981",
  email_address: "shehan.k98@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "twitter", //Replace "twitter" with your twitter username without @
  display: false // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  workExperiences,
  openSource,
  bigProjects,
  achievementSection,
  honorsSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
