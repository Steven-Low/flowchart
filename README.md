# Introduction 
A simple flowchart drawing diagram. 

# Example
- Live demo on https://flowchartdiagram.vercel.app
- For professional use cases, please go to https://draw.io

# Create new react app with typescript template
```
npx create-react-app my-app --template typescript
```

# Add typescript compatibility to existing react app
```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

# Install package dependencies
```
npm install reactflow 
npm install typescript@4.9.5
npm install --legacy-peer-deps
npm install html-to-image
npm install react-router-dom@6
```

# How to use?

1) Delete Node(s)
   - To delete a node, left click on the node and press backspace.
   - To delete multiple nodes, hold ctrl when left click on the node and press backspace.
   - TO delete multiple nodes in an area, hold shift and highlight the area of node to be deleted via backspace.

2) Group Node(s)
    - A resizableNode is equivalent to a group node, which can store other node or group node.
