import React, { memo } from "react";

import useModal from "../../shared/hooks/useModal";

import AddUserModal from "./AddUserModal";

export const UsersPage = () => {
  const [
    isAddUserModalVisible,
    handleAddUserModalOpen,
    handleAddUserModalClose
  ] = useModal();

  return (
    <>
      <div>
        <button type="button" onClick={handleAddUserModalOpen}>
          Add User
        </button>
      </div>
      <AddUserModal
        isOpen={isAddUserModalVisible}
        onClose={handleAddUserModalClose}
      />
    </>
  );
};

export default memo(UsersPage);
