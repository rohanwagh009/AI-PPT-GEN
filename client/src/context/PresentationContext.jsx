import { createContext, useState, useEffect } from "react";

const PresentationContext = createContext();

const PresentationProvider = ({ children }) => {
  const [slides, setSlides] = useState([]);
  const [topic, setTopic] = useState("");
  const [user, setUser] = useState(null);
  const [slideCount, setSlideCount] = useState(5); // default to 5
  const [currentPresentation, setCurrentPresentation] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setTopic("");
    setSlides([]);
    setCurrentPresentation(null);
  };

  const value = {
    slides,
    setSlides,
    topic,
    setTopic,
    user,
    setUser,
    slideCount,
    setSlideCount,
    currentPresentation,
    setCurrentPresentation,
    logout,
  };

  return (
    <PresentationContext.Provider value={value}>
      {children}
    </PresentationContext.Provider>
  );
};

export { PresentationContext, PresentationProvider };
