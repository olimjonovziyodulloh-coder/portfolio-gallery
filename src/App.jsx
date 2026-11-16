import { useEffect, useMemo, useState } from 'react';
import projects from './data/projects';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ProjectList from './components/ProjectList';
import ProjectModal from './components/ProjectModal';

const STORAGE_KEY = 'gallery-tech';

function readStoredTech() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) || 'All';
  } catch {
    return 'All';
  }
}

function App() {
  const [active, setActive] = useState(readStoredTech);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const technologies = useMemo(
    () => ['All', ...new Set(projects.flatMap((p) => p.tech))],
    []
  );

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesTech = active === 'All' || project.tech.includes(active);
      const matchesText =
        term === '' ||
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.tech.some((tech) => tech.toLowerCase().includes(term));
      return matchesTech && matchesText;
    });
  }, [active, query]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, active);
    } catch {
      /* storage disabled — filter still works for this visit */
    }
  }, [active]);

  useEffect(() => {
    document.title = `Portfolio Gallery — ${visible.length} of ${projects.length} projects`;
  }, [visible.length]);

  function resetFilters() {
    setActive('All');
    setQuery('');
  }

  return (
    <div className="app">
      <header className="page-header">
        <p className="eyebrow">Week 11 · React Components &amp; Props</p>
        <h1>Portfolio Gallery</h1>
        <p className="subtitle">
          Six real projects as reusable cards — filtered by technology, searched by
          text, and opened in a detail view.
        </p>
      </header>

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar technologies={technologies} active={active} onChange={setActive} />
      </div>

      <p className="count" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
        {active === 'All' ? '' : ` · ${active}`}
      </p>

      <ProjectList projects={visible} onOpen={setSelected} onReset={resetFilters} />

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

export default App;
