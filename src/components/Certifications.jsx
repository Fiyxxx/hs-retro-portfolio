import Section from "./ui/Section";
import { certifications } from "../data/certifications";

const Certifications = () => {
  return (
    <Section id="certifications" title="Certifications">
      {certifications.map((cert) => (
        <div key={cert.name}>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold text-(--ink) transition-colors hover:text-(--accent)"
          >
            {cert.name}
          </a>
          <p className="text-[13px] leading-[19px] text-(--muted)">{cert.content}</p>
        </div>
      ))}
    </Section>
  );
};

export default Certifications;
