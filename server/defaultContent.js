// Plain, JSON-serialisable defaults for every admin-editable section.
// These seed the admin UI and are what the frontend falls back to before any
// edits are saved. Image fields point to /uploads/seed/<file>, which the server
// copies from src/assets/images on first start so existing images keep working
// and can be replaced from the admin.

const img = name => `/uploads/seed/${name}`;

module.exports = {
  greeting: {
    username: "Shehan Kavishka",
    title: "Hi, I'm Shehan",
    subTitle:
      "Data Scientist | Specializing in machine learning, deep learning, and data-driven solutions",
    resumeLink:
      "https://drive.google.com/file/d/1flITT_lp9WMyNpC5q53iVjMx22ilS8my/view?usp=sharing",
    profileImage: null,
    displayGreeting: true
  },

  splashScreen: {
    enabled: true,
    duration: 3000
  },

  socialMediaLinks: {
    github: "https://github.com/Shehank98",
    linkedin: "https://www.linkedin.com/in/shehan-kavishka/",
    gmail: "shehan.k98@gmail.com",
    medium: "https://medium.com/@shehan_kavishka",
    display: true
  },

  skillsSection: {
    title: "What I do",
    subTitle: "MACHINE LEARNING • DEEP LEARNING • DATA SCIENCE • AI SOLUTIONS",
    skills: [
      "Build, train & deploy ML models with scikit-learn & TensorFlow",
      "Deep learning architectures: CNNs, custom dense networks, fine-tuned models",
      "Create interactive dashboards & data apps with Streamlit and Power BI",
      "Data wrangling, EDA, feature engineering & visualization with pandas, Matplotlib",
      "Deploy ML APIs with FastAPI and manage projects with Git/GitHub"
    ],
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
    display: true
  },

  workExperiences: {
    display: true,
    experience: [
      {
        role: "Media Executive",
        company: "Ogilvy Media",
        companylogo: img("ogilvy.png"),
        date: "Aug 2024 – Present",
        desc: "Applying ML and data analytics to optimize media operations. Developing automated solutions and insights-driven systems.",
        descBullets: [
          "Scheduled monthly commercials across leading TV, radio, and press outlets",
          "Involved in campaign planning and budgeting for multi-channel media strategies"
        ]
      },
      {
        role: "Scheduling Officer",
        company: "Wijeya Newspapers Ltd",
        companylogo: img("wijeyaLogo.png"),
        date: "Sep 2019 – Aug 2024",
        desc: "Managed advertising scheduling and workflows",
        descBullets: [
          "Scheduled advertisements for Daily Lankadeepa, Ada, Daily FT, Daily Mirror and other publications",
          "Handled advertisement artworks maintaining quality and consistency across daily releases"
        ]
      },
      {
        role: "Research field assistant",
        company: "University of Sri Jayewardenepura",
        companylogo: img("Japuralogo.png"),
        date: "Jan 2019 – Sep 2019",
        desc: "Supported microplastic pollution research project led by Prof. Meththika Vithanage.",
        descBullets: [
          "Conducted fieldwork activities collecting environmental samples from multiple locations",
          "Performed laboratory analysis including sample preparation and testing procedures"
        ]
      }
    ]
  },

  openSource: {
    showGithubProfile: "true",
    display: true
  },

  bigProjects: {
    title: "Featured Projects",
    subtitle: "Research & production-grade ML/AI systems",
    display: true,
    projects: [
      {
        image: img("brain.png"),
        projectName: "Brain Tumor Classification - Ensemble Learning Research",
        projectDesc:
          "Advanced deep learning system achieving 98.2% accuracy on MRI classification. Compared CNNs, fine-tuned models (Inception V3, Xception), and ensemble methods. Processed 9,047 MRI images across 4 tumor classes. Implemented with FastAPI for production deployment.",
        footerLink: [{name: "Download the Research Paper", url: "http://test.com/"}]
      },
      {
        image: img("slt.png"),
        projectName: "Automated Dashboard Reports - SLT Fiber Rush Campaign",
        projectDesc:
          "Built automated reporting system using Google Apps Script that eliminated 40+ hours of manual work. Generates twice-daily dashboard emails (1 PM & 6 PM) for 38 locations tracking thousands of campaign leads.",
        footerLink: [{name: "View on GitHub", url: "http://test.com/"}]
      },
      {
        image: img("heart.png"),
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
        image: img("sample.png"),
        projectName: "Image Classification with Deep Learning (CNN)",
        projectDesc:
          "CNN-based image classification for drone vs bird detection using TensorFlow and Keras. Built production-ready web interface with Streamlit providing real-time predictions and confidence scores.",
        footerLink: [
          {name: "View on GitHub", url: "https://github.com/Shehank98/Image-Classification-using-CNN"}
        ]
      }
    ]
  },

  achievementSection: {
    title: "Certifications 🏆",
    subtitle: "Professional certifications from leading platforms",
    display: true,
    achievementsCards: [
      {
        title: "AI/ML Engineer - Stage 2",
        subtitle: "Centre for Open & Distance Education - SLIIT (Dec 2023)",
        image: img("sliitlogo.jpeg"),
        imageAlt: "Certificate",
        footerLink: [{name: "Credential", url: "https://code.sliit.org/certificates/fr1mpyurlj"}]
      },
      {
        title: "Google Data Analytics Certificate - Stage 2",
        subtitle: "Google Career Certificates (Oct 2023)",
        image: img("google.png"),
        imageAlt: "Certificate",
        footerLink: [
          {name: "Credential", url: "https://coursera.org/share/829989b4e24f34a505c22ffe6bb34a6e"}
        ]
      },
      {
        title: "Supervised Machine Learning: Regression & Classification",
        subtitle: "DeepLearning.AI via Coursera (Jul 2023)",
        image: img("deep.png"),
        imageAlt: "Certificate",
        footerLink: [
          {
            name: "Credential",
            url: "https://www.coursera.org/account/accomplishments/certificate/G9GZMMBEB8CZ"
          }
        ]
      }
    ]
  },

  blogSection: {
    title: "Blogs",
    subtitle: "I share insights on ML, data analytics & deployment",
    displayMediumBlogs: "true",
    display: true,
    blogs: []
  },

  linkedinRecommendations: {
    display: true,
    recommendations: [
      {
        recommenderName: "Champika Mahanama",
        title: "Advertising Associate",
        company: "Media",
        image: img("champika.jpg"),
        recommendation:
          "I had the pleasure of having Shehan as a part of my team, and I can confidently say he has been an exceptional asset. Shehan consistently demonstrated a strong enthusiasm for his work and a commendable commitment to going above and beyond his assigned responsibilities."
      },
      {
        recommenderName: "Anuradha Yapa",
        title: "Lecturer",
        company: "Horizon Campus",
        image: img("yapa.jfif"),
        recommendation:
          "I had the pleasure of teaching and mentoring Shehan during his time at ESOFT Campus while he pursued his HND, and I can sincerely say he's one of those students you don't forget."
      }
    ]
  },

  resumeSection: {
    title: "Resume",
    subtitle: "Download my resume",
    resumeLink: "",
    display: true
  },

  contactInfo: {
    title: "Contact Me ☎️",
    subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
    number: "+94-764219981",
    email_address: "shehan.k98@gmail.com"
  }
};
