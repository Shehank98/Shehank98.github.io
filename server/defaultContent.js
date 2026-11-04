// Plain, JSON-serialisable defaults for every admin-editable section.
// These seed the admin UI and are what the frontend falls back to before any
// edits are saved. Image fields point to /uploads/seed/<file>, which the server
// copies from src/assets/images on first start so existing images keep working
// and can be replaced from the admin.

const img = name => `/uploads/seed/${name}`;

module.exports = {
  badge: {
    name: "SHEHAN KAVISHKA",
    tag: "SENIOR",
    headline: "MEDIA EXEC",
    role: "Senior Media Executive | Data & AI",
    sideText: "DATA SCIENCE & AI",
    company: "OGILVY",
    idNumber: "SK-98",
    footerText: "PORTFOLIO",
    footerNote: "Data. Media. AI.",
    photo: img("profile.jpg"),
    qrUrl: "https://www.linkedin.com/in/shehan-kavishka/",
    qrTitle: "CONNECT WITH ME",
    qrCaption: "SCAN HERE",
    lanyardText: "Shehan Kavishka"
  },


  heroSection: {
    welcome: "Welcome to",
    headline: "My Portfolio",
    roles: [
      "Senior Media Executive @ Ogilvy",
      "Data Science & AI Builder",
      "Automation & Dashboards",
      "ISEF Grand Award Winner"
    ],
    intro:
      "7+ years in advertising, now blending media buying with machine learning and automation. I turn messy campaign data into smarter decisions and build the tools that run media operations in minutes, not hours.",
    primaryButton: "View Projects",
    secondaryButton: "Contact Me",
    loaderName: "SHEHAN KAVISHKA"
  },

  musicSection: {
    display: true,
    heading: "A little music.",
    headingAccent: "A lot of ideas.",
    text: "The soundtrack behind my late-night dashboards and model training runs.",
    buttonText: "Open on Spotify",
    spotifyUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
    embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M"
  },

  commentsSection: {
    display: true,
    title: "Guestbook",
    subtitle: "Leave a note - I read every one."
  },

  greeting: {
    username: "Shehan Kavishka",
    title: "Hi, I'm Shehan",
    subTitle:
      "Senior Media Executive at Ogilvy 🎯 | Blending 7+ years in advertising with Data Science & AI to build smarter media systems",
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
    subTitle: "MEDIA BUYING • CAMPAIGN ANALYTICS • MACHINE LEARNING • AI SOLUTIONS",
    skills: [
      "Plan, buy & optimize multi-channel ad campaigns across TV, radio & press",
      "Build automation & reconciliation systems that cut media ops from hours to minutes",
      "Design clean, data-driven dashboards for media buying & campaign performance",
      "Apply machine learning & deep learning (CNNs, ensemble models) to real-world problems",
      "Turn raw campaign & business data into decisions with Python, pandas & analytics"
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
      {skillName: "Power BI", fontAwesomeClassname: "fas fa-chart-pie"},
      {skillName: "Google Apps Script", fontAwesomeClassname: "fab fa-google"},
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
        role: "Senior Media Executive",
        company: "Ogilvy",
        companylogo: img("ogilvy.png"),
        date: "Aug 2024 – Present",
        desc: "Media buying across TV, radio & press for major brands, while building the data & automation systems that run media operations. Promoted to Senior Media Executive in 2026.",
        descBullets: [
          "Managed SLT-Mobitel Print, Radio & TV campaigns end-to-end — planning, buying, reconciliation, invoicing & client reporting",
          "Built Ogilvy Nova, an automated media reconciliation system that cuts ad verification from hours to minutes",
          "Developed Ogilvy Orbit, clean operational dashboards for managing media buying & campaign performance"
        ]
      },
      {
        role: "Scheduling Officer",
        company: "Wijeya Newspapers Ltd",
        companylogo: img("wijeyaLogo.png"),
        date: "Sep 2019 – Aug 2024 · 5 yrs",
        desc: "Managed advertising scheduling and workflows for Sri Lanka's leading publications.",
        descBullets: [
          "Scheduled advertisements for Daily Lankadeepa, Ada, Daily FT, Daily Mirror, Sunday Lankadeepa & Deshaya",
          "Handled ad artworks and coordinated rates, working with clients across Sri Lanka"
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
    subtitle: "Media-tech systems & production-grade ML/AI — where advertising meets data",
    display: true,
    projects: [
      {
        image: img("recon.jfif"),
        projectName: "Ogilvy Nova — Media Reconciliation System",
        projectDesc:
          "Automated reconciliation platform for media operations at Ogilvy. Matches scheduled advertisements against broadcast & publication data, cutting ad verification from hours to ~10 minutes. Built for scale with a clean, professional interface tailored to real media workflows.",
        footerLink: [{name: "Ogilvy", url: "https://www.linkedin.com/in/shehan-kavishka/"}]
      },
      {
        image: img("rate.png"),
        projectName: "Ogilvy Orbit — Media Buying Operations Dashboard",
        projectDesc:
          "Operations dashboards for managing media buying at Ogilvy — tracking campaigns, placements and performance in one clean, professional interface. Streamlines day-to-day media operations, reconciliation and reporting for the team.",
        footerLink: [{name: "Ogilvy", url: "https://www.linkedin.com/in/shehan-kavishka/"}]
      },
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

  honorsSection: {
    title: "Awards & Honors",
    subtitle: "Recognition for outstanding achievements",
    display: true,
    awards: [
      {
        title: "Grand Award Winner at INTEL International Science & Engineering Fair",
        description: "Made history as Sri Lanka's first-ever Grand Award winner at ISEF, the world's premier science competition in Los Angeles, California.",
        date: "May 2017",
        image: null,
        video: "https://www.youtube.com/watch?v=Z-rp2wTpg_s",
        imageAlt: "ISEF Grand Award"
      },
      {
        title: "Special Award Winner at INTEL International Science & Engineering Fair",
        description: "Recognized with a Special Award at ISEF for outstanding achievement and innovation.",
        date: "May 2017",
        image: null,
        video: "https://www.youtube.com/watch?v=IlsCEjYRoS0",
        imageAlt: "ISEF Special Award"
      },
      {
        title: "National Winner - Sri Lanka Science & Engineering Fair",
        description: "National Winner for the project 'Toxic Cr(VI) Remediation using Biochar and Nanoparticles from Wastewater'",
        date: "May 2017",
        image: null,
        video: "https://www.youtube.com/watch?v=vFGGkyWPhTw",
        imageAlt: "National Winner Certificate"
      },
      {
        title: "Best School Inventor of the Year",
        description: "Recognition of Outstanding Performance in the field of Environmental Science",
        date: "Sep 2017",
        image: img("ures.jpg"),
        video: "",
        imageAlt: "Best School Inventor Award"
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

  aboutSection: {
    title: "About Me",
    greetingLine: "Hi, I'm",
    displayName: "Shehan Kavishka",
    photo: img("profile.jpg"),
    primaryButton: "Contact Me",
    secondaryButton: "View Projects",
    paragraphs: [
      "Senior Media Executive at Ogilvy, running TV, radio and press campaigns with data-led strategy. Currently studying BSc Data Science (London Metropolitan University).",
      "Sri Lanka's first Intel ISEF Grand Award winner, now using AI and machine learning to make media smarter. Open to remote and relocation opportunities worldwide."
    ],
    paragraphsSi: [
      "Ogilvy හි ජ්‍යෙෂ්ඨ මාධ්‍ය විධායකයෙකු ලෙස දත්ත මත පදනම් වූ උපාය මාර්ග සමඟ රූපවාහිනී, ගුවන්විදුලි සහ මුද්‍රිත මාධ්‍ය ප්‍රචාරණ ව්‍යාපාර මෙහෙයවමි. දැනට ලන්ඩන් මෙට්‍රොපොලිටන් විශ්වවිද්‍යාලයෙන් දත්ත විද්‍යා උපාධිය (BSc) හදාරමි.",
      "Intel ISEF තරගයේ ශ්‍රී ලංකාවේ පළමු Grand Award ජයග්‍රාහකයා වන මම, දැන් මාධ්‍ය වඩාත් දක්ෂ කිරීමට කෘත්‍රිම බුද්ධිය සහ යන්ත්‍ර ඉගෙනුම භාවිතා කරමි. දුරස්ථව සහ විදේශගත වී වැඩ කිරීමේ අවස්ථා සඳහා විවෘතයි."
    ],
    paragraphsTa: [
      "Ogilvy நிறுவனத்தில் மூத்த ஊடக நிர்வாகியாக, தரவு சார்ந்த உத்தியுடன் தொலைக்காட்சி, வானொலி மற்றும் அச்சு ஊடகப் பிரச்சாரங்களை நடத்துகிறேன். தற்போது லண்டன் மெட்ரோபொலிட்டன் பல்கலைக்கழகத்தில் தரவு அறிவியலில் BSc படித்து வருகிறேன்.",
      "Intel ISEF போட்டியில் இலங்கையின் முதல் Grand Award வெற்றியாளரான நான், இப்போது ஊடகத்தை மேலும் புத்திசாலித்தனமாக்க செயற்கை நுண்ணறிவு மற்றும் இயந்திரக் கற்றலைப் பயன்படுத்துகிறேன். தொலைதூர மற்றும் இடம்பெயர்வு வாய்ப்புகளுக்குத் திறந்தவன்."
    ],
    highlights: [
      "Senior Media Executive",
      "BSc Data Science",
      "Grand Award winner"
    ],
    display: true
  },

  statsSection: {
    display: true,
    stats: [
      {value: "7+", label: "Years in Media"},
      {value: "98.2%", label: "ML Model Accuracy"},
      {value: "40+", label: "Hrs/Week Automated"},
      {value: "ISEF", label: "Grand Award Winner"}
    ]
  },

  languagesSection: {
    title: "Languages",
    display: true,
    languages: [
      {name: "English", level: "Professional working proficiency"},
      {name: "Sinhala", level: "Native / bilingual"},
      {name: "Tamil", level: "Limited working proficiency"}
    ]
  },

  resumeSection: {
    title: "Resume",
    subtitle: "Grab a copy of my full CV",
    resumeLink:
      "https://drive.google.com/file/d/1flITT_lp9WMyNpC5q53iVjMx22ilS8my/view?usp=sharing",
    display: true
  },

  contactInfo: {
    title: "Contact Me ☎️",
    subtitle: "Discuss a project or just want to say hi? My Inbox is open for all.",
    number: "+94-764219981",
    email_address: "shehan.k98@gmail.com"
  }
};
