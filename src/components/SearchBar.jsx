function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <label className="search-label" htmlFor="project-search">
        Search projects
      </label>
      <input
        id="project-search"
        type="search"
        className="search-input"
        value={value}
        placeholder="Title, description or tech…"
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
