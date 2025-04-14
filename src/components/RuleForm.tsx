// src/components/RuleForm.tsx

import React, { useState, useEffect } from 'react';
import { Rule, TipoValor } from '../types';
import { useRules } from '../contexts/rules-context';
import { v4 as uuidv4 } from 'uuid';

interface RuleFormProps {
  selectedRule?: Rule;
  onFinish: () => void;
}

export const RuleForm: React.FC<RuleFormProps> = ({ selectedRule, onFinish }) => {
  const { addRule, updateRule } = useRules();

  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState<TipoValor>('percentual');
  const [valor, setValor] = useState<number>(0);

  useEffect(() => {
    if (selectedRule) {
      setNome(selectedRule.nome);
      setTipo(selectedRule.tipo);
      setValor(selectedRule.valor);
    } else {
      setNome('');
      setTipo('percentual');
      setValor(0);
    }
  }, [selectedRule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRule: Rule = {
      id: selectedRule ? selectedRule.id : uuidv4(),
      nome,
      tipo,
      valor,
    };

    if (selectedRule) {
      updateRule(newRule);
    } else {
      addRule(newRule);
    }

    onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-md space-y-4">
      <h2 className="text-xl font-bold">
        {selectedRule ? 'Editar Regra' : 'Nova Regra'}
      </h2>

      <div>
        <label className="block font-medium">Nome da Regra</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoValor)}
          className="w-full p-2 border rounded"
        >
          <option value="percentual">Percentual (%)</option>
          <option value="real">Valor Real (R$)</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Valor</label>
        <input
          type="number"
          value={valor}
          onChange={(e) => setValor(Number(e.target.value))}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {selectedRule ? 'Salvar Alterações' : 'Criar Regra'}
      </button>
    </form>
  );
};
