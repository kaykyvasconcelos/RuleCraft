// src/components/RuleList.tsx

import React from 'react';
import { useRules } from '../contexts/rules-context';
import { Rule } from '../types';

interface RuleListProps {
  onSelect: (rule: Rule) => void;
}

export const RuleList: React.FC<RuleListProps> = ({ onSelect }) => {
  const { rules, deleteRule } = useRules();

  if (rules.length === 0) {
    return <p className="text-gray-500">Nenhuma regra cadastrada ainda.</p>;
  }

  return (
    <div className="space-y-4">
      {rules.map((rule) => (
        <div key={rule.id} className="border p-4 rounded shadow-sm bg-gray-50 flex justify-between items-center">
          <div>
            <h3 className="font-bold">{rule.nome}</h3>
            <p className="text-sm text-gray-700">
              Tipo: {rule.tipo === 'percentual' ? 'Percentual (%)' : 'Valor Real (R$)'} | Valor: {rule.valor}
            </p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onSelect(rule)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={() => deleteRule(rule.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
