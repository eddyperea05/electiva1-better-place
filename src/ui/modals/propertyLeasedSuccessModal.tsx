import { useState } from "react";

export const propertyLeasedSuccessModal = () => {
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);

  return (
    isOpenModal && (
      <div className="fixed top-0 left-0 bottom-0 right-0 bg-black opacity-25">
        <div className="bn-white">
            <p>Hola</p>
        </div>
      </div>
    )
  );
};
