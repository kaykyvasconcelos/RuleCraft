// src/components/RuleList.tsx

import React from "react";
import { useRules } from "../contexts/rules-context";
import { Rule } from "../types";

interface RuleListProps {
  onSelect: (rule: Rule) => void;
}

export const RuleList: React.FC<RuleListProps> = ({ onSelect }) => {
  const { rules } = useRules();

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Regras Criadas</h2>
      {rules.length === 0 && <p className="text-gray-500">Nenhuma regra cadastrada.</p>}
      <ul className="space-y-4">
        {rules.map((rule: Rule) => (
          <li
            key={rule.id}
            className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(rule)}
          >
            <div className="font-semibold">{rule.nome}</div>
            <div className="text-sm text-gray-600">{rule.descricao}</div>
            <div className="text-xs text-gray-400">
              Tipo: {rule.tipo} | R$: {rule.valor} | US$: {rule.valorDolar}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
