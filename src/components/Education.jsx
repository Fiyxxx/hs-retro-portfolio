import Section from "./ui/Section";
import { schools } from "../data/education";

const Education = () => {
  return (
    <Section id="education" title="Education">
      {schools.map((school) => (
        <div key={school.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="text-[15px] font-semibold text-(--ink)">{school.name}</h3>
            <span className="text-[13px] text-(--muted)">{school.years}</span>
          </div>
          <p className="text-[13px] leading-[19px] text-(--muted)">
            {school.focus}
            {school.score && ` · ${school.score}`}
          </p>
        </div>
      ))}
    </Section>
  );
};

export default Education;
