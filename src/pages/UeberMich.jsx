const UeberMich = () => {
  const cvData = [
    ["Marius Prechtl", "M.A. Fachrichtung Architektur"],
    [
      "2012-2015",
      "Studium an der Hochschule Augsburg, Abschluss: Bachelor of Arts, Fachrichtung Architektur",
    ],
    [
      "2015-2017",
      "Studium an der Hochschule Augsburg, Abschluss: Master of Arts, Fachrichtung Architektur",
    ],
    ["2015-2017", "Werkstudent bei Glogger Architekten, Balzhausen"],
    ["seit 2018", "Mitarbeit bei F64 Architekten"],
  ];

  return (
    <main className="uebermich">
      <section className="lebenslauf">
        {cvData.map((paragraph) => (
          <p>
            {paragraph[0]} <br /> {paragraph[1]}
          </p>
        ))}
      </section>
      <section className="philosophie">
        <p>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
          rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
          ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
          esse molestie consequat, vel illum dolore eu feugiat nulla facilisis
          at vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.{" "}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
          Nam liber tempor cum soluta nobis eleifend option congue nihil
          imperdiet doming id quod mazim placerat facer
        </p>
      </section>
      <section>
        <img src="" alt=""></img>
      </section>
    </main>
  );
};

export default UeberMich;
