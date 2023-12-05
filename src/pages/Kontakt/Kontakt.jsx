const Kontakt = () => {
  const contacts = [
    {
      label: "Überrasch mich mit einem Anruf",
      linkContent: "+49 (0) 159 04 233 041",
    },
    {
      label: "Oder per EMail",
      linkContent: "prechtl.marius@googlemail.com",
    },
    {
      label: "Folge mir auf Pinterest",
      linkContent: "mariusprechtl",
    },
    {
      label: "Und auf Instagram",
      linkContent: "mariusprechtl",
    },
  ];

  return (
    <main>
      <h1>
        Zeitlose und minimalistische Architektur für jeden. Let's do this. Da
        muss mir noch irgendwas tolles einfallen, was man hier hinschreiben
        kann.
      </h1>
      <ul>
        {contacts.map((entry) => (
          <li>
            <h3>{entry.label}</h3>
            <p>
              <a>{entry.linkContent}</a>
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Kontakt;
