
function SmallButton(props) {
  const { onClick, text, color } = props;

  const bgColor = color || "bg-black";
  return (
    <button onClick={onClick}
    className={`w-25 ${bgColor} rounded-md p-2 text-white mb-3`}>
        {text}
    </button>
  )
}
export default SmallButton
