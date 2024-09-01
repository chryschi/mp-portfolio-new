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
        Zeitlose und minimalistische <br /> Architektur für jeden. Let&apos;s do
        this. <br /> Lorem ipsum dolor sit amet, consetetur <br /> sadipscing
        elitr, sed diam.
      </p>
      <address>
        <ul>
          {contacts.map((entry, idx) => (
            <li key={idx}>
              <p className="address-label">{entry.label}</p>
              <p>
                <a>
                  {entry.linkContent}
                  <span className="material-symbols-outlined link-icon">
                    north_east
                  </span>
                </a>
              </p>
            </li>
          ))}
        </ul>
      </address>
    </main>
  );
};

export default Kontakt;
