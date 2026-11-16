function ProjectCard({ project, onOpen }) {
  const { title, description, tech, github, demo } = project;

  return (
    <article className="project-card">
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>
      <ul className="tech-list" aria-label="Tech stack">
        {tech.map((item) => (
          <li key={item} className="tech-tag">{item}</li>
        ))}
      </ul>
      <div className="project-links">
        <a href={github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        {demo && <a href={demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}
        <button type="button" className="details-btn" onClick={() => onOpen(project)}>
          Details
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
