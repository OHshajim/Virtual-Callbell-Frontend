import { useEffect } from "react";

const GuestModal = () => {
  useEffect(() => {
    const storedGuest = localStorage.getItem("guestName");
    if (!storedGuest) {
      document.getElementById("my_modal_1").showModal();
    }
  }, []);

  const handleOk = () => {
    const uniqueGuest = `Guest-${Date.now()}`;
    localStorage.setItem("guestName", uniqueGuest);
    document.getElementById("my_modal_1").close();
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            👋 Welcome to CallBell!
          </h2>
          <p className="text-gray-600 mb-4">
            We’re happy to have you here. Enjoy exploring our website!
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={handleOk} className="btn">
                Ok
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default GuestModal;
