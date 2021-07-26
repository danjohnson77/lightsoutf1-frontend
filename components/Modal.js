const Modal = ({
  confirmText,
  cancelText,
  openState,
  setOpenState,
  message,
  subMessage,
  confirmFunction,
}) => {
  return (
    <div
      className={`${
        openState ? "flex" : "hidden"
      } w-full h-screen fixed items-center  justify-center bg-black bg-opacity-80 z-50`}
    >
      <dialog open={openState} className="rounded-lg w-10/12 lg:w-4/12">
        <p>{message}</p>
        <p>{subMessage}</p>
        <div className="flex w-full p-3">
          <button
            className="btn text-white"
            onClick={() => {
              confirmFunction && confirmFunction();
              setOpenState(false);
            }}
          >
            {confirmText}
          </button>
          {cancelText && (
            <button
              className="btn text-white bg-red-700"
              onClick={() => {
                setOpenState(false);
              }}
            >
              {cancelText}
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
