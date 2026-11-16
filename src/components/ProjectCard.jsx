function ProjectCard({ title, description, tech, github, demo }) {
  return (
    <article className="project-card">
      <h3 className="project-title">{title}</h3>
      <p className="project-desc">{description}</p>
      <ul className="tech-list" aria-label="Tech stack">
        {tech.map((t) => (
          <li key={t} className="tech-tag">{t}</li>
        ))}
      </ul>
      <div className="project-links">
        <a href={github} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a href={demo} target="_blank" rel="noopener noreferrer">Live demo ↗</a>
      </div>
    </article>
  );
}

export default ProjectCard;
