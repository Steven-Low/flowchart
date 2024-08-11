import {
type Node,
  } from '@xyflow/react';

const sortNodes = (node:Node, nodes: Node[]) => {
    nodes = [...nodes].sort((a, b) => {
      if (a.id === node.id) return 1;
      if (b.id === node.id) return -1;
      return 0;
    });
    const children = nodes.filter(n => n.parentId === node.id);
    children.forEach(child => {
      nodes = sortNodes(child, nodes);
    });

  return nodes;
};

const findAbsolutePosition = (currentNode: Node, allNodes: Node[]): { x: number, y: number } => {
  if (!currentNode?.parentId) {
    return { x: currentNode.position.x, y: currentNode.position.y };
  }

  const parentNode = allNodes.find(n => n.id === currentNode.parentId);
  if (!parentNode) {
    return { x: currentNode.position.x, y: currentNode.position.y };
    //throw new Error(`Parent node with id ${currentNode.parentId} not found`);
  }

  const parentPosition = findAbsolutePosition(parentNode, allNodes);
  return {
    x: parentPosition.x + currentNode.position.x,
    y: parentPosition.y + currentNode.position.y
  };
};

export {sortNodes, findAbsolutePosition};