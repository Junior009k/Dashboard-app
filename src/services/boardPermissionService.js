import { apiFetch } from "./apiClient";

export async function getBoardPermissions(
  boardId,
  token
) {
  return apiFetch(
    `/boards/${boardId}/permissions`,
    {},
    token
  );
}

export async function addBoardPermission(
  boardId,
  permission,
  token
) {
  return apiFetch(
    `/boards/${boardId}/permissions`,
    {
      method: "POST",
      body: JSON.stringify(permission)
    },
    token
  );
}

export async function updateBoardPermission(
  boardId,
  permissionId,
  permission,
  token
) {
  return apiFetch(
    `/boards/${boardId}/permissions/${permissionId}`,
    {
      method: "PUT",
      body: JSON.stringify(permission)
    },
    token
  );
}

export async function deleteBoardPermission(
  boardId,
  permissionId,
  token
) {
  return apiFetch(
    `/boards/${boardId}/permissions/${permissionId}`,
    {
      method: "DELETE"
    },
    token
  );
}