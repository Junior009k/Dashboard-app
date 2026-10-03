import { apiFetch } from "./apiClient";

export async function getBoards(token) {
  return apiFetch(
    "/boards",
    {},
    token
  );
}
export async function createBoard(board,token) {
    return apiFetch(
        `/boards`,
        {
          method: "POST",
          body: JSON.stringify(board)
        },
        token
      );
    }