const Section = ({ id, title, children }) => {
  return (
    <section id={id} className="w-full py-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-[16px] font-semibold text-(--ink)">{title}</h2>
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </section>
  );
};

export default Section;
