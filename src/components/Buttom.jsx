function Buttom(props) {
  return (
    <button
      {...props}
      className="bg-slate-400 p-2 text-white rounded-md text-center cursor-pointer"
    >
      {props.textContent}
    </button>
  );
}

export default Buttom;
