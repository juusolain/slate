export function Button({ onClick, color, hoverColor, ...props }) {
  return (
    <button
      className={`text-white rounded p-1 px-2 mx-1 focus:outline-none hover:${hoverColor} ${color}`}
      onClick={onClick}
    >
      {props.children}
    </button>
  );
}
