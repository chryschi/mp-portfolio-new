import "./Kontakt.css";

const Kontakt = () => {
  const contacts = [
    {
      label: "Überrasch mich mit einem Anruf",
      linkContent: "+49 (0) 159 04 233 041",
      // linkUrl:,
    },
    {
      label: "Oder per EMail",
      linkContent: "prechtl.marius@googlemail.com",
      // linkUrl:,
    },
    {
      label: "Folge mir auf Pinterest",
      linkContent: "mariusprechtl",
      // linkUrl:,
    },
    {
      label: "Und auf Instagram",
      linkContent: "mariusprechtl",
      // linkUrl:,
    },
  ];

  return (
    <main className="kontakt">
      <p className="call-to-action">
        Zeitlose und minimalistische <br /> Architektur für jeden. Let's do
        this. <br /> Da muss mir noch irgendwas tolles <br />
        einfallen, was man hier hinschreiben kann.
      </p>
      <address>
        <ul>
          {contacts.map((entry, idx) => (
            <li key={idx}>
              <p className="address-label">{entry.label}</p>
              <p>
                <a>{entry.linkContent}</a>
              </p>
            </li>
          ))}
        </ul>
      </address>
    </main>
  );
};

export default Kontakt;
