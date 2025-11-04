import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Search, Filter, BookOpen, Clock, TrendingUp, Code, Briefcase, Users, Brain } from 'lucide-react';

const Questions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const categories = [
    { id: 'all', name: 'All Categories', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'technical', name: 'Technical', icon: <Code className="h-4 w-4" /> },
    { id: 'behavioral', name: 'Behavioral', icon: <Users className="h-4 w-4" /> },
    { id: 'leadership', name: 'Leadership', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'situational', name: 'Situational', icon: <Brain className="h-4 w-4" /> },
    { id: 'general', name: 'General', icon: <Briefcase className="h-4 w-4" /> }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'easy', name: 'Easy', color: 'text-green-600 bg-green-100' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-600 bg-yellow-100' },
    { id: 'hard', name: 'Hard', color: 'text-red-600 bg-red-100' }
  ];

  // Sample questions data - in real app, this would come from API
  const sampleQuestions = [
    {
      id: 1,
      category: 'technical',
      difficulty: 'medium',
      question: 'Explain the difference between SQL and NoSQL databases.',
      answer: 'SQL databases are relational and use structured query language, while NoSQL databases are non-relational and can handle unstructured data...',
      tags: ['database', 'sql', 'nosql'],
      popularity: 95
    },
    {
      id: 2,
      category: 'behavioral',
      difficulty: 'easy',
      question: 'Tell me about a time when you had to work with a difficult team member.',
      answer: 'Use the STAR method: Situation, Task, Action, Result. Describe a specific situation where you demonstrated conflict resolution...',
      tags: ['teamwork', 'conflict resolution', 'communication'],
      popularity: 88
    },
    {
      id: 3,
      category: 'technical',
      difficulty: 'hard',
      question: 'How would you design a scalable system to handle millions of users?',
      answer: 'System design involves load balancing, database sharding, caching strategies, microservices architecture...',
      tags: ['system design', 'scalability', 'architecture'],
      popularity: 92
    },
    {
      id: 4,
      category: 'leadership',
      difficulty: 'medium',
      question: 'How do you motivate a team during challenging times?',
      answer: 'Effective leadership during challenges involves clear communication, setting realistic goals, recognizing achievements...',
      tags: ['leadership', 'motivation', 'team management'],
      popularity: 85
    },
    {
      id: 5,
      category: 'situational',
      difficulty: 'medium',
      question: 'What would you do if you disagreed with your manager\'s decision?',
      answer: 'Professional disagreement should be handled with respect, data-driven arguments, and proper channels...',
      tags: ['conflict', 'management', 'communication'],
      popularity: 90
    },
    {
      id: 6,
      category: 'general',
      difficulty: 'easy',
      question: 'Why do you want to work for our company?',
      answer: 'Research the company thoroughly, align your values with theirs, mention specific projects or values that resonate...',
      tags: ['company research', 'motivation', 'fit'],
      popularity: 87
    }
  ];

  useEffect(() => {
    let filtered = sampleQuestions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    setFilteredQuestions(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty) => {
    const difficultyObj = difficulties.find(d => d.id === difficulty);
    return difficultyObj ? difficultyObj.color : 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Questions Bank</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of interview questions across different categories and difficulty levels
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search questions or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty.id} value={difficulty.id}>
                  {difficulty.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <BookOpen className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{sampleQuestions.length}</div>
            <div className="text-gray-600">Total Questions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Code className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {sampleQuestions.filter(q => q.category === 'technical').length}
            </div>
            <div className="text-gray-600">Technical</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {sampleQuestions.filter(q => q.category === 'behavioral').length}
            </div>
            <div className="text-gray-600">Behavioral</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <TrendingUp className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {Math.round(sampleQuestions.reduce((sum, q) => sum + q.popularity, 0) / sampleQuestions.length)}%
            </div>
            <div className="text-gray-600">Avg. Popularity</div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search criteria or filters</p>
            </div>
          ) : (
            filteredQuestions.map((question) => (
              <div key={question.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
                      {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {categories.find(c => c.id === question.category)?.name}
                    </span>
                    <div className="flex items-center text-gray-500 text-sm">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {question.popularity}%
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {question.question}
                </h3>
                
                <div className="text-gray-600 mb-4 line-clamp-3">
                  {question.answer}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {question.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Practice This
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Practice Tips Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Interview Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Practice Regularly</h3>
              <p className="text-gray-600">
                Set aside time each day to practice different types of questions to build confidence and fluency.
              </p>
            </div>
            <div className="text-center">
              <Brain className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Use the STAR Method</h3>
              <p className="text-gray-600">
                Structure your behavioral answers using Situation, Task, Action, and Result for clear, impactful responses.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Track Your Progress</h3>
              <p className="text-gray-600">
                Monitor your improvement over time and focus on areas that need the most attention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;