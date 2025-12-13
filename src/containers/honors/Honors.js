import React, {useContext} from "react";
import "../achievement/Achievement.scss";
import {honorsSection} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function Honors() {
  const {isDark} = useContext(StyleContext);
  if (!honorsSection.display) {
    return null;
  }

  const isYouTubeUrl = url => {
    return url && (url.includes("youtube.com") || url.includes("youtu.be"));
  };

  const getYouTubeEmbedUrl = url => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com")) {
      videoId = url.split("v=")[1];
    } else if (url.includes("youtu.be")) {
      videoId = url.split("youtu.be/")[1];
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const isVideoFile = url => {
    return (
      url &&
      (url.endsWith(".mp4") || url.endsWith(".webm") || url.endsWith(".mov"))
    );
  };

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="honors">
        <div className="achievement-main-div">
          <div className="achievement-header">
            <h1
              className={
                isDark
                  ? "dark-mode heading achievement-heading"
                  : "heading achievement-heading"
              }
            >
              {honorsSection.title}
            </h1>
            <p
              className={
                isDark
                  ? "dark-mode subTitle achievement-subtitle"
                  : "subTitle achievement-subtitle"
              }
            >
              {honorsSection.subtitle}
            </p>
          </div>
          <div className="achievement-cards-div">
            {honorsSection.awards.map((award, i) => {
              const hasVideo = award.video && award.video.trim() !== "";
              return (
                <div
                  key={i}
                  className={
                    isDark ? "dark-mode achievement-card" : "achievement-card"
                  }
                  style={{padding: "20px", marginBottom: "20px"}}
                >
                  {/* Video Display */}
                  {hasVideo && (
                    <div style={{marginBottom: "15px"}}>
                      {isYouTubeUrl(award.video) ? (
                        <iframe
                          width="100%"
                          height="250"
                          src={getYouTubeEmbedUrl(award.video)}
                          title={award.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{borderRadius: "8px"}}
                        ></iframe>
                      ) : isVideoFile(award.video) ? (
                        <video
                          width="100%"
                          height="250"
                          controls
                          style={{borderRadius: "8px", backgroundColor: "#000"}}
                        >
                          <source src={award.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : null}
                    </div>
                  )}

                  {/* Image Display */}
                  {award.image && !hasVideo && (
                    <div style={{marginBottom: "15px"}}>
                      <img
                        src={award.image}
                        alt={award.imageAlt}
                        style={{
                          width: "100%",
                          borderRadius: "8px",
                          maxHeight: "250px",
                          objectFit: "cover"
                        }}
                      />
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    style={{
                      marginBottom: "10px",
                      color: isDark ? "#fff" : "#000"
                    }}
                  >
                    {award.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      marginBottom: "10px",
                      color: isDark ? "#ccc" : "#555"
                    }}
                  >
                    {award.description}
                  </p>

                  {/* Date */}
                  <p
                    style={{
                      fontSize: "12px",
                      color: isDark ? "#aaa" : "#999",
                      fontStyle: "italic"
                    }}
                  >
                    {award.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
