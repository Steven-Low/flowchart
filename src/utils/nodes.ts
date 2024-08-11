import {type Node} from '@xyflow/react';

const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Node 0' },
      position: { x: 250, y: 5 },
      className: 'light',
    },
    {
      id: '2',
      type: 'default',
      data: { label: 'Group A' },
      position: { x: 100, y: 100 },
      className: 'light',
      style: { backgroundColor: 'rgba(235, 77, 75, 0.5)', width: 200, height: 200 },
    },
    {
      id: '2a',
      type: 'default',
      data: { label: 'Node A.1' },
      position: { x: 10, y: 50 },
      parentId: '2',
    },
    {
      id: '3',
      type: 'resizableNode',
      data: { label: 'Node 1' },
      position: { x: 320, y: 100 },
      className: 'light',
      style: {
        background: '#fff',
        border: '1px solid blue',
        borderRadius: 15,
        fontSize: 12,
      }
    },
    {
      id: '4',
      type: 'default',
      data: { label: 'Group B' },
      position: { x: 320, y: 200 },
      className: 'light',
      style: { backgroundColor: 'rgba(235, 77, 75, 0.5)', width: 300, height: 300 },
    },
    {
      id: '4a',
      type: 'default',
      data: { label: 'Node B.1' },
      position: { x: 15, y: 65 },
      className: 'light',
      parentId: '4',
    
    },
    {
      id: '4b',
      type: 'default',
      data: { label: 'Group B.A' },
      position: { x: 15, y: 120 },
      className: 'light',
      style: {
        backgroundColor: 'rgba(224, 86, 253, 0.5)',
        height: 150,
        width: 270,
      },
      parentId: '4',
    },
    {
      id: '4b1',
      type: 'default',
      data: { label: 'Node B.A.1' },
      position: { x: 20, y: 40 },
      className: 'light',
      parentId: '4b',
    },
    {
      id: '4b2',
      type: 'default',
      data: { label: 'Node B.A.2' },
      position: { x: 100, y: 100 },
      className: 'light',
      parentId: '4b',
    },
  ];
  
  export default initialNodes;