function Button(props) {
  const { onClick, text, color, type } = props;

  const bgColor = color || "bg-[#2D877C]";
  const buttonType = type || "button";
  const bigScreenStyles="xl:w-100";

  return (
    <button onClick={onClick} type={buttonType}
    className={`w-full rounded-2xl p-2 text-white uppercase font-medium ${bgColor} ${bigScreenStyles}`}>
        {text}
    </button>
  )
}

export default Button