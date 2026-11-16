function FilterBar({ technologies, active, onChange }) {
  return (
    <div className="filter-bar" role="group" aria-label="Filter projects by technology">
      {technologies.map((tech) => (
        <button
          key={tech}
          type="button"
          className={active === tech ? 'filter-btn active' : 'filter-btn'}
          aria-pressed={active === tech}
          onClick={() => onChange(tech)}
        >
          {tech}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
