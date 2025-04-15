import React, { useState } from "react";
import { RulesProvider } from "./contexts/rules-context";
import { RuleForm } from "./components/RuleForm";
import { RuleList } from "./components/RuleList";
import { Login } from "./components/Login";
import { Rule } from "./types"; // certifique-se de importar isso no topo

const App = () => {
  const [selectedRule, setSelectedRule] = useState<Rule | undefined>(undefined);  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFinish = () => setSelectedRule(undefined);

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <RulesProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <RuleForm selectedRule={selectedRule} onFinish={handleFinish} />
          <RuleList onSelect={(rule) => setSelectedRule(rule)} />
        </div>
      </div>
    </RulesProvider>
  );
};

export default App;
