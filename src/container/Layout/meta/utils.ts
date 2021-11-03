// a little function to help us with reordering the result
export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  list = [...list]
  result.forEach((res, index) => {
    const itemToChange = list.find(item => item.id === res.id)
    itemToChange.index = index
  })
  return list;
};

const grid = 8;

export const getItemStyle = (margin: number, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  margin: `${margin}px ${margin}px ${margin}px 0`,

  // change background colour if dragging

  // styles we need to apply on draggables
  ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean, style: any) => ({
  overflow: 'auto',
  ...style
});
