import React, { useContext, useState } from "react";
import "./StartupProjects.scss";
import { bigProjects } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function StartupProject() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  function openUrlInNewTab(url) {
    if (!url) return;
    const win = window.open(url, "_blank");
    win?.focus();
  }

  const { isDark } = useContext(StyleContext);

  if (!bigProjects.display) return null;

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{bigProjects.title}</h1>
          <p
            className={
              isDark
                ? "dark-mode project-subtitle"
                : "subTitle project-subtitle"
            }
          >
            {bigProjects.subtitle}
          </p>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={800}
            grabCursor={true}
            className="startup-projects-swiper"
          >
            {bigProjects.projects.map((project, i) => (
              <SwiperSlide key={i}>
                <div
                  className={
                    isDark
                      ? "dark-mode project-card project-card-dark"
                      : "project-card project-card-light"
                  }
                >
                  {project.image && (
                    <div className="project-image">
                      <img
                        src={project.image}
                        alt={project.projectName}
                        className="card-image"
                      />
                    </div>
                  )}

                  <div className="project-detail">
                    <h5 className={isDark ? "dark-mode card-title" : "card-title"}>
                      {project.projectName}
                    </h5>

                    <p
                      className={`card-subtitle ${
                        isDark ? "dark-mode" : ""
                      } description-text ${
                        expandedIndex === i ? "expanded" : "collapsed"
                      }`}
                    >
                      {project.projectDesc}
                    </p>

                    {project.projectDesc.length > 150 && ( // Only show button if text is long
                      <button
                        className="see-more-btn"
                        onClick={() => toggleExpand(i)}
                      >
                        {expandedIndex === i ? "See Less" : "See More"}
                      </button>
                    )}

                    {project.footerLink && (
                      <div className="project-card-footer">
                        {project.footerLink.map((link, j) => (
                          <span
                            key={j}
                            className={
                              isDark ? "dark-mode project-tag" : "project-tag"
                            }
                            onClick={() => openUrlInNewTab(link.url)}
                          >
                            {link.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </Fade>
  );
}