function Button(props) {
  const { onClick, text, color } = props;

  const bgColor = color || "bg-[#2D877C]";
  return (
    <button onClick={onClick}
    className={`w-full ${bgColor} rounded-2xl p-2 text-white uppercase font-medium`}>
        {text}
    </button>
  )
}

export default Button