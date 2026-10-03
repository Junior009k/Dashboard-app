import { useEffect, useState } from "react";

import {
  getBoardPermissions
} from "../services/boardPermissionService";

function useBoardPermissions(
  boardId,
  token
) {
  const [permissions, setPermissions] =
    useState([]);

  useEffect(() => {
    if (!boardId || !token) {
      return;
    }

    async function loadPermissions() {
      try {
        const data =
          await getBoardPermissions(
            boardId,
            token
          );

        setPermissions(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadPermissions();
  }, [boardId, token]);

  return {
    permissions
  };
}

export default useBoardPermissions;