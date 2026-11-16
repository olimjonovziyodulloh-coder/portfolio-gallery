import { useState } from 'react';
import projects from './data/projects';
import FilterBar from './components/FilterBar';
import ProjectList from './components/ProjectList';

function App() {
  const [active, setActive] = useState('All');

  const technologies = ['All', ...new Set(projects.flatMap((p) => p.tech))];

  const visible = active === 'All'
    ? projects
    : projects.filter((p) => p.tech.includes(active));

  return (
    <div className="app">
      <header className="page-header">
        <p className="eyebrow">Week 11 · React Components &amp; Props</p>
        <h1>Portfolio Gallery</h1>
        <p className="subtitle">
          Six real projects rendered as reusable cards and filtered by technology.
        </p>
      </header>

      <FilterBar technologies={technologies} active={active} onChange={setActive} />
      <p className="count" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>
      <ProjectList projects={visible} />
    </div>
  );
}

export default App;
