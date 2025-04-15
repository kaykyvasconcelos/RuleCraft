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
  const [valorDolar, setValorDolar] = useState<number>(0);
  const [descricao, setDescricao] = useState('');
  const [celular, setCelular] = useState('');

  useEffect(() => {
    if (selectedRule) {
      setNome(selectedRule.nome);
      setTipo(selectedRule.tipo);
      setValor(selectedRule.valor);
      setValorDolar(selectedRule.valorDolar);
      setDescricao(selectedRule.descricao);
      setCelular(selectedRule.celular || '');
    } else {
      setNome('');
      setTipo('percentual');
      setValor(0);
      setValorDolar(0);
      setDescricao('');
      setCelular('');
    }
  }, [selectedRule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const celularValido = /^(\+55)?\d{10,11}$/.test(celular);

    if (!celularValido) {
      alert("Por favor, insira um número de celular válido (ex: 11999999999 ou +5511999999999).");
  return;
}

    const newRule: Rule = {
      id: selectedRule ? selectedRule.id : uuidv4(),
      nome,
      tipo,
      valor,
      valorDolar,
      descricao,
      celular,
    };

    if (selectedRule) {
      updateRule(newRule);
    } else {
      addRule(newRule);
      setNome('');
      setTipo('percentual');
      setValor(0);
      setValorDolar(0);
      setDescricao('');
      setCelular('');
    }

    onFinish();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow-md space-y-4">
      <h2 className="text-xl font-bold">{selectedRule ? 'Editar Regra' : 'Nova Regra'}</h2>

      <div>
        <label className="block font-medium">Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Tipo</label>
        <select value={tipo} onChange={(e) => setTipo(e.target.value as TipoValor)} className="w-full p-2 border rounded">
          <option value="percentual">Percentual (%)</option>
          <option value="real">Valor Real (R$)</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Valor</label>
        <input type="number" value={valor} onChange={(e) => setValor(Number(e.target.value))} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Valor em Dólar (US$)</label>
        <input type="number" value={valorDolar} onChange={(e) => setValorDolar(Number(e.target.value))} required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Descrição</label>
        <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-medium">Celular (para autenticação)</label>
        <input type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} className="w-full p-2 border rounded" />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        {selectedRule ? 'Salvar Alterações' : 'Criar Regra'}
      </button>
    </form>
  );
};
