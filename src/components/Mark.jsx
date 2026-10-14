// A label with optional inline logos, linked out when it has an href.
const Mark = ({ label, href, logos = [] }) => {
  const content = (
    <>
      {logos.map((logo) => (
        <img key={logo} src={logo} alt="" className="logo" />
      ))}
      <span className={href ? "link" : undefined}>{label}</span>
    </>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="mark">
      {content}
    </a>
  ) : (
    <span className="mark">{content}</span>
  );
};

export default Mark;
