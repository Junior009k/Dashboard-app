import { BOARD_ITEM_TYPES } from "./boardItemTypes";

const boardItemDefaults = {
  [BOARD_ITEM_TYPES.NOTE]: {
    data: {
      content: "Nueva nota"
    },
    position: {
      x: 100,
      y: 100
    },
    size: {
      width: 250,
      height: 180
    }
  },

  [BOARD_ITEM_TYPES.IMAGE]: {
    data: {
      url: "https://picsum.photos/300/200"
    },
    position: {
      x: 300,
      y: 100
    },
    size: {
      width: 300,
      height: 220
    }
  }
};

function createBoardItem(type) {
  const defaults = boardItemDefaults[type];

  if (!defaults) {
    return null;
  }

  return {
    id: Date.now(),
    type,
    data: {
      ...defaults.data
    },
    position: {
      ...defaults.position
    },
    size: {
      ...defaults.size
    }
  };
}

export default createBoardItem;