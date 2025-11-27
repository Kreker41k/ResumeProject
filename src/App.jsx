import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const ModalButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showMyInfo, setShowMyInfo] = useState(false);
  const [showContacts, setShowContacts] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [hasScrolledToInfo, setHasScrolledToInfo] = useState(false);

  const myInfoRef = useRef(null);
  const contactsRef = useRef(null);

  useEffect(() => {
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false);
    }, 1000);

    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1200);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasScrolledToInfo) {
            setHasScrolledToInfo(true);
            
            setTimeout(() => {
              setShowMyInfo(true);
            }, 200);
            
            setTimeout(() => {
              setShowContacts(true);
            }, 600);
            
            setTimeout(() => {
              setShowContent(true);
            }, 1200);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (myInfoRef.current) {
      observer.observe(myInfoRef.current);
    }

    return () => {
      if (myInfoRef.current) {
        observer.unobserve(myInfoRef.current);
      }
    };
  }, [hasScrolledToInfo]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const openProjectModal = (projectName) => {
    setActiveProject(projectName);
    setCurrentImageIndex(0);
    setAnimationClass('');
  };
  
  const closeProjectModal = () => {
    setActiveProject(null);
    setCurrentImageIndex(0);
    setAnimationClass('');
  };

  const nextImage = () => {
    if (activeProject && projects[activeProject]) {
      const nextIndex = currentImageIndex === projects[activeProject].images.length - 1 ? 0 : currentImageIndex + 1;
      setCurrentImageIndex(nextIndex);
      setAnimationClass('slide-next');
      setTimeout(() => setAnimationClass(''), 300);
    }
  };

  const prevImage = () => {
    if (activeProject && projects[activeProject]) {
      const prevIndex = currentImageIndex === 0 ? projects[activeProject].images.length - 1 : currentImageIndex - 1;
      setCurrentImageIndex(prevIndex);
      setAnimationClass('slide-prev');
      setTimeout(() => setAnimationClass(''), 300);
    }
  };

  const projects = {
    LoginForm: {
      title: "LoginForm",
      description: "LoginForm — это веб-проект аутентификации с адаптивным интерфейсом, поддерживающая светлую и тёмную темы. Проект реализован на HTML5, CSS3 с использованием CSS-переменных для тем и ванильного JavaScript для динамической валидации форм. Включает регистрацию, авторизацию, валидацию данных и сохранение состояния через Local Storage. Адаптивный дизайн обеспечивает корректное отображение на различных устройствах с плавными анимациями переходами.",
      technologies: ["TypeScript", "JavaScript", "CSS", "HTML"],
      images: ["logform1.png", "logform2.png", "logform3.png"],
      projectLink: "https://github.com/Kreker41k/LoginForm"
    },
    ResumeProject: {
      title: "ResumeProject",
      description: "ResumeProject — это интерактивное React-приложение, которое вы имеете честь сейчас наблюдать, для презентации проектов с модальными окнами и каруселью изображений. Используется современный стек: React с хуками (useState) для управления состоянием, CSS3 с Grid/Flexbox для адаптивной сетки и сложных анимаций. Реализована кастомная модальная логика без сторонних библиотек, поддержка жестов переключения изображений и градиентных эффектов. Vite служит инструментом сборки для оптимизированной разработки. На создание данного проекта у меня ушло 4 недели",
      technologies: ["React", "CSS", "HTML", "Vite"],
      images: ["reactproj1.png", "reactproj2.png", "reactproj3.png"],
      projectLink: null
    },
    TattooTest: {
      title: "TattooTest",
      description: "TattooTest — это интерактивный веб-тест на JavaScript для определения подходящего стиля татуировки. Проект использует ванильный JavaScript для динамической логики тестирования, HTML5 для семантической разметки и CSS3 с Grid/Flexbox для адаптивного интерфейса. Реализована система прогресса, навигация между вопросами, алгоритм подсчета результатов и фоновый слайдшоу с примерами татуировок в финале.",
      technologies: ["JavaScript", "CSS", "HTML"],
      images: ["test1.png", "test2.png", "test3.png"],
      projectLink: "https://github.com/Kreker41k/TattooTest"
    },
    Appartment_view: {
      title: "Appartment_view",
      description: "Данный проект представляет собой интерактивную веб-систему для просмотра 3D-моделей в реальном времени с использованием технологий Three.js и WebGL. Реализован режим свободного перемещения в сцене с помощью Pointer Lock API и управления клавишами WASD. Для рендеринга используются расширенные методы теней PCFSoftShadowMap, физически корректное освещение и тональное отображение ACESFilmic. Серверная часть на Python обеспечивает раздачу статических файлов и базовый API для взаимодействия с клиентом.",
      technologies: ["JavaScript", "CSS", "HTML", "Python"],
      images: ["appart1.png", "appart2.png", "appart3.png"],
      projectLink: "https://github.com/Kreker41k/Appartment_view"
    },
    WeatherApp: {
      title: "WeatherApp",
      description: "Это Vue 3 приложение для просмотра погоды с TypeScript поддержкой, использующее Composition API и современный стек веб-технологий. Приложение получает актуальные метеоданные через OpenWeatherMap API и отображает температуру, влажность, давление и скорость ветра в элегантном glass-morphism дизайне. Пользователь может ввести любой город в поисковую строку, чтобы мгновенно получить текущий прогноз с адаптивной версткой для мобильных устройств. Проект демонстрирует модульную архитектуру с композаблами, TypeScript типами и компонентным подходом во Vue 3.",
      technologies: ["TypeScript", "Vue 3", "API"],
      images: ["weather1.png", "weather2.png", "weather3.png"],
      projectLink: "https://github.com/Kreker41k/WeatherApp"
    }
  };

  const openProjectLink = () => {
    if (activeProject && projects[activeProject].projectLink) {
      window.open(projects[activeProject].projectLink, "_blank");
    }
  };

  return (
    <div className="all-content">
      <div className={`welcome-title ${showWelcome ? 'welcome-visible' : 'welcome-hidden'}`}>
        <h1>Резюме</h1>
      </div>
      
      <div className={`normal-title ${showWelcome ? 'title-hidden' : 'title-visible'}`}>
        <h1>Резюме</h1>
        <p>Представлено 5 проектов</p>
        <button 
          onClick={openModal} 
          className={`modal-button ${showButton ? 'button-visible' : 'button-hidden'}`}
        >
          Выбрать проект
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-div d1">
              <h2>LoginForm</h2>
              <button onClick={() => openProjectModal('LoginForm')} className="modal-button">
                О проекте
              </button>
            </div>
            <div className="modal-div d2">
              <h2>ResumeProject</h2>
              <button onClick={() => openProjectModal('ResumeProject')} className="modal-button">
                О проекте
              </button>
            </div>
            <div className="modal-div d3">
              <h2>TattooTest</h2>
              <button onClick={() => openProjectModal('TattooTest')} className="modal-button">
                О проекте
              </button>
            </div>
            <div className="modal-div d4">
              <h2>Appartment_view</h2>
              <button onClick={() => openProjectModal('Appartment_view')} className="modal-button">
                О проекте
              </button>
            </div>
            <div className="modal-div d5">
              <h2>WeatherApp</h2>
              <button onClick={() => openProjectModal('WeatherApp')} className="modal-button">
                О проекте
              </button>
            </div>
            <div className="d6">
              <button onClick={closeModal} className="modal-button">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {activeProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeProjectModal}>×</button>
            
            <h2>{projects[activeProject].title}</h2>
            
            <div className="project-description">
              <p>{projects[activeProject].description}</p>
            </div>
            
            <div className="project-technologies">
              <h3>Используемые технологии:</h3>
              <ul>
                {projects[activeProject].technologies.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
              </ul>
            </div>
            
            <div className="project-images">
              <h3>Скриншоты проекта:</h3>
              <div className="carousel-container">
                <div className="carousel-frame">
                  <button className="carousel-button prev-button" onClick={prevImage}>
                    ‹
                  </button>
                  
                  <div className="image-container">
                    <img 
                      src={`/${projects[activeProject].images[currentImageIndex]}`} 
                      alt={`Скриншот ${currentImageIndex + 1}`} 
                      className={`carousel-image ${animationClass}`}
                    />
                  </div>
                  
                  <button className="carousel-button next-button" onClick={nextImage}>
                    ›
                  </button>
                </div>
                
                <div className="carousel-indicators">
                  <span>
                    {currentImageIndex + 1} / {projects[activeProject].images.length}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="project-actions">
            {projects[activeProject].projectLink && (
              <button onClick={openProjectLink} className="modal-button">
                Открыть проект
              </button>
            )}
              <button onClick={closeProjectModal} className="modal-button">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={myInfoRef} 
        className={`MyInfo-container ${showMyInfo ? 'myinfo-visible' : 'myinfo-hidden'} ${showContent ? 'content-visible' : ''}`}
      >
        <div className="MyInfo">
          <h2>Обо мне</h2>
          <p>Студент РТУ МИРЭА направление 'Фундаментальная информатика и цифровые тезнологии' специальность 'Исскуственный интеллект'</p>
          <div>
            <h3>Мой стэк</h3>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>React.js</li>
            <li>Vue.js</li>
          </div>
        </div>
      </div>
      
      <div 
        ref={contactsRef} 
        className={`Contacts-container ${showContacts ? 'contacts-visible' : 'contacts-hidden'} ${showContent ? 'content-visible' : ''}`}
      >
        <div className="Contacts">
          <h2>Контакты</h2>
          <div className="contact-item">
            <strong>Email:</strong> pryadko.2005@inbox.ru
          </div>
          <div className="contact-item">
            <strong>Телефон:</strong> 8 (967) 187-99-56
          </div>
          <div className="contact-item">
            <strong>GitHub:</strong> <a href="https://github.com/Kreker41k?tab=repositories" target="_blank">Kreker41k</a>
          </div>
          <div className="contact-item">
            <strong>Telegram:</strong> @krekuk
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalButton;