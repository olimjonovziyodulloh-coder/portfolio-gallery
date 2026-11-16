(function () {
  var e = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useMemo = React.useMemo;
  var useRef = React.useRef;

  var projects = [
    { id: 1, title: 'Developer Portfolio', description: 'A personal portfolio with bio, skills, project highlights and theme toggle. Built with semantic, accessible HTML and responsive CSS.', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/olimjonovziyodulloh-coder/portfolio', demo: 'https://olimjonovziyodulloh-coder.github.io/portfolio/' },
    { id: 2, title: 'Book Search App', description: 'Searches the Open Library API by title or author and renders book results with covers, authors and publish years.', tech: ['HTML', 'CSS', 'JavaScript', 'API'], github: 'https://github.com/olimjonovziyodulloh-coder/webpro-book-search', demo: 'https://olimjonovziyodulloh-coder.github.io/webpro-book-search/' },
    { id: 3, title: 'webpro-w9 — GitHub Pages', description: 'A static site published with GitHub Pages, including a custom 404 page, created for the Week 9 deployment assignment.', tech: ['HTML', 'CSS'], github: 'https://github.com/olimjonovziyodulloh-coder/webpro-w9', demo: 'https://olimjonovziyodulloh-coder.github.io/webpro-w9/' },
    { id: 4, title: 'Web Programming Archive', description: 'The course archive collecting weekly exercises, reports and projects from HTML basics to React, with a consistent themed UI.', tech: ['HTML', 'CSS', 'JavaScript', 'React'], github: 'https://github.com/olimjonovziyodulloh-coder/web_programming', demo: 'https://olimjonovziyodulloh-coder.github.io/web_programming/' },
    { id: 5, title: 'Student Directory', description: 'Task 11-A: three student profile cards rendered from one reusable component that takes five props.', tech: ['React'], github: 'https://github.com/olimjonovziyodulloh-coder/task11', demo: 'https://olimjonovziyodulloh-coder.github.io/task11/' },
    { id: 6, title: 'React Lab', description: 'The Week 11 class tasks from the study guide, video lecture and visual lecture, rebuilt as one React app.', tech: ['React'], github: 'https://github.com/olimjonovziyodulloh-coder/react-lab', demo: 'https://olimjonovziyodulloh-coder.github.io/react-lab/' }
  ];

  var STORAGE_KEY = 'gallery-tech';

  function readStoredTech() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || 'All';
    } catch (error) {
      return 'All';
    }
  }

  function TechList(props) {
    return e('ul', { className: 'tech-list', 'aria-label': 'Tech stack' },
      props.tech.map(function (item) {
        return e('li', { key: item, className: 'tech-tag' }, item);
      })
    );
  }

  function ProjectCard(props) {
    var project = props.project;
    return e('article', { className: 'project-card' },
      e('h3', { className: 'project-title' }, project.title),
      e('p', { className: 'project-desc' }, project.description),
      e(TechList, { tech: project.tech }),
      e('div', { className: 'project-links' },
        e('a', { href: project.github, target: '_blank', rel: 'noopener noreferrer' }, 'GitHub \u2197'),
        project.demo ? e('a', { href: project.demo, target: '_blank', rel: 'noopener noreferrer' }, 'Live demo \u2197') : null,
        e('button', {
          type: 'button',
          className: 'details-btn',
          onClick: function () { props.onOpen(project); }
        }, 'Details')
      )
    );
  }

  function ProjectList(props) {
    if (props.projects.length === 0) {
      return e('div', { className: 'empty' },
        e('p', null, 'No project matches this search and filter.'),
        e('button', { type: 'button', className: 'reset-btn', onClick: props.onReset }, 'Clear search and filter')
      );
    }
    return e('div', { className: 'project-grid' },
      props.projects.map(function (project) {
        return e(ProjectCard, { key: project.id, project: project, onOpen: props.onOpen });
      })
    );
  }

  function FilterBar(props) {
    return e('div', { className: 'filter-bar', role: 'group', 'aria-label': 'Filter projects by technology' },
      props.technologies.map(function (tech) {
        return e('button', {
          key: tech,
          type: 'button',
          className: props.active === tech ? 'filter-btn active' : 'filter-btn',
          'aria-pressed': props.active === tech,
          onClick: function () { props.onChange(tech); }
        }, tech);
      })
    );
  }

  function SearchBar(props) {
    return e('div', { className: 'search' },
      e('label', { className: 'search-label', htmlFor: 'project-search' }, 'Search projects'),
      e('input', {
        id: 'project-search',
        type: 'search',
        className: 'search-input',
        value: props.value,
        placeholder: 'Title, description or tech\u2026',
        onChange: function (event) { props.onChange(event.target.value); }
      })
    );
  }

  function ProjectModal(props) {
    var project = props.project;
    var closeRef = useRef(null);

    useEffect(function () {
      if (closeRef.current) closeRef.current.focus();

      function handleKey(event) {
        if (event.key === 'Escape') props.onClose();
      }

      document.addEventListener('keydown', handleKey);
      var previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return function () {
        document.removeEventListener('keydown', handleKey);
        document.body.style.overflow = previous;
      };
    }, [props.onClose]);

    return e('div', { className: 'modal-backdrop', onClick: props.onClose },
      e('div', {
        className: 'modal',
        role: 'dialog',
        'aria-modal': 'true',
        'aria-labelledby': 'modal-title',
        onClick: function (event) { event.stopPropagation(); }
      },
        e('div', { className: 'modal-head' },
          e('h2', { id: 'modal-title' }, project.title),
          e('button', {
            type: 'button',
            className: 'modal-close',
            onClick: props.onClose,
            ref: closeRef,
            'aria-label': 'Close project details'
          }, '\u2715')
        ),
        e('p', { className: 'modal-desc' }, project.description),
        e(TechList, { tech: project.tech }),
        e('div', { className: 'project-links' },
          e('a', { href: project.github, target: '_blank', rel: 'noopener noreferrer' }, 'GitHub \u2197'),
          project.demo
            ? e('a', { href: project.demo, target: '_blank', rel: 'noopener noreferrer' }, 'Live demo \u2197')
            : e('span', { className: 'no-demo' }, 'No live demo')
        )
      )
    );
  }

  function App() {
    var activeState = useState(readStoredTech);
    var active = activeState[0], setActive = activeState[1];
    var queryState = useState('');
    var query = queryState[0], setQuery = queryState[1];
    var selectedState = useState(null);
    var selected = selectedState[0], setSelected = selectedState[1];

    var technologies = useMemo(function () {
      var list = ['All'];
      projects.forEach(function (project) {
        project.tech.forEach(function (tech) {
          if (list.indexOf(tech) === -1) list.push(tech);
        });
      });
      return list;
    }, []);

    var visible = useMemo(function () {
      var term = query.trim().toLowerCase();
      return projects.filter(function (project) {
        var matchesTech = active === 'All' || project.tech.indexOf(active) !== -1;
        var matchesText = term === '' ||
          project.title.toLowerCase().indexOf(term) !== -1 ||
          project.description.toLowerCase().indexOf(term) !== -1 ||
          project.tech.some(function (tech) { return tech.toLowerCase().indexOf(term) !== -1; });
        return matchesTech && matchesText;
      });
    }, [active, query]);

    useEffect(function () {
      try {
        window.localStorage.setItem(STORAGE_KEY, active);
      } catch (error) {
        /* storage disabled — the filter still works for this visit */
      }
    }, [active]);

    useEffect(function () {
      document.title = 'Portfolio Gallery \u2014 ' + visible.length + ' of ' + projects.length + ' projects';
    }, [visible.length]);

    function resetFilters() {
      setActive('All');
      setQuery('');
    }

    return e('div', { className: 'app' },
      e('header', { className: 'page-header' },
        e('p', { className: 'eyebrow' }, 'Week 11 \u00B7 React Components & Props'),
        e('h1', null, 'Portfolio Gallery'),
        e('p', { className: 'subtitle' }, 'Six real projects as reusable cards \u2014 filtered by technology, searched by text, and opened in a detail view.')
      ),
      e('div', { className: 'controls' },
        e(SearchBar, { value: query, onChange: setQuery }),
        e(FilterBar, { technologies: technologies, active: active, onChange: setActive })
      ),
      e('p', { className: 'count', 'aria-live': 'polite' },
        'Showing ' + visible.length + ' of ' + projects.length + ' projects' + (active === 'All' ? '' : ' \u00B7 ' + active)
      ),
      e(ProjectList, { projects: visible, onOpen: setSelected, onReset: resetFilters }),
      selected ? e(ProjectModal, { project: selected, onClose: function () { setSelected(null); } }) : null
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(e(React.StrictMode, null, e(App)));
})();
