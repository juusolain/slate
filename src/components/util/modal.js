export default function Modal({ onClickOut, ...props }) {
  return (
    <div
      className="flex justify-center bg-black bg-opacity-80 z-40 absolute translate-x-2/4 inset-0 w-screen h-screen"
      onClick={(e) => {
        e.preventDefault();
        if (e.target === e.currentTarget) onClickOut();
      }}
    >
      <div className="m-auto w-3/5 bg-blue-200 z-50 h-3/5 p-2 rounded">
        {props.children}
      </div>
    </div>
  );
}
