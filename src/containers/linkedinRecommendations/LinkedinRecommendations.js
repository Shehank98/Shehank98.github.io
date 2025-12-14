import React, {useState, useEffect} from "react";
import RecommendationCard from "./RecommendationCard";
import "./LinkedinRecommendations.scss";

export default function LinkedinRecommendations({recommendations = [], isDark}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const hasCarousel = recommendations && recommendations.length > 2;

  // Auto-slide every 5 seconds (only if more than 2 cards and not hovering)
  useEffect(() => {
    if (!recommendations || recommendations.length === 0 || !hasCarousel || isHovering) {
      return;
    }

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recommendations.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovering, hasCarousel, recommendations]);

  // Early return AFTER hooks
  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? recommendations.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Get visible cards (2 at a time for carousel, or all for normal view)
  let visibleCards = [];
  if (hasCarousel) {
    visibleCards.push(recommendations[currentIndex]);
    visibleCards.push(recommendations[(currentIndex + 1) % recommendations.length]);
  } else {
    visibleCards = recommendations;
  }

  return (
    <div className="recommendations-container">
      <h1 className={isDark ? "recommendations-heading dark-mode-text" : "recommendations-heading"}>
        LinkedIn Recommendations
      </h1>

      <div 
        className={`recommendations-wrapper ${hasCarousel ? "carousel-mode" : "normal-mode"}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Cards Container */}
        <div className="recommendations-grid">
          {visibleCards.map((rec, index) => (
            <RecommendationCard 
              key={index}
              cardInfo={rec} 
              isDark={isDark} 
            />
          ))}
        </div>

        {/* Previous Button - Only show if carousel */}
        {hasCarousel && (
          <button
            className="carousel-button prev-button"
            onClick={goToPrevious}
            aria-label="Previous recommendation"
          >
            &#10094;
          </button>
        )}

        {/* Next Button - Only show if carousel */}
        {hasCarousel && (
          <button
            className="carousel-button next-button"
            onClick={goToNext}
            aria-label="Next recommendation"
          >
            &#10095;
          </button>
        )}
      </div>

      {/* Dots Navigation - Only show if carousel */}
      {hasCarousel && (
        <div className="carousel-dots">
          {recommendations.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to recommendation ${index + 1}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}