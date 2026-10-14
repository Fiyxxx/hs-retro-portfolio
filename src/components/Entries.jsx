import Mark from "./Mark";

const Entries = ({ title, items }) => {
  return (
    <section className="reveal mt-10">
      <h2 className="mb-2 text-(--muted)">{title}</h2>
      <ul className="flex flex-col gap-2 sm:gap-0">
        {items.map((item) => (
          <li key={`${item.lead}-${item.label}`}>
            {item.lead && <>{item.lead}, </>}
            <Mark label={item.label} href={item.href} logos={item.logos} />
            {item.note && <span className="text-(--muted)">, {item.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Entries;
