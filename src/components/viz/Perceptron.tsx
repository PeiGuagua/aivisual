"use client";

import { useState, useMemo } from "react";

interface NodePos {
  x: number;
  y: number;
}

export default function Perceptron() {
  const [inputs, setInputs] = useState([0.5, 0.3, 0.8]);
  const [weights, setWeights] = useState([0.4, -0.6, 0.9]);
  const [bias, setBias] = useState(-0.2);

  const sum = useMemo(
    () =>
      inputs.reduce((acc, inp, i) => acc + inp * weights[i], 0) + bias,
    [inputs, weights, bias]
  );

  const output = sum > 0 ? 1 : 0;
  const activated = output === 1;

  const inputNodes: NodePos[] = [
    { x: 80, y: 80 },
    { x: 80, y: 200 },
    { x: 80, y: 320 },
  ];
  const sumNode: NodePos = { x: 320, y: 200 };
  const activationNode: NodePos = { x: 480, y: 200 };
  const outputNode: NodePos = { x: 620, y: 200 };

  const updateInput = (i: number, v: number) => {
    const next = [...inputs];
    next[i] = v;
    setInputs(next);
  };

  const updateWeight = (i: number, v: number) => {
    const next = [...weights];
    next[i] = v;
    setWeights(next);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* SVG Visualization */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
        <svg viewBox="0 0 700 400" className="mx-auto h-auto w-full max-w-2xl">
          {/* Connections: input → sum */}
          {inputNodes.map((inp, i) => {
            const thickness = Math.abs(weights[i]) * 4 + 1;
            const color = weights[i] >= 0 ? "#60a5fa" : "#f87171";
            return (
              <g key={`conn-${i}`}>
                <line
                  x1={inp.x + 24}
                  y1={inp.y}
                  x2={sumNode.x - 24}
                  y2={sumNode.y}
                  stroke={color}
                  strokeWidth={thickness}
                  strokeOpacity={0.6}
                />
                <text
                  x={(inp.x + 24 + sumNode.x - 24) / 2}
                  y={(inp.y + sumNode.y) / 2 - 8}
                  fill={color}
                  fontSize="12"
                  textAnchor="middle"
                >
                  w{i + 1}={weights[i].toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Connection: sum → activation */}
          <line
            x1={sumNode.x + 24}
            y1={sumNode.y}
            x2={activationNode.x - 24}
            y2={activationNode.y}
            stroke="#a78bfa"
            strokeWidth={2}
            strokeOpacity={0.6}
          />

          {/* Connection: activation → output */}
          <line
            x1={activationNode.x + 24}
            y1={activationNode.y}
            x2={outputNode.x - 24}
            y2={outputNode.y}
            stroke={activated ? "#a78bfa" : "#555"}
            strokeWidth={2}
            strokeOpacity={0.6}
          />

          {/* Input nodes */}
          {inputNodes.map((pos, i) => (
            <g key={`input-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={24}
                fill={`rgba(96, 165, 250, ${inputs[i] * 0.5 + 0.1})`}
                stroke="#60a5fa"
                strokeWidth={1.5}
              />
              <text
                x={pos.x}
                y={pos.y - 6}
                fill="white"
                fontSize="11"
                textAnchor="middle"
              >
                x{i + 1}
              </text>
              <text
                x={pos.x}
                y={pos.y + 10}
                fill="white"
                fontSize="11"
                textAnchor="middle"
                fontWeight="bold"
              >
                {inputs[i].toFixed(2)}
              </text>
            </g>
          ))}

          {/* Sum node */}
          <circle
            cx={sumNode.x}
            cy={sumNode.y}
            r={24}
            fill="rgba(167, 139, 250, 0.2)"
            stroke="#a78bfa"
            strokeWidth={1.5}
          />
          <text
            x={sumNode.x}
            y={sumNode.y - 6}
            fill="white"
            fontSize="11"
            textAnchor="middle"
          >
            Σ
          </text>
          <text
            x={sumNode.x}
            y={sumNode.y + 10}
            fill="white"
            fontSize="11"
            textAnchor="middle"
            fontWeight="bold"
          >
            {sum.toFixed(2)}
          </text>

          {/* Bias label */}
          <text
            x={sumNode.x}
            y={sumNode.y + 50}
            fill="#9ca3af"
            fontSize="11"
            textAnchor="middle"
          >
            bias={bias.toFixed(2)}
          </text>

          {/* Activation node */}
          <circle
            cx={activationNode.x}
            cy={activationNode.y}
            r={24}
            fill={activated ? "rgba(167, 139, 250, 0.5)" : "rgba(75, 75, 75, 0.3)"}
            stroke={activated ? "#a78bfa" : "#555"}
            strokeWidth={1.5}
          />
          <text
            x={activationNode.x}
            y={activationNode.y - 6}
            fill="white"
            fontSize="10"
            textAnchor="middle"
          >
            step
          </text>
          <text
            x={activationNode.x}
            y={activationNode.y + 10}
            fill="white"
            fontSize="10"
            textAnchor="middle"
          >
            {">"}0 → 1
          </text>

          {/* Output node */}
          <circle
            cx={outputNode.x}
            cy={outputNode.y}
            r={24}
            fill={activated
              ? "url(#activeGradient)"
              : "rgba(75, 75, 75, 0.3)"}
            stroke={activated ? "#a78bfa" : "#555"}
            strokeWidth={2}
          />
          <text
            x={outputNode.x}
            y={outputNode.y + 5}
            fill="white"
            fontSize="16"
            textAnchor="middle"
            fontWeight="bold"
          >
            {output}
          </text>

          {/* Gradient definition */}
          <defs>
            <radialGradient id="activeGradient">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Controls */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-sm font-semibold text-white">Inputs</h3>
          {inputs.map((v, i) => (
            <div key={`input-ctrl-${i}`} className="mb-3">
              <div className="mb-1 flex justify-between text-xs text-gray-400">
                <span>x{i + 1}</span>
                <span>{v.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={v}
                onChange={(e) => updateInput(i, parseFloat(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>
          ))}
        </div>

        {/* Weights & Bias */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 text-sm font-semibold text-white">
            Weights &amp; Bias
          </h3>
          {weights.map((v, i) => (
            <div key={`weight-ctrl-${i}`} className="mb-3">
              <div className="mb-1 flex justify-between text-xs text-gray-400">
                <span>w{i + 1}</span>
                <span className={v >= 0 ? "text-blue-400" : "text-red-400"}>
                  {v.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min={-1}
                max={1}
                step={0.01}
                value={v}
                onChange={(e) => updateWeight(i, parseFloat(e.target.value))}
                className="w-full accent-purple-500"
              />
            </div>
          ))}
          <div className="mt-2">
            <div className="mb-1 flex justify-between text-xs text-gray-400">
              <span>bias</span>
              <span>{bias.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={bias}
              onChange={(e) => setBias(parseFloat(e.target.value))}
              className="w-full accent-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h3 className="mb-3 text-sm font-semibold text-white">Computation</h3>
        <div className="font-mono text-sm text-gray-300">
          <p>
            sum = {inputs.map((v, i) => `${v.toFixed(2)} × ${weights[i].toFixed(2)}`).join(" + ")} + ({bias.toFixed(2)})
          </p>
          <p className="mt-1">
            sum = <span className="font-bold text-purple-400">{sum.toFixed(4)}</span>
          </p>
          <p className="mt-1">
            output = step({sum.toFixed(4)}) ={" "}
            <span className={`font-bold ${activated ? "text-green-400" : "text-red-400"}`}>
              {output}
            </span>
            {" "}
            <span className="text-gray-500">
              ({activated ? "activated" : "not activated"})
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
