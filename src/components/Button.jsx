function Button(props) {
  const bgColor = props.color || "bg-[#2D877C]";
  return (
    <button className={`w-full ${bgColor} rounded-2xl p-2 text-white uppercase font-medium`}>
        {props.text}
    </button>
  )
}

export default Button