import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      setSending(true);

      if (!nom || !prenom || !email || !type || !message) {
        setSending(false);
        setErrorMessage("Veuillez remplir tous les champs");
        return;
      }

      
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setErrorMessage(null);
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }

      // if (nom || prenom || email || type || message) {
        //   try {
        //     await mockContactApi();
        //     setErrorMessage(null);
        //     setSending(false);
        //     onSuccess();
        //   } catch (err) {
        //     setSending(false);
        //     onError(err);
        //   }
        // } else {
        //   setSending(false);
        //   setErrorMessage("Veuillez remplir tous les champs");
        // }
    },
    [nom, prenom, email, type, message, onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
          <Field
            placeholder=""
            label="Prénom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
          <Select
            selection={["Personel", "Entreprise"]}
            value={type}
            onChange={(value) => setType(value)}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field
            placeholder=""
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errorMessage && <p className="error">{errorMessage}</p>}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
