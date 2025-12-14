import React, {useState, createRef} from "react";
import "./RecommendationCard.scss";

export default function RecommendationCard({cardInfo, isDark}) {
  const [expandedIndex, setExpandedIndex] = useState(false);
  const imgRef = createRef();

  const truncateText = (text, limit = 150) => {
    if (text.length <= limit) return text;
    return text.substring(0, limit) + "...";
  };

  const recommendationText = cardInfo.recommendation;
  const isLong = recommendationText.length > 150;

  return (
    <div className={isDark ? "rec-card-horizontal-dark" : "rec-card-horizontal"}>
      {/* Photo Section - Left Side */}
      <div className="rec-photo-section">
        <img
          crossOrigin={"anonymous"}
          ref={imgRef}
          className="rec-photo-horizontal"
          src={cardInfo.image}
          alt={cardInfo.recommenderName}
        />
      </div>

      {/* Content Section - Right Side */}
      <div className="rec-content-section">
        {/* Header Info */}
        <div className="rec-header">
          <h4 className={isDark ? "rec-name dark-mode-text" : "rec-name"}>
            {cardInfo.recommenderName}
          </h4>
          <p className={isDark ? "rec-title dark-mode-text" : "rec-title"}>
            {cardInfo.title}
          </p>
          <p className={isDark ? "rec-company dark-mode-text" : "rec-company"}>
            {cardInfo.company}
          </p>
        </div>

        {/* Recommendation Text */}
        <p
          className={
            isDark
              ? "rec-text-content dark-mode-text"
              : "rec-text-content"
          }
        >
          "{expandedIndex ? recommendationText : truncateText(recommendationText)}"
        </p>

        {/* Read More Button */}
        {isLong && (
          <button
            className={isDark ? "rec-read-more-btn dark-mode-text" : "rec-read-more-btn"}
            onClick={() => setExpandedIndex(!expandedIndex)}
          >
            {expandedIndex ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
}