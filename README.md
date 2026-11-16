# Portfolio Gallery

React portfolio gallery (Week 11 homework), built in the same archive theme as the
rest of my course work.

## Components

- `ProjectCard` — title, description, tech stack, GitHub link, demo link and a Details button
- `ProjectList` — renders the cards from the projects array, or an empty state with a reset button
- `FilterBar` — filters projects by technology
- `SearchBar` — controlled text search across title, description and tech
- `ProjectModal` — detail dialog with Escape/backdrop close and focus on open

## React features

| Feature | Where |
| --- | --- |
| `useState` | active filter, search text, selected project |
| `useMemo` | technology list and the filtered/searched project list |
| `useEffect` | saves the active filter to `localStorage`, syncs `document.title` |
| `useRef` | focuses the close button when the dialog opens |
| Conditional rendering | empty state, dialog, optional demo link |
| Lists + keys | `.map()` over projects and tech tags |

## Run locally

```bash
npm install
npm run dev
```

Deployed to GitHub Pages (`base: '/portfolio-gallery/'`).
