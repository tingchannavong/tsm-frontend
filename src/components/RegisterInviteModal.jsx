import { createRegisterInviteLink } from "../api/auth.js";
import { useT } from "../languages/translations.js";
import Swal from "sweetalert2";

function RegisterInviteModal() {
  const t = useT();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData(e.target);
        await createRegisterInviteLink(Object.fromEntries(formData));
        Swal.fire({
            text: "Invite link successfully sent to user's email."
        })
        document.getElementById("register_invite_modal").close();
    } catch (error) {
        console.log('error', error);
          Swal.fire({
            text: error.response.data.message
        });
    }
  };

  const formLineStyles = "form-control flex gap-2 justify-between";

  return (
    <dialog id="register_invite_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{t("gen_register_invite")}</h3>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className={formLineStyles}>
            <label className="label">{t("email")}</label>
            <input
              name="email"
              type="email"
              className="input input-bordered"
              placeholder="name@email.com"
            />
          </div>
          <span className="italic">{t("invite_instructions")}</span>
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() =>
                document.getElementById("register_invite_modal").close()
              }
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default RegisterInviteModal;
