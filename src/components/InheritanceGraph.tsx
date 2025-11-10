import { useEffect, useRef, useState } from 'react';
import { Badge } from './ui/badge';

interface Node {
  id: string;
  label: string;
  level: number;
  x: number;
  y: number;
  connections: string[];
  type: 'root' | 'intermediate' | 'leaf';
}

export function InheritanceGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mock inheritance network data - hierarchical structure
  const nodes: Node[] = [
    // Level 0 - Root
    { 
      id: 'A', 
      label: '0x742d...0bEb', 
      level: 0, 
      x: 400, 
      y: 50,
      connections: ['B', 'C'],
      type: 'root'
    },
    // Level 1
    { 
      id: 'B', 
      label: '0x8a5c...2d4f', 
      level: 1, 
      x: 250, 
      y: 150,
      connections: ['D', 'E'],
      type: 'intermediate'
    },
    { 
      id: 'C', 
      label: '0x1a2b...9a0b', 
      level: 1, 
      x: 550, 
      y: 150,
      connections: ['F'],
      type: 'intermediate'
    },
    // Level 2
    { 
      id: 'D', 
      label: '0x9f2a...8c1b', 
      level: 2, 
      x: 150, 
      y: 250,
      connections: ['G'],
      type: 'intermediate'
    },
    { 
      id: 'E', 
      label: '0x4d5e...7a8b', 
      level: 2, 
      x: 350, 
      y: 250,
      connections: [],
      type: 'leaf'
    },
    { 
      id: 'F', 
      label: '0x6f7e...4b3a', 
      level: 2, 
      x: 550, 
      y: 250,
      connections: ['H', 'I'],
      type: 'intermediate'
    },
    // Level 3
    { 
      id: 'G', 
      label: '0x2918...5c4b', 
      level: 3, 
      x: 150, 
      y: 350,
      connections: [],
      type: 'leaf'
    },
    { 
      id: 'H', 
      label: '0xaaaa...bbbb', 
      level: 3, 
      x: 480, 
      y: 350,
      connections: [],
      type: 'leaf'
    },
    { 
      id: 'I', 
      label: '0xcccc...dddd', 
      level: 3, 
      x: 620, 
      y: 350,
      connections: [],
      type: 'leaf'
    },
  ];

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections first (so they appear behind nodes)
    nodes.forEach(node => {
      node.connections.forEach(targetId => {
        const target = nodes.find(n => n.id === targetId);
        if (target) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);
          ctx.strokeStyle = '#d4d4d8';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHovered = hoveredNode?.id === node.id;
      
      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHovered ? 32 : 28, 0, 2 * Math.PI);
      
      // Color based on type
      if (node.type === 'root') {
        ctx.fillStyle = isHovered ? '#3b82f6' : '#60a5fa';
      } else if (node.type === 'leaf') {
        ctx.fillStyle = isHovered ? '#10b981' : '#34d399';
      } else {
        ctx.fillStyle = isHovered ? '#8b5cf6' : '#a78bfa';
      }
      ctx.fill();
      
      // Draw border
      ctx.strokeStyle = isHovered ? '#1e293b' : '#ffffff';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw node ID
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.id, node.x, node.y);
    });
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setMousePos({ x: event.clientX, y: event.clientY });

    // Check if mouse is over any node
    let found = false;
    for (const node of nodes) {
      const distance = Math.sqrt(Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2));
      if (distance < 28) {
        setHoveredNode(node);
        found = true;
        break;
      }
    }
    if (!found) {
      setHoveredNode(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
  };

  useEffect(() => {
    drawGraph();
  }, [hoveredNode]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={800}
        height={420}
        className="mx-auto cursor-pointer rounded-lg bg-neutral-50"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
      
      {/* Hover tooltip */}
      {hoveredNode && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-neutral-200 bg-white p-3 shadow-lg"
          style={{
            left: mousePos.x + 15,
            top: mousePos.y + 15,
          }}
        >
          <div className="mb-2 flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${
              hoveredNode.type === 'root' 
                ? 'bg-blue-500' 
                : hoveredNode.type === 'leaf' 
                  ? 'bg-emerald-500' 
                  : 'bg-purple-500'
            }`} />
            <span className="text-sm text-neutral-900">{hoveredNode.label}</span>
          </div>
          <div className="space-y-1 text-xs text-neutral-600">
            <div>Level: {hoveredNode.level}</div>
            <div>Type: {hoveredNode.type}</div>
            <div>Connections: {hoveredNode.connections.length}</div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-blue-500" />
          <span className="text-sm text-neutral-600">Root (Originator)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-purple-500" />
          <span className="text-sm text-neutral-600">Intermediate (Re-inherited)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-emerald-500" />
          <span className="text-sm text-neutral-600">Leaf (Final recipient)</span>
        </div>
      </div>

      {/* Network stats */}
      <div className="mt-6 grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center">
          <p className="text-neutral-500">Total Nodes</p>
          <p className="mt-1 text-neutral-900">{nodes.length}</p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center">
          <p className="text-neutral-500">Max Depth</p>
          <p className="mt-1 text-neutral-900">
            {Math.max(...nodes.map(n => n.level)) + 1}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center">
          <p className="text-neutral-500">Chains</p>
          <p className="mt-1 text-neutral-900">
            {nodes.filter(n => n.type === 'root').length}
          </p>
        </div>
        <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-center">
          <p className="text-neutral-500">Total Links</p>
          <p className="mt-1 text-neutral-900">
            {nodes.reduce((sum, n) => sum + n.connections.length, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
