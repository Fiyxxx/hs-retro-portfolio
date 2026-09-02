import Section from "./ui/Section";
import { experience } from "../data/experience";

const Experience = () => {
  return (
    <Section id="experience" title="Experience">
      {experience.map((job) => (
        <div key={job.company + job.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="text-[15px] font-semibold text-(--ink)">{job.name}</h3>
            <span className="text-[13px] text-(--muted)">{job.dateRange}</span>
          </div>
          <p className="text-[13px] font-medium leading-[19px] text-(--accent)">
            {job.company}
          </p>
          <p className="mt-0.5 text-[13px] leading-[19px] text-(--muted)">{job.tagline}</p>
        </div>
      ))}
    </Section>
  );
};

export default Experience;
