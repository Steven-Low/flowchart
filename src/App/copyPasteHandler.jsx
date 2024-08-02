// copyPasteHandler.js
import { useCallback } from 'react';
import { nanoid } from 'nanoid/non-secure';

const copyPasteHandler = (reactFlowInstance, setNodes, setEdges) => {

  // Get selected nodes and edges
  const selectedNodes = reactFlowInstance.getNodes().filter(node => node.selected);
  const selectedEdges = reactFlowInstance.getEdges().filter(edge => edge.selected);

  if (selectedNodes.length !== 0) {
    // Save nodes id pairs
    const hashmap = {}

    // Duplicate selected nodes
    const duplicateNodes = selectedNodes.map(node => {
      const newNode = JSON.parse(JSON.stringify(node));
      newNode.id = nanoid();
      newNode.type = "default";
      newNode.selected = true;
      newNode.position = { x: node.position.x + 10, y: node.position.y + 10 }; // Offset position slightly
      hashmap[node.id] = newNode.id;
      return newNode;
    });

    // Duplicate selected edges
    const duplicateEdges = selectedEdges.map(edge => {
      const newEdge = JSON.parse(JSON.stringify(edge));
      newEdge.id = nanoid();
      newEdge.source = `${hashmap[edge.source]}`;
      newEdge.target = `${hashmap[edge.target]}`;
      newEdge.selected = true;
      return newEdge;
    });

    // Deselect original nodes and edges
    setNodes((nds) =>
      nds.map((node) => {
          return {
            ...node,
            selected: false,
          };
      }),
    );
    setEdges((eds) =>
      eds.map((edge) => {
          return {
            ...edge,
            selected: false,
          };
      }),
    );

    // Set new nodes and edges
    setNodes(nds => nds.concat(...duplicateNodes));
    setEdges(eds => eds.concat(...duplicateEdges));
  } 
};

export default copyPasteHandler;