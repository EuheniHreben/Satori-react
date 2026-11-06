import "./ProfileCard.css";
import avatar from "../../assets/avatar.jpg";

function ProfileCard({ quote, mode, onClick }) {
  return (
    <article
      className={`card ${mode === "splash" ? "card--splash" : "card--default"}`}
      onClick={mode === "splash" ? onClick : undefined}
    >
      <div className="avatar">
        <img src={avatar} alt="Аватар" />
      </div>

      {mode === "default" && (
        <div className="quote" key={quote}>
          <p>{quote}</p>
        </div>
      )}
    </article>
  );
}

export default ProfileCard;
