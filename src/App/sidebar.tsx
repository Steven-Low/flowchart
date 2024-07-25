import React from 'react';
import { useEffect, useState } from "react";
import { Node, useReactFlow } from "reactflow";

interface Props {
  node: Node;
  onClose?: () => void;
}

export function Sidebar({ node, onClose }: Props) {
  const { setNodes } = useReactFlow();

  const [label, setLabel] = useState(node.data.label);

  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((n) => {
        if (node.id === n.id) {
          return {
            ...n,
            data: {
              ...n.data,
              label
            }
          };
        }

        return n;
      })
    );
  }, [label, setNodes]);

  return (
    <aside
      style={{
        width: "40vw",
        zIndex: 99,
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        padding: "1rem",
        paddingTop: "2rem",
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderLeft: "1px solid #000"
      }}
    >
      <div
        style={{
          cursor: "pointer",
          position: "absolute",
          top: "10px",
          right: "10px"
        }}
        onClick={() => onClose?.()}
      >
        X
      </div>
      <div style={{ fontWeight: 700, fontSize: "36px" }}>Sidebar</div>
      <div>You selected node: {node.id}</div>

      <div>
        Modify the node label
        <input
          value={label}
          type="text"
          onChange={(e) => {
            setLabel(e.currentTarget.value);
          }}
        />
      </div>
    </aside>
  );
}
