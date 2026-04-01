function Button(props) {
  const { onClick, text, color, type } = props;

  const bgColor = color || "bg-[#2D877C]";
  const buttonType = type || "button";
  return (
    <button onClick={onClick} type={buttonType}
    className={`w-full rounded-2xl p-2 text-white uppercase font-medium ${bgColor}`}>
        {text}
    </button>
  )
}

export default Button