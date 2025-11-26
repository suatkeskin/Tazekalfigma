import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Calendar, Palette, Users, CheckSquare } from "lucide-react";
import { Button } from "./ui/button";
import { TazekalLogo } from "./TazekalLogo";

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Calendar,
      title: t("onboardingTitle1"),
      description: t("onboardingDesc1"),
      color: "text-teal-600",
    },
    {
      icon: Palette,
      title: t("onboardingTitle2"),
      description: t("onboardingDesc2"),
      color: "text-teal-600",
    },
    {
      icon: Users,
      title: t("onboardingTitle3"),
      description: t("onboardingDesc3"),
      color: "text-teal-600",
    },
    {
      icon: CheckSquare,
      title: t("onboardingTitle4"),
      description: t("onboardingDesc4"),
      color: "text-teal-600",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const isLastSlide = currentSlide === slides.length - 1;
  const CurrentIcon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-teal-50 flex flex-col">
      {/* Skip button */}
      {!isLastSlide && (
        <div className="flex justify-end p-6">
          <button
            onClick={handleSkip}
            className="text-gray-600 hover:text-teal-600 transition-colors"
          >
            {t("skip")}
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-20">
        {/* Icon */}
        <div className="mb-12 transform transition-all duration-500">
          <div className="w-32 h-32 bg-teal-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-600/30">
            <CurrentIcon className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center mb-6 text-gray-900 max-w-md">
          {slides[currentSlide].title}
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 max-w-md leading-relaxed">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Bottom section */}
      <div className="pb-12 px-8">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 bg-teal-600"
                  : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next/Get Started button */}
        <Button
          onClick={handleNext}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white h-14 rounded-xl"
        >
          {isLastSlide ? t("getStarted") : t("next")}
        </Button>
      </div>
    </div>
  );
}