import { useState } from "react";

function Contact() {
  const env = import.meta.env;
  const [change, setChange] = useState({
    email: "",
    txt: "",
  });

  const changeForm = (e) => {
    const { name, value } = e.target;
    setChange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const sub = (e) => {
    e.preventDefault();
    if (!regexMail.test(change.email)) {
      alert("Adresse e-mail incorrecte");
    }
    if (change.txt.length <= 2) {
      alert("Votre message comporte un nombre de caractères insuffisant");
    }
    if (regexMail.test(change.email) && change.txt.length > 2) {
      fetch(
        `${env.VITE_API_HTTP}://${env.VITE_API_URL}:${env.VITE_API_SERVER_PORT}/mail-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(change),
        }
      );
      alert("message envoyer");
      setChange({
        email: "",
        txt: "",
      });
    }
  };
  return (
    <div className="div-go-to-contact">
      Quelque chose à nous dire ?<br />
      <br />
      <form method="post" onSubmit={sub}>
        <input
          type="email"
          name="email"
          placeholder="Votre mail ..."
          className="inpt-mail-contact"
          onChange={changeForm}
          value={change.email}
        />
        <br />
        <br />
        <textarea
          name="txt"
          placeholder="Votre message ..."
          className="area-message-contact"
          onChange={changeForm}
          value={change.txt}
        />
        <input
          type="submit"
          value="envoyer"
          className={
            regexMail.test(change.email) && change.txt.length > 2
              ? "submit-message-contact-on"
              : "submit-message-contact-off"
          }
        />
      </form>
    </div>
  );
}

export default Contact;
