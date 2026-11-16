import { useEffect, useRef } from 'react';

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();

    function handleKey(event) {
      if (event.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="modal-title">{project.title}</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Close project details"
          >
            ✕
          </button>
        </div>

        <p className="modal-desc">{project.description}</p>

        <ul className="tech-list" aria-label="Tech stack">
          {project.tech.map((tech) => (
            <li key={tech} className="tech-tag">{tech}</li>
          ))}
        </ul>

        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
          ) : (
            <span className="no-demo">No live demo</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
