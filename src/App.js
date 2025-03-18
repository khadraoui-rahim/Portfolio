import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [activeContainer, setActiveContainer] = useState(1);
  const [skillsGlowing, setSkillsGlowing] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [showEmptyPage, setShowEmptyPage] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(null); // No panel expanded by default
  const [showScrollButton, setShowScrollButton] = useState(false);
  const emptyPageRef = useRef(null);
  const contentAreaRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    const getTimeBasedGreeting = () => {
      const hour = new Date().getHours();

      if (hour >= 5 && hour < 12) {
        return 'Good Morning';
      } else if (hour >= 12 && hour < 18) {
        return 'Good Afternoon';
      } else {
        return 'Good Evening';
      }
    };

    setGreeting(getTimeBasedGreeting());

    // Update greeting every minute
    const intervalId = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Handle empty page animation
  useEffect(() => {
    if (showEmptyPage && emptyPageRef.current) {
      // Slight delay to ensure DOM is ready
      setTimeout(() => {
        emptyPageRef.current.classList.add('slide-in');
      }, 50);
    } else if (!showEmptyPage && emptyPageRef.current) {
      // Reset classes for next time
      emptyPageRef.current.classList.remove('slide-in');
    }
  }, [showEmptyPage]);

  // Handle scroll events to show/hide the scroll button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (containerNumber) => {
    setActiveContainer(containerNumber);
  };

  const handleSkillsHeadingClick = () => {
    setSkillsGlowing(!skillsGlowing);
  };

  const handleNextPageClick = () => {
    setShowEmptyPage(true);
  };

  const handlePrevPageClick = () => {
    // Simply toggle showEmptyPage without waiting for animation
    setShowEmptyPage(false);
  };

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', message: '' };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      valid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, show success message
      setFormSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormSubmitted(false);
      }, 3000);
    }
  };

  const handlePanelHover = (index) => {
    setExpandedPanel(index);
  };

  const handlePanelsMouseLeave = () => {
    setExpandedPanel(null); // Set to null to collapse all panels
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App" ref={contentAreaRef}>
      <div className="background">
        <div className="gradient-accent top-left"></div>
        <div className="gradient-accent bottom-right"></div>
      </div>

      <div className={`content-area ${showEmptyPage ? 'slide-out' : ''}`}>
        <div className="content-container">
          <nav className="social-nav">
            <a href="https://www.facebook.com/3.khadraoui" target="_blank" rel="noopener noreferrer" className="social-icon-container">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/khadraoui-abderrahim-906844284/" target="_blank" rel="noopener noreferrer" className="social-icon-container">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
              </svg>
            </a>
            <a href="https://github.com/khadraoui-rahim" target="_blank" rel="noopener noreferrer" className="social-icon-container">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
            </a>
          </nav>
          <div className="greeting-container">
            <p className="greeting-text">{greeting}!</p>
            <p className="email-text">khadraoui.rahim.ws@gmail.com</p>
          </div>

          <div className="page-wrapper">
            <div className="page-navigation">
              <button
                className={`nav-number ${activeContainer === 1 ? 'active' : ''}`}
                onClick={() => handleNavClick(1)}
              >
                1
              </button>
              <button
                className={`nav-number ${activeContainer === 2 ? 'active' : ''}`}
                onClick={() => handleNavClick(2)}
              >
                2
              </button>
              <button
                className={`nav-number ${activeContainer === 3 ? 'active' : ''}`}
                onClick={() => handleNavClick(3)}
              >
                3
              </button>
              <button
                className={`nav-number video-tab ${activeContainer === 4 ? 'active' : ''}`}
                onClick={() => handleNavClick(4)}
              >
                video
              </button>
              <button
                className={`nav-number table-tab ${activeContainer === 5 ? 'active' : ''}`}
                onClick={() => handleNavClick(5)}
              >
                table
              </button>
              <button
                className={`nav-number contact-tab ${activeContainer === 6 ? 'active' : ''}`}
                onClick={() => handleNavClick(6)}
              >
                contact
              </button>
            </div>

            {activeContainer === 1 && (
              <div className="main-container">
                <div className="left-section">
                  <h1>Khadraoui Abderrahim</h1>
                  <p className="bio">
                    I'm a second-year Computer Science student specializing in Information Systems. Passionate about technology and organization, I optimize my studies and personal life through structured workflows. I'm developing a customized Notion setup and exploring productivity methods like the 12 Week Year to enhance efficiency and goal-setting.
                  </p>

                  <h1 className="clickable-heading" onClick={handleSkillsHeadingClick}>Skills</h1>
                  <div className="skills-section">
                    <h2>Technical Skills:</h2>
                    <ul>
                      <li><strong className={skillsGlowing ? 'glowing-skill' : ''}>Programming & Development:</strong> Experience with languages like Python, Java, or JavaScript.</li>
                      <li><strong className={skillsGlowing ? 'glowing-skill' : ''}>Information Systems Knowledge:</strong> Familiar with databases, system design, and enterprise solutions.</li>
                      <li><strong className={skillsGlowing ? 'glowing-skill' : ''}>Problem-Solving & Debugging:</strong> Skilled in analyzing and troubleshooting code or system issues.</li>
                      <li><strong className={skillsGlowing ? 'glowing-skill' : ''}>Notion & Productivity Tools:</strong> Proficient in structuring dashboards, templates, and workflows.</li>
                    </ul>
                  </div>
                </div>

                <div className="right-section">
                  <div className="profile-image"></div>
                </div>
              </div>
            )}

            {activeContainer === 2 && (
              <div className="main-container">
                <div className="left-section">
                  <h1>Education & Projects</h1>
                  <p className="bio">
                    Currently pursuing a Bachelor's degree in Computer Science with a focus on Information Systems. My academic journey has equipped me with a strong foundation in both theoretical concepts and practical applications of technology.
                  </p>

                  <h1>Notable Projects</h1>
                  <div className="skills-section">
                    <h2>Academic & Personal Work:</h2>
                    <ul>
                      <li><strong>Notion Productivity System:</strong> Developed a comprehensive personal management system using Notion.</li>
                      <li><strong>Database Management System:</strong> Created a scalable solution for managing student records.</li>
                      <li><strong>Web Development:</strong> Built responsive websites using modern frameworks and best practices.</li>
                      <li><strong>Automation Scripts:</strong> Developed Python scripts to automate repetitive tasks and improve workflow efficiency.</li>
                    </ul>
                  </div>
                </div>

                <div className="right-section">
                  <div className="profile-image-2"></div>
                </div>
              </div>
            )}

            {activeContainer === 3 && (
              <div className="main-container">
                <div className="left-section">
                  <h1>Experience & Goals</h1>
                  <p className="bio">
                    While focusing on my academic studies, I've gained valuable experience through coursework, personal projects, and collaborative initiatives. I'm constantly seeking opportunities to apply theoretical knowledge to real-world challenges.
                  </p>

                  <h1>Future Aspirations</h1>
                  <div className="skills-section">
                    <h2>Career & Personal Development:</h2>
                    <ul>
                      <li><strong>Information Systems Specialist:</strong> Aiming to become an expert in designing and implementing efficient systems.</li>
                      <li><strong>Productivity Consultant:</strong> Sharing knowledge on optimizing workflows and digital organization.</li>
                      <li><strong>Continuous Learning:</strong> Committed to staying updated with emerging technologies and methodologies.</li>
                      <li><strong>Open Source Contribution:</strong> Planning to actively participate in open-source projects to enhance skills and give back to the community.</li>
                    </ul>
                  </div>
                </div>

                <div className="right-section">
                  <div className="profile-image-3"></div>
                </div>
              </div>
            )}

            {activeContainer === 4 && (
              <div className="video-container">
                <video autoPlay loop muted>
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {activeContainer === 5 && (
              <div className="table-container">
                <h1>Academic & Professional Achievements</h1>
                <table className="achievements-table">
                  <thead>
                    <tr>
                      <th>Achievement</th>
                      <th>Year</th>
                      <th>Institution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>High School Diploma</td>
                      <td>2022</td>
                      <td>Bejaoui 2 High School</td>
                    </tr>
                    <tr>
                      <td>Started College</td>
                      <td>2023</td>
                      <td>University of Algiers 1</td>
                    </tr>
                    <tr>
                      <td>Completed First Year</td>
                      <td>2024</td>
                      <td>University of Algiers 1</td>
                    </tr>
                    <tr>
                      <td>Internship (Data Science)</td>
                      <td>2024</td>
                      <td>213 Code</td>
                    </tr>
                    <tr>
                      <td>Certification (Web Dev)</td>
                      <td>2024</td>
                      <td>Djezzy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeContainer === 6 && (
              <div className="contact-container">
                <h1>Get In Touch</h1>
                <p className="contact-intro">
                  Have a question or want to work together? Send me a message and I'll get back to you soon.
                </p>

                {formSubmitted ? (
                  <div className="form-success-message">
                    <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                    <h2>Thank you!</h2>
                    <p>Your message has been sent successfully. I'll get back to you soon.</p>
                  </div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={formErrors.name ? 'error' : ''}
                        placeholder="Your name"
                      />
                      {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={formErrors.email ? 'error' : ''}
                        placeholder="Your email address"
                      />
                      {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className={formErrors.message ? 'error' : ''}
                        placeholder="Your message"
                        rows="5"
                      ></textarea>
                      {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                    </div>

                    <button type="submit" className="submit-button">Send Message</button>
                  </form>
                )}
              </div>
            )}
          </div>

          <button
            className="chevron-next"
            onClick={handleNextPageClick}
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {showEmptyPage && (
        <div className="empty-page" ref={emptyPageRef}>
          <button
            className="chevron-prev"
            onClick={handlePrevPageClick}
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="dashboard-container">
            <h1 className="dashboard-title">Skills</h1>
            <div className="panels-container" onMouseLeave={handlePanelsMouseLeave}>
              {/* HTML Panel */}
              <div
                className={`panel ${expandedPanel === 0 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(0)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">HTML</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>HTML</h2>
                    <p>Structure your web content with the latest HTML5 standards.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="16 18 22 12 16 6"></polyline>
                        <polyline points="8 6 2 12 8 18"></polyline>
                      </svg>
                      <span>View Code</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>

              {/* CSS Panel */}
              <div
                className={`panel ${expandedPanel === 1 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(1)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">CSS</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>CSS</h2>
                    <p>Style your web applications with modern CSS techniques.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"></path>
                      </svg>
                      <span>Apply Style</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>

              {/* JavaScript Panel */}
              <div
                className={`panel ${expandedPanel === 2 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(2)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">JavaScript</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>JavaScript</h2>
                    <p>Add interactivity to web applications with modern JavaScript.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 17 10 11 4 5"></polyline>
                        <line x1="12" y1="19" x2="20" y2="19"></line>
                      </svg>
                      <span>Run Script</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>

              {/* MongoDB Panel */}
              <div
                className={`panel ${expandedPanel === 3 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(3)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">MongoDB</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>MongoDB</h2>
                    <p>Manage your NoSQL database with flexible document schemas.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="8 17 12 21 16 17"></polyline>
                        <line x1="12" y1="12" x2="12" y2="21"></line>
                        <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
                      </svg>
                      <span>Connect DB</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>

              {/* Figma Panel */}
              <div
                className={`panel ${expandedPanel === 4 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(4)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">Figma</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>Figma</h2>
                    <p>Design interface mockups and prototypes with collaborative features.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                      <span>Open Figma</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>

              {/* Photoshop Panel */}
              <div
                className={`panel ${expandedPanel === 5 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(5)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">Photoshop</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>Photoshop</h2>
                    <p>Edit and enhance images for your web presentations and projects.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16.2 7.8l-2 6.3-6.4 2.1 2-6.3z"></path>
                      </svg>
                      <span>Edit Image</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>

              {/* English Panel */}
              <div
                className={`panel ${expandedPanel === 6 ? 'expanded' : ''}`}
                onMouseEnter={() => handlePanelHover(6)}
              >
                <div className="panel-collapsed">
                  <span className="vertical-text">English</span>
                </div>
                <div className="panel-expanded">
                  <div className="panel-content">
                    <h2>English</h2>
                    <p>Access language tools to improve your communication skills.</p>
                    <button className="panel-action">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <span>Translate</span>
                    </button>
                  </div>
                </div>
                <div className="panel-bg-shape"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to top button */}
      <div className={`scroll-top-button ${showScrollButton ? 'visible' : ''}`} onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </div>
    </div>
  );
}

export default App;
