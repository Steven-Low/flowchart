// copyPasteHandler.js
import { useCallback } from 'react';
import { nanoid } from 'nanoid/non-secure';

const copyPasteUtil = (reactFlowInstance, setNodes, setEdges) => {

  // Get selected nodes and edges
  const selectedNodes = reactFlowInstance.getNodes().filter(node => node.selected);
  const selectedEdges = reactFlowInstance.getEdges().filter(edge => edge.selected);

  if (selectedNodes.length !== 0) {
    // Save nodes id pairs
    const hashmap = {};
    selectedNodes.forEach(node => {
      const newId = nanoid();
      hashmap[node.id] = newId;
    })

    // Duplicate selected nodes
    const duplicateNodes = selectedNodes.map(node => {
      const newNode = JSON.parse(JSON.stringify(node));
      newNode.id = hashmap[node.id];
      newNode.type = "default";

      newNode.position = { x: node.position.x + 10, y: node.position.y + 10 }; // Offset position slightly
      newNode.parentId = hashmap[node.parentId] || "";
      return newNode;
    });

    // Duplicate selected edges
    const duplicateEdges = selectedEdges.map(edge => {
      const newEdge = JSON.parse(JSON.stringify(edge));
      newEdge.id = nanoid();
      newEdge.source = `${hashmap[edge.source]}`;
      newEdge.target = `${hashmap[edge.target]}`;

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

export default copyPasteUtil;