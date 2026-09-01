import Section from "./ui/Section";
import CursorPolaroid from "./CursorPolaroid";
import { useHoverPreview } from "../hooks/useHoverPreview";
import { projects } from "../data/projects";

const Projects = () => {
  const { hovered, setHovered, cursor, trackCursor, showPreview } = useHoverPreview();

  return (
    <Section id="projects" title="Projects">
      <div onMouseLeave={() => setHovered(null)}>
        {projects.map((project, index) => (
          <div
            key={project.title}
            onMouseEnter={(event) => showPreview(index, event)}
            onMouseMove={trackCursor}
            className="py-2 first:pt-0"
          >
            {project.link && project.link !== "#" ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-semibold text-(--ink) transition-colors hover:text-(--accent)"
              >
                {project.title}
              </a>
            ) : (
              <div className="text-[15px] font-semibold text-(--ink)">{project.title}</div>
            )}
            <p className="text-[13px] leading-[19px] text-(--muted)">{project.description}</p>
          </div>
        ))}
      </div>

      <CursorPolaroid items={projects} hovered={hovered} cursor={cursor} />
    </Section>
  );
};

export default Projects;
