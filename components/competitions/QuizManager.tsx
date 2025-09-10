'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Plus,
  Trash2,
  Edit,
  Save,
  Download,
  Upload,
  Wand2,
  FileText,
  ExternalLink,
  Copy,
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  type: 'single_answer' | 'multiple_answer' | 'short_descriptive' | 'true_false' | 'broad_question';
  options?: string[];
  correctAnswer: number | number[] | string;
  points: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  wordLimit?: number;
  explanation?: string;
}

interface QuizManagerProps {
  competitionId: string;
  onQuestionsUpdate?: (questions: Question[]) => void;
}

const defaultCategories = [
  'Programming',
  'Web Development',
  'Data Science',
  'Mobile Development',
  'DevOps',
  'UI/UX Design',
  'General Knowledge',
  'Problem Solving'
];

const aiTemplates = [
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'React, JavaScript, CSS, HTML questions',
    questionCount: 20
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Node.js, Python, databases, APIs',
    questionCount: 20
  },
  {
    id: 'fullstack',
    name: 'Full Stack Development',
    description: 'Complete web development stack',
    questionCount: 30
  },
  {
    id: 'datastructures',
    name: 'Data Structures & Algorithms',
    description: 'Programming fundamentals and problem solving',
    questionCount: 25
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'React Native, Flutter, iOS, Android',
    questionCount: 20
  }
];

