import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Rule } from "../types";

const API_URL = "http://localhost:3001/rules";

interface RulesContextProps {
  rules: Rule[];
  addRule: (title: string, description: string) => void;
  updateRule: (rule: Rule) => void;
  deleteRule: (id: string) => void;
}

const RulesContext = createContext<RulesContextProps | undefined>(undefined);

export const RulesProvider = ({ children }: { children: ReactNode }) => {
  const [rules, setRules] = useState<Rule[]>([]);

  // Carrega as regras ao iniciar
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setRules(data))
      .catch(err => console.error("Erro ao carregar regras:", err));
  }, []);

  const addRule = (title: string, description: string) => {
    const newRule = { title, description };

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRule),
    })
      .then(res => res.json())
      .then(data => setRules(prev => [...prev, data]))
      .catch(err => console.error("Erro ao adicionar regra:", err));
  };

  const updateRule = (updatedRule: Rule) => {
    fetch(`${API_URL}/${updatedRule.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedRule),
    })
      .then(res => res.json())
      .then(data =>
        setRules(prev =>
          prev.map(rule => (rule.id === data.id ? data : rule))
        )
      )
      .catch(err => console.error("Erro ao atualizar regra:", err));
  };

  const deleteRule = (id: string) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => setRules(prev => prev.filter(rule => rule.id !== id)))
      .catch(err => console.error("Erro ao deletar regra:", err));
  };

  return (
    <RulesContext.Provider value={{ rules, addRule, updateRule, deleteRule }}>
      {children}
    </RulesContext.Provider>
  );
};

export const useRules = () => {
  const context = useContext(RulesContext);
  if (!context) throw new Error("useRules deve ser usado dentro de RulesProvider");
  return context;
};
