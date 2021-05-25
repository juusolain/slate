function Modal(props) {
  return (
    <div className="absolute translate-x-2/4 inset-0 w-screen h-screen">
      <div className="mx-auto w-4/5">{props.children}</div>
    </div>
  );
}
