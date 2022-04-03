import { useCallback, useState } from "react";

export default () => {
  const [isModalVisible, setModalVisibility] = useState(false);

  const handleModalOpen = useCallback(() => setModalVisibility(true), []);
  const handleModalClose = useCallback(() => setModalVisibility(false), []);

  return [isModalVisible, handleModalOpen, handleModalClose];
};
