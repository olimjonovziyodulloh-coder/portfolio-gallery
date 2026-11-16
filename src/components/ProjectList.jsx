import ProjectCard from './ProjectCard';

function ProjectList({ projects, onOpen, onReset }) {
  if (projects.length === 0) {
    return (
      <div className="empty">
        <p>No project matches this search and filter.</p>
        <button type="button" className="reset-btn" onClick={onReset}>
          Clear search and filter
        </button>
      </div>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onOpen={onOpen} />
      ))}
    </div>
  );
}

export default ProjectList;
