import React, { useState } from 'react';
import { ChevronLeft, Clock, CheckCircle, Lock, Star } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tests = [
    {
      id: 1,
      title: 'Day 17: Lean Production Innovation – in Manufacturing Systems',
      subtitle: 'Part 2 - MEDIUM Level',
      difficulty: 'medium',
      duration: 20,
      questions: 13,
      isFree: true
    },
    {
      id: 2,
      title: 'Day 18: The Pirahã People of Brazil',
      subtitle: 'Part 3 - HARD Level',
      difficulty: 'hard',
      duration: 20,
      questions: 14,
      isFree: true
    },
    {
      id: 3,
      title: 'Day 19: The Development of Plastics',
      subtitle: 'Part 1 - EASY Level',
      difficulty: 'easy',
      duration: 20,
      questions: 13,
      isFree: true
    },
    {
      id: 4,
      title: 'Day 20: Jellyfish – The Dominant Species',
      subtitle: 'Part 2 - MEDIUM Level',
      difficulty: 'medium',
      duration: 20,
      questions: 13,
      isFree: true
    }
  ];

  const getDifficultyColor = (level) => {
    switch(level.toLowerCase()) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyBars = (level) => {
    switch(level.toLowerCase()) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <ChevronLeft size={20} />
            <span className="font-medium">Back</span>
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Reading</h1>
          <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <CheckCircle size={20} />
            <span className="font-medium">Completed Tests</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-white shadow-md text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All Tests
          </button>
          
          <button
            onClick={() => setActiveTab('free')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'free'
                ? 'bg-white shadow-md text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>🎁</span>
            <span>Free</span>
          </button>
          
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'premium'
                ? 'bg-white shadow-md text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Lock size={16} />
            <span>Premium</span>
          </button>
          
          <button
            onClick={() => setActiveTab('gold')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'gold'
                ? 'bg-white shadow-md text-gray-900'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Star size={16} />
            <span>Gold</span>
          </button>
        </div>

        {/* Test Cards */}
        <div className="space-y-4">
          {tests.map(test => (
            <div 
              key={test.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{test.title}</h3>
                    {test.isFree && (
                      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200">
                        🎁 Free
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{test.subtitle}</p>
                </div>
                <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
                  Start test
                </button>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[1, 2, 3].map(bar => (
                      <div
                        key={bar}
                        className={`w-1 h-4 rounded ${
                          bar <= getDifficultyBars(test.difficulty)
                            ? getDifficultyColor(test.difficulty).replace('text-', 'bg-')
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`font-medium ${getDifficultyColor(test.difficulty)}`}>
                    {test.difficulty.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Clock size={16} className="text-gray-400" />
                  <span>{test.duration} minutes</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-gray-400" />
                  <span>{test.questions} questions</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;