import { useEffect, useState } from "react";

import { useAuth } from "../auth/AuthContext";
import createBoardItem from "../util/createBoardItem";
import { getBoardItems , createBoardItem as createBoardItemApi,deleteBoardItem, updateBoardItem} from "../services/boardItemService";
import { BOARD_ITEM_TYPES } from "../util/boardItemTypes";

function useBoard(boardId,token) {
  const { user } = useAuth();

  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  useEffect(() => {
    if (!boardId) {
      return;
    }

    async function loadItems() {
      try {
        const boardItems = await getBoardItems(boardId,token);

        const itemsForReact = boardItems.map(
          mapApiItemToReact
        );

        setItems(itemsForReact);
      } catch (error) {
        console.error(error);
      }
    }

    loadItems();
  }, [boardId,token]);
  async function addNote() {
    if (!boardId) {
      return;
    }
  
    const newNote = createBoardItem(
      BOARD_ITEM_TYPES.NOTE
    );
  
    if (!newNote) {
      return;
    }
  
    try {
      const savedItem = await createBoardItemApi(
        boardId,
        {
          type: newNote.type,
          data: JSON.stringify(newNote.data),
          positionX: newNote.position.x,
          positionY: newNote.position.y,
          width: newNote.size.width,
          height: newNote.size.height
        }, 
        token
      );
  
      const itemForReact = mapApiItemToReact(savedItem);
  
      setItems((previousItems) => [
        ...previousItems,
        itemForReact
      ]);
  
      setSelectedItemId(itemForReact.id);
    } catch (error) {
      console.error(error);
    }
  }

  async function addImage() {
    if (!boardId) {
      return;
    }
  
    const newImage = createBoardItem(
      BOARD_ITEM_TYPES.IMAGE
    );
  
    if (!newImage) {
      return;
    }
  
    try {
      const savedItem = await createBoardItemApi(
        boardId,
        {
          type: newImage.type,
          data: JSON.stringify(newImage.data),
          positionX: newImage.position.x,
          positionY: newImage.position.y,
          width: newImage.size.width,
          height: newImage.size.height
        },
        token
      );
  
      const itemForReact = mapApiItemToReact(savedItem);
  
      setItems((previousItems) => [
        ...previousItems,
        itemForReact
      ]);
  
      setSelectedItemId(itemForReact.id);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteItem(id) {
    if (!boardId) {
      return;
    }
  
    try {
      await deleteBoardItem(boardId, id,token);
  
      setItems((previousItems) =>
        previousItems.filter(
          (item) => item.id !== id
        )
      );
  
      if (selectedItemId === id) {
        setSelectedItemId(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateItem(id, newData) {
    if (!boardId) {
      return;
    }
  
    const currentItem = items.find(
      (item) => item.id === id
    );
  
    if (!currentItem) {
      return;
    }
  
    const updatedItem = {
      ...currentItem,
      data: {
        ...currentItem.data,
        ...newData
      }
    };
  
    try {
      await updateBoardItem(
        boardId,
        id,
        {
          type: updatedItem.type,
          data: JSON.stringify(updatedItem.data),
          positionX: updatedItem.position.x,
          positionY: updatedItem.position.y,
          width: updatedItem.size.width,
          height: updatedItem.size.height
        },
        token
      );
  
      setItems((previousItems) =>
        previousItems.map((item) =>
          item.id === id
            ? updatedItem
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  function updatePosition(id, position) {
    const currentItem = items.find(
      (item) => item.id === id
    );
  
    if (!currentItem) {
      return null;
    }
  
    const updatedItem = {
      ...currentItem,
      position: {
        ...currentItem.position,
        ...position
      }
    };
  
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? updatedItem
          : item
      )
    );
  
    return updatedItem;
  }

  function updateSize(id, size) {
    const currentItem = items.find(
      (item) => item.id === id
    );
  
    if (!currentItem) {
      return null;
    }
  
    const updatedItem = {
      ...currentItem,
      size: {
        ...currentItem.size,
        ...size
      }
    };
  
    setItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? updatedItem
          : item
      )
    );
  
    return updatedItem;
  }
  async function persistItem(item) {
    if (!boardId) {
      return;
    }
  
    try {
      await updateBoardItem(
        boardId,
        item.id,
        {
          type: item.type,
          data: JSON.stringify(item.data),
          positionX: item.position.x,
          positionY: item.position.y,
          width: item.size.width,
          height: item.size.height
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
  function selectItem(id) {
    setSelectedItemId(id);
  }
  function mapApiItemToReact(item) {
    return {
      id: item.id,
      type: item.type,
      data: JSON.parse(item.data),
      position: {
        x: item.positionX,
        y: item.positionY
      },
      size: {
        width: item.width,
        height: item.height
      }
    };
  }

  return {
    user,
    items,
    selectedItemId,
    addNote,
    addImage,
    deleteItem,
    updateItem,
    updatePosition,
    updateSize,
    selectItem,
    persistItem
  };
}

export default useBoard;