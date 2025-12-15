import React, { useContext, useState } from "react";
import "./StartupProjects.scss";
import { bigProjects } from "../../portfolio";
import { Fade } from "react-reveal";
import StyleContext from "../../contexts/StyleContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function StartupProject() {
  const { isDark } = useContext(StyleContext);
  const [selectedProject, setSelectedProject] = useState(null);

  if (!bigProjects.display) return null;

  const handleOpenModal = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleLinkClick = (url) => {
    if (!url) return;
    window.open(url, "_blank")?.focus();
  };

  return (
    <>
      <Fade bottom duration={1000} distance="20px">
        <div className="main" id="projects">
          <div>
            <h1 className="skills-heading">{bigProjects.title}</h1>
            <p className={`project-subtitle ${isDark ? "dark-mode" : "subTitle"}`}>
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
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              speed={800}
              grabCursor={true}
              className="startup-projects-swiper"
            >
              {bigProjects.projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`project-card ${isDark ? "project-card-dark" : "project-card-light"}`}
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
                      <h5 className="card-title">{project.projectName}</h5>

                      <p className={`card-subtitle description-text ${isDark ? "dark-mode" : ""}`}>
                        {project.projectDesc}
                      </p>

                      <button
                        className="view-details-btn"
                        onClick={() => handleOpenModal(project)}
                      >
                        View Details
                      </button>

                      {project.footerLink && (
                        <div className="project-card-footer">
                          {project.footerLink.map((link, idx) => (
                            <span
                              key={idx}
                              className={`project-tag ${isDark ? "dark-mode" : ""}`}
                              onClick={() => handleLinkClick(link.url)}
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

      {/* Modal Portal - Outside Fade to avoid children.only error */}
      {selectedProject && (
        <div
          className={`modal-overlay ${isDark ? "dark-mode" : ""}`}
          onClick={handleCloseModal}
        >
          <div
            className={`modal-container ${isDark ? "dark-mode" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <button
                className="modal-close-icon"
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Image */}
            {selectedProject.image && (
              <div className="modal-image-container">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.projectName}
                  className="modal-image"
                />
              </div>
            )}

            {/* Modal Content */}
            <div className="modal-content">
              <h2 className="modal-title">{selectedProject.projectName}</h2>

              <p className={`modal-description ${isDark ? "dark-mode" : ""}`}>
                {selectedProject.projectDesc}
              </p>

              {/* Modal Links */}
              {selectedProject.footerLink && (
                <div className="modal-links-section">
                  {selectedProject.footerLink.map((link, idx) => (
                    <button
                      key={idx}
                      className={`modal-link-button ${isDark ? "dark-mode" : ""}`}
                      onClick={() => handleLinkClick(link.url)}
                    >
                      {link.name} ↗
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Footer */}
              <button
                className={`modal-close-button ${isDark ? "dark-mode" : ""}`}
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}