export default function QuizManager({ competitionId, onQuestionsUpdate }: QuizManagerProps) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      question: 'What is the primary purpose of React hooks?',
      type: 'single_answer',
      options: ['State management in functional components', 'Component styling', 'API calls only', 'Class component replacement'],
      correctAnswer: 0,
      points: 10,
      difficulty: 'medium',
      category: 'Programming'
    },
    {
      id: '2',
      question: 'Which HTTP method is used to update existing data?',
      type: 'single_answer',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      correctAnswer: 2,
      points: 10,
      difficulty: 'easy',
      category: 'Web Development'
    }
  ]);
  
  const [newQuestion, setNewQuestion] = useState<Omit<Question, 'id'>>({
    question: '',
    type: 'single_answer',
    options: ['', '', '', ''],
    correctAnswer: 0,
    points: 10,
    difficulty: 'medium',
    category: 'Programming',
    wordLimit: 100
  });
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('manual');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiQuestionSet, setAiQuestionSet] = useState({
    category: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    totalQuestions: 10,
    questionTypes: {
      single_answer: 0,
      multiple_answer: 0,
      short_descriptive: 0,
      true_false: 0,
      broad_question: 0
    },
    wordLimits: {
      short_descriptive: 50,
      broad_question: 200
    },
    description: ''
  });
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState<Question[]>([]);
  const [showAiPreview, setShowAiPreview] = useState(false);
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [quizSettings, setQuizSettings] = useState({
    passingScore: 85,
    timeLimit: 30,
    randomizeQuestions: true,
    showResults: false
  });

  const addQuestion = () => {
    if (newQuestion.question.trim() && newQuestion.options?.every(opt => opt.trim())) {
      const question: Question = {
        ...newQuestion,
        id: Date.now().toString()
      };
      const updatedQuestions = [...questions, question];
      setQuestions(updatedQuestions);
      onQuestionsUpdate?.(updatedQuestions);
      
      // Reset form
      setNewQuestion({
        question: '',
        type: 'single_answer',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 10,
        difficulty: 'medium',
        category: 'Programming',
        wordLimit: 100
      });
    }
  };

  const removeQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    onQuestionsUpdate?.(updatedQuestions);
  };

  const updateQuestion = (questionId: string, updatedQuestion: Partial<Question>) => {
    const updatedQuestions = questions.map(q => 
      q.id === questionId ? { ...q, ...updatedQuestion } : q
    );
    setQuestions(updatedQuestions);
    onQuestionsUpdate?.(updatedQuestions);
    setEditingId(null);
  };

  const generateAIQuestions = async (templateId: string) => {
    setIsGenerating(true);
    const template = aiTemplates.find(t => t.id === templateId);
    
    // Simulate AI generation
    setTimeout(() => {
      const aiQuestions: Question[] = [
        {
          id: Date.now().toString(),
          question: `What is the main advantage of using ${template?.name}?`,
          options: ['Performance', 'Scalability', 'Maintainability', 'All of the above'],
          correctAnswer: 3,
          points: 10,
          difficulty: 'medium',
          category: template?.name || 'General',
          type: 'single_answer'
        },
        {
          id: (Date.now() + 1).toString(),
          question: `Which tool is commonly used in ${template?.name}?`,
          options: ['Tool A', 'Tool B', 'Tool C', 'Tool D'],
          correctAnswer: 1,
          points: 15,
          difficulty: 'hard',
          type: 'single_answer',
          category: template?.name || 'General'
        }
      ];
      
      const updatedQuestions = [...questions, ...aiQuestions];
      setQuestions(updatedQuestions);
      onQuestionsUpdate?.(updatedQuestions);
      setIsGenerating(false);
    }, 2000);
  };

  const exportToGoogleForm = () => {
    // Simulate Google Form creation
    const formUrl = `https://forms.google.com/forms/d/example-${competitionId}/edit`;
    setGoogleFormUrl(formUrl);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);
  const difficultyDistribution = {
    easy: questions.filter(q => q.difficulty === 'easy').length,
    medium: questions.filter(q => q.difficulty === 'medium').length,
    hard: questions.filter(q => q.difficulty === 'hard').length
  };

  return (
    <div className="space-y-6">
      {/* Quiz Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Questions</p>
                <p className="text-2xl font-bold text-gray-900">{questions.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">{totalPoints}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Passing Score</p>
                <p className="text-2xl font-bold text-gray-900">{quizSettings.passingScore}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Time Limit</p>
                <p className="text-2xl font-bold text-gray-900">{quizSettings.timeLimit}m</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="ai">AI Templates</TabsTrigger>
          <TabsTrigger value="google">Google Forms</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Manual Question Entry */}
        <TabsContent value="manual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Question */}
            <Card>
              <CardHeader>
                <CardTitle>Add New Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Question</label>
                  <Textarea
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, question: e.target.value }))}
                    placeholder="Enter your question..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Question Type</label>
                  <Select value={newQuestion.type} onValueChange={(value: Question['type']) => setNewQuestion(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_answer">Single Answer</SelectItem>
                      <SelectItem value="multiple_answer">Multiple Answer</SelectItem>
                      <SelectItem value="short_descriptive">Short Descriptive</SelectItem>
                      <SelectItem value="true_false">True/False</SelectItem>
                      <SelectItem value="broad_question">Broad Question</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {(newQuestion.type === 'single_answer' || newQuestion.type === 'multiple_answer') && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Options</label>
                    {newQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium w-6">{String.fromCharCode(65 + index)}.</span>
                        <Input
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(newQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setNewQuestion(prev => ({ ...prev, options: newOptions }));
                          }}
                          placeholder={`Option ${String.fromCharCode(65 + index)}`}
                        />
                        {newQuestion.type === 'single_answer' ? (
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={newQuestion.correctAnswer === index}
                            onChange={() => setNewQuestion(prev => ({ ...prev, correctAnswer: index }))}
                            className="text-orange-500"
                          />
                        ) : (
                          <input
                            type="checkbox"
                            checked={Array.isArray(newQuestion.correctAnswer) && newQuestion.correctAnswer.includes(index)}
                            onChange={(e) => {
                              const currentAnswers = Array.isArray(newQuestion.correctAnswer) ? newQuestion.correctAnswer : [];
                              if (e.target.checked) {
                                setNewQuestion(prev => ({ ...prev, correctAnswer: [...currentAnswers, index] }));
                              } else {
                                setNewQuestion(prev => ({ ...prev, correctAnswer: currentAnswers.filter(a => a !== index) }));
                              }
                            }}
                            className="text-orange-500"
                          />
                        )}
                      </div>
                    )) || []}
                  </div>
                )}
                
                {newQuestion.type === 'true_false' && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Correct Answer</label>
                    <Select value={newQuestion.correctAnswer as string} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, correctAnswer: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {(newQuestion.type === 'short_descriptive' || newQuestion.type === 'broad_question') && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Word Limit</label>
                    <Input
                      type="number"
                      value={newQuestion.wordLimit || 100}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, wordLimit: parseInt(e.target.value) }))}
                      placeholder="Word limit for answer"
                      min="10"
                      max="1000"
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Points</label>
                    <Input
                      type="number"
                      value={newQuestion.points}
                      onChange={(e) => setNewQuestion(prev => ({ ...prev, points: parseInt(e.target.value) || 10 }))}
                      min="1"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Difficulty</label>
                    <Select value={newQuestion.difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setNewQuestion(prev => ({ ...prev, difficulty: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Select value={newQuestion.category} onValueChange={(value) => setNewQuestion(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {defaultCategories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button onClick={addQuestion} className="w-full bg-orange-500 hover:bg-orange-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardContent>
            </Card>

            {/* Question List */}
            <Card>
              <CardHeader>
                <CardTitle>Questions ({questions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                {questions.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">Q{index + 1}: {question.question}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getDifficultyColor(question.difficulty)}>
                          {question.difficulty}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingId(question.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      {question!.options?.map((option, optIndex) => (
                        <div key={optIndex} className={`p-2 rounded text-xs ${optIndex === question.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-gray-50'}`}>
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {optIndex === question.correctAnswer && ' ✓'}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                      <span>Category: {question.category}</span>
                      <span>Points: {question.points}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Question Set Generation */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Question Set Generation</CardTitle>
              <CardDescription>
                Generate a complete set of questions using AI based on your specifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category/Subject</label>
                    <Input
                      value={aiQuestionSet.category}
                      onChange={(e) => setAiQuestionSet({...aiQuestionSet, category: e.target.value})}
                      placeholder="e.g., JavaScript, Marketing, Leadership"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Topic Description</label>
                    <Textarea
                      value={aiQuestionSet.description}
                      onChange={(e) => setAiQuestionSet({...aiQuestionSet, description: e.target.value})}
                      placeholder="Describe the specific topics or skills you want to test..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Total Questions</label>
                      <Input
                        type="number"
                        value={aiQuestionSet.totalQuestions}
                        onChange={(e) => {
                          const total = parseInt(e.target.value) || 0;
                          setAiQuestionSet({...aiQuestionSet, totalQuestions: total});
                        }}
                        min="1"
                        max="50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                      <Select 
                        value={aiQuestionSet.difficulty} 
                        onValueChange={(value: 'easy' | 'medium' | 'hard') => setAiQuestionSet({...aiQuestionSet, difficulty: value})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Question Type Distribution</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm">Single Answer (MCQ)</label>
                      <Input
                        type="number"
                        value={aiQuestionSet.questionTypes.single_answer}
                        onChange={(e) => setAiQuestionSet({
                          ...aiQuestionSet,
                          questionTypes: {
                            ...aiQuestionSet.questionTypes,
                            single_answer: parseInt(e.target.value) || 0
                          }
                        })}
                        className="w-20"
                        min="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">Multiple Answer</label>
                      <Input
                        type="number"
                        value={aiQuestionSet.questionTypes.multiple_answer}
                        onChange={(e) => setAiQuestionSet({
                          ...aiQuestionSet,
                          questionTypes: {
                            ...aiQuestionSet.questionTypes,
                            multiple_answer: parseInt(e.target.value) || 0
                          }
                        })}
                        className="w-20"
                        min="0"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="text-sm">True/False</label>
                      <Input
                        type="number"
                        value={aiQuestionSet.questionTypes.true_false}
                        onChange={(e) => setAiQuestionSet({
                          ...aiQuestionSet,
                          questionTypes: {
                            ...aiQuestionSet.questionTypes,
                            true_false: parseInt(e.target.value) || 0
                          }
                        })}
                        className="w-20"
                        min="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Short Descriptive</label>
                        <Input
                          type="number"
                          value={aiQuestionSet.questionTypes.short_descriptive}
                          onChange={(e) => setAiQuestionSet({
                            ...aiQuestionSet,
                            questionTypes: {
                              ...aiQuestionSet.questionTypes,
                              short_descriptive: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-20"
                          min="0"
                        />
                      </div>
                      {aiQuestionSet.questionTypes.short_descriptive > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Word limit:</span>
                          <Input
                            type="number"
                            value={aiQuestionSet.wordLimits.short_descriptive}
                            onChange={(e) => setAiQuestionSet({
                              ...aiQuestionSet,
                              wordLimits: {
                                ...aiQuestionSet.wordLimits,
                                short_descriptive: parseInt(e.target.value) || 50
                              }
                            })}
                            className="w-16 h-6"
                            min="10"
                            max="200"
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm">Broad Questions</label>
                        <Input
                          type="number"
                          value={aiQuestionSet.questionTypes.broad_question}
                          onChange={(e) => setAiQuestionSet({
                            ...aiQuestionSet,
                            questionTypes: {
                              ...aiQuestionSet.questionTypes,
                              broad_question: parseInt(e.target.value) || 0
                            }
                          })}
                          className="w-20"
                          min="0"
                        />
                      </div>
                      {aiQuestionSet.questionTypes.broad_question > 0 && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">Word limit:</span>
                          <Input
                            type="number"
                            value={aiQuestionSet.wordLimits.broad_question}
                            onChange={(e) => setAiQuestionSet({
                              ...aiQuestionSet,
                              wordLimits: {
                                ...aiQuestionSet.wordLimits,
                                broad_question: parseInt(e.target.value) || 200
                              }
                            })}
                            className="w-16 h-6"
                            min="50"
                            max="1000"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-3">
                      Total: {Object.values(aiQuestionSet.questionTypes).reduce((a, b) => a + b, 0)} / {aiQuestionSet.totalQuestions} questions
                    </div>
                    <Button 
                      onClick={() => {
                        setIsGenerating(true);
                        
                        // Simulate AI question set generation
                        setTimeout(() => {
                          const generatedQuestions: Question[] = [];
                          let questionId = Date.now();
                          
                          // Generate questions for each type
                          Object.entries(aiQuestionSet.questionTypes).forEach(([type, count]) => {
                            if (count > 0) {
                              for (let i = 0; i < count; i++) {
                                const questionType = type as Question['type'];
                                const question: Question = {
                                  id: (questionId++).toString(),
                                  type: questionType,
                                  question: `${aiQuestionSet.category} - ${questionType.replace('_', ' ')} question ${i + 1}: What is the best approach to solve this ${aiQuestionSet.description} problem?`,
                                  correctAnswer: 0,
                                  points: 10,
                                  difficulty: aiQuestionSet.difficulty,
                                  category: aiQuestionSet.category || 'General'
                                };
                                
                                if (questionType === 'single_answer' || questionType === 'multiple_answer') {
                                  question.options = [`Option A for ${aiQuestionSet.category}`, `Option B for ${aiQuestionSet.category}`, `Option C for ${aiQuestionSet.category}`, `Option D for ${aiQuestionSet.category}`];
                                  question.correctAnswer = questionType === 'single_answer' ? 0 : [0, 2];
                                } else if (questionType === 'true_false') {
                                  question.correctAnswer = 'true';
                                } else if (questionType === 'short_descriptive' || questionType === 'broad_question') {
                                  question.wordLimit = aiQuestionSet.wordLimits[questionType];
                                  question.correctAnswer = 'Sample answer for evaluation';
                                }
                                
                                generatedQuestions.push(question);
                              }
                            }
                          });
                          
                          setAiGeneratedQuestions(generatedQuestions);
                          setShowAiPreview(true);
                          setIsGenerating(false);
                        }, 2000); // Simulate AI processing time
                      }}
                      className="w-full"
                      disabled={
                        !aiQuestionSet.category.trim() || 
                        !aiQuestionSet.description.trim() ||
                        Object.values(aiQuestionSet.questionTypes).reduce((a, b) => a + b, 0) === 0 ||
                        isGenerating
                      }
                    >
                      {isGenerating ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <Wand2 className="h-4 w-4 mr-2" />
                          Generate Question Set
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* AI Question Set Preview */}
              {showAiPreview && aiGeneratedQuestions.length > 0 && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800">AI Generated Question Set Preview</CardTitle>
                    <CardDescription className="text-blue-700">
                      {aiGeneratedQuestions.length} questions generated for {aiQuestionSet.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {aiGeneratedQuestions.map((question, index) => (
                        <div key={question.id} className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{question.type.replace('_', ' ')}</Badge>
                              <span className="text-xs text-gray-500">Question {index + 1}</span>
                            </div>
                            <span className="text-sm text-gray-600">{question.points} point(s)</span>
                          </div>
                          <p className="font-medium mb-2">{question.question}</p>
                          
                          {question.options && (
                            <div className="space-y-1">
                              {question.options.map((option, optIndex) => (
                                <div key={optIndex} className="flex items-center space-x-2">
                                  <input 
                                    type={question.type === 'multiple_answer' ? 'checkbox' : 'radio'}
                                    disabled
                                    checked={Array.isArray(question.correctAnswer) 
                                      ? question.correctAnswer.includes(optIndex)
                                      : question.correctAnswer === optIndex
                                    }
                                    className="text-green-600"
                                  />
                                  <span className={(
                                    Array.isArray(question.correctAnswer) 
                                      ? question.correctAnswer.includes(optIndex)
                                      : question.correctAnswer === optIndex
                                  ) ? 'text-green-600 font-medium' : ''}>
                                    {option}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {question.wordLimit && (
                            <div className="mt-2">
                              <p className="text-sm text-gray-600">Word limit: {question.wordLimit}</p>
                              <div className="bg-gray-100 p-2 rounded text-sm text-gray-500 mt-1">
                                [Answer text area would appear here for participants]
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button 
                        onClick={() => {
                          setQuestions([...questions, ...aiGeneratedQuestions]);
                          setAiGeneratedQuestions([]);
                          setShowAiPreview(false);
                          setAiQuestionSet({
                            category: '',
                            difficulty: 'medium',
                            totalQuestions: 10,
                            questionTypes: {
                              single_answer: 0,
                              multiple_answer: 0,
                              short_descriptive: 0,
                              true_false: 0,
                              broad_question: 0
                            },
                            wordLimits: {
                              short_descriptive: 50,
                              broad_question: 200
                            },
                            description: ''
                          });
                          onQuestionsUpdate?.([...questions, ...aiGeneratedQuestions]);
                        }}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Add All Questions
                      </Button>
                      <Button 
                        onClick={() => {
                          setAiGeneratedQuestions([]);
                          setShowAiPreview(false);
                        }}
                        variant="outline" 
                        className="flex-1"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Reject & Regenerate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Google Forms Integration */}
        <TabsContent value="google" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Google Forms Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">Export to Google Forms</h3>
                <p className="text-sm text-blue-700 mb-4">
                  Convert your questions into a Google Form for easy distribution and automatic response collection.
                </p>
                <Button onClick={exportToGoogleForm} className="bg-blue-500 hover:bg-blue-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Create Google Form
                </Button>
              </div>
              
              {googleFormUrl && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">Google Form Created!</h3>
                  <div className="flex items-center space-x-2">
                    <Input value={googleFormUrl} readOnly className="flex-1" />
                    <Button
                      onClick={() => navigator.clipboard.writeText(googleFormUrl)}
                      variant="outline"
                      size="sm"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => window.open(googleFormUrl, '_blank')}
                      variant="outline"
                      size="sm"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-2">Import from Google Forms</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Import questions from an existing Google Form by providing the form URL.
                </p>
                <div className="flex space-x-2">
                  <Input placeholder="https://forms.google.com/forms/d/..." className="flex-1" />
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quiz Settings */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Passing Score (%)</label>
                  <Input
                    type="number"
                    value={quizSettings.passingScore}
                    onChange={(e) => setQuizSettings(prev => ({ ...prev, passingScore: parseInt(e.target.value) || 85 }))}
                    min="0"
                    max="100"
                  />
                  <p className="text-xs text-gray-600 mt-1">Participants need this score to advance to Round 2</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Time Limit (minutes)</label>
                  <Input
                    type="number"
                    value={quizSettings.timeLimit}
                    onChange={(e) => setQuizSettings(prev => ({ ...prev, timeLimit: parseInt(e.target.value) || 30 }))}
                    min="5"
                    max="180"
                  />
                  <p className="text-xs text-gray-600 mt-1">Maximum time allowed for quiz completion</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Randomize Questions</h4>
                    <p className="text-sm text-gray-600">Show questions in random order for each participant</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={quizSettings.randomizeQuestions}
                    onChange={(e) => setQuizSettings(prev => ({ ...prev, randomizeQuestions: e.target.checked }))}
                    className="h-4 w-4 text-orange-500"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Results Immediately</h4>
                    <p className="text-sm text-gray-600">Display score and correct answers after submission</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={quizSettings.showResults}
                    onChange={(e) => setQuizSettings(prev => ({ ...prev, showResults: e.target.checked }))}
                    className="h-4 w-4 text-orange-500"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-4">Difficulty Distribution</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{difficultyDistribution.easy}</div>
                    <div className="text-sm text-gray-600">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{difficultyDistribution.medium}</div>
                    <div className="text-sm text-gray-600">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{difficultyDistribution.hard}</div>
                    <div className="text-sm text-gray-600">Hard</div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Save className="h-4 w-4 mr-2" />
                Save Quiz Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}