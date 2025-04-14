// src/App.tsx

import React, { useState } from 'react';
import { Rule } from './types';
import { RulesProvider } from './contexts/rules-context';
import { RuleForm } from './components/RuleForm';
import { RuleList } from './components/RuleList';

const App: React.FC = () => {
  const [selectedRule, setSelectedRule] = useState<Rule | undefined>(undefined);

  const handleFinish = () => {
    setSelectedRule(undefined);
  };

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
