import { apiFetch } from "./apiClient";

export async function getBoardItems(
  boardId,
  token
) {
  return apiFetch(
    `/boards/${boardId}/items`,
    {},
    token
  );
}

export async function createBoardItem(
  boardId,
  item,
  token
) {
  return apiFetch(
    `/boards/${boardId}/items`,
    {
      method: "POST",
      body: JSON.stringify(item)
    },
    token
  );
}

export async function updateBoardItem(
  boardId,
  itemId,
  item,
  token
) {
  return apiFetch(
    `/boards/${boardId}/items/${itemId}`,
    {
      method: "PUT",
      body: JSON.stringify(item)
    },
    token
  );
}

export async function deleteBoardItem(
  boardId,
  itemId,
  token
) {
  return apiFetch(
    `/boards/${boardId}/items/${itemId}`,
    {
      method: "DELETE"
    },
    token
  );
}