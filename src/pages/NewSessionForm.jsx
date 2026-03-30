import { useT } from "../languages/translations.js";
import styles from "../styles/Base.module.css";
import Button from "../components/Button.jsx";
import SmallButton from "../components/SmallButton.jsx";
import Input from "../components/Input.jsx";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSessionSchema } from "../validations/session.schema.js";
import { useState } from "react";

function NewSessionForm() {
  const t = useT();
  const navigate = useNavigate();
  
  const [isGenNames, setIsGenNames ] = useState(false)

  // BACK TO EXACT SESSION
  const hdlGoBack = () => navigate(-1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      people: 0,
      names: [],
      pricingId: 1,
      groupId: null,
    },
  });

  //  resolver: zodResolver(createSessionSchema),

    const hdlChange = (e) => {
    setIsGenNames(e.target.checked); // ใช้ .checked ไม่ใช่ .value
  };

  const guestNumber = watch("people") || 0;

  const submitData = async (data) => {
    try {
      console.log(data);
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
          <Input
            label={t("player_number")}
            type="number"
            placeholder="0"
            register={register}
            name="people"
          />
          <label htmlFor="">
            <input type="checkbox" checked={isGenNames} onChange={hdlChange} /> {t("auto-generate_names")}
          </label>

          {!isGenNames && Array.from({ length: guestNumber }).map((_, index) => (
            <Input
              key={index}
              label={`${t("guest")} ${index + 1}`}
              placeholder={`${t("enter_name")} ${index + 1}`}
              register={register}
              name={`names.${index}`}
            />
          ))}
        </fieldset>
        <Button text={t("start_timer")} color="bg-black" type="submit" />
      </form>
    </div>
  );
}

export default NewSessionForm;
