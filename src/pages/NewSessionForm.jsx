import { useT } from "../languages/translations.js";
import styles from "../styles/Base.module.css";
import Button from "../components/Button.jsx";
import SmallButton from "../components/SmallButton.jsx";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSessionSchema } from "../validations/session.schema.js";

function NewSessionForm() {
  const t = useT();
  const navigate = useNavigate();

  const hdlGoBack = () => navigate(-1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createSessionSchema) });

  const submitData = async (data) => {
    try {
      // await login(data.username, data.password);
      alert("create session success");
      // navigate("/");
    } catch (error) {
      console.log("Status:", error.response.status);
      console.log("Message:", error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <SmallButton text={t("go_back")} onClick={hdlGoBack} />
      <h1 className={`${styles.subtitle}`}>{t("create_session")}</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Player Numbers</legend>
          <input {...register("people")} type="text" className="input" placeholder="0" />
          <p className="label"></p>
          <legend className="fieldset-legend">Names</legend>
          <input type="text" className="input" placeholder="Ikko" />
          <p className="label"></p>
        </fieldset>
        <Button text={t("start_timer")} color="bg-black" />
      </form>
    </div>
  );
}

export default NewSessionForm;
