'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthGuard } from '@/components/auth/AuthGuard';
import {
  ArrowLeft,
  Plus,
  X,
  Trophy,
  Users,
  Calendar,
  DollarSign,
  Target,
  FileText,
  Save,
  Eye,
  Upload,
  File,
  Image,
  Trash2
} from 'lucide-react';
import { categories, skillSuggestions } from '@/lib/mock-data';



function CreateCompetitionPageContent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    skillsTested: [] as string[],
    location: '',
    workType: '',
    experienceLevel: '',
    startDate: '',
    endDate: '',
    resultDate: '',
    prize: '',
    registrationFee: 'free',
    maxParticipants: '',
    projectBrief: '',
    evaluationCriteria: [] as string[],
    termsAndConditions: [] as string[],
    submissionFormats: [] as string[],
    attachments: [] as File[],
    fileLinks: [] as { name: string; url: string }[],
    bannerImage: null as File | null
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCriteria, setNewCriteria] = useState('');
  const [newTerm, setNewTerm] = useState('');
  const [newFormat, setNewFormat] = useState('');
  const [newFileLink, setNewFileLink] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const totalSteps = 4;

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addToArray = (field: string, value: string, setter: (value: string) => void) => {
    if (value.trim()) {
      const currentArray = formData[field as keyof typeof formData] as string[];
      handleInputChange(field, [...currentArray, value.trim()]);
      setter('');
    }
  };

  const removeFromArray = (field: string, index: number) => {
    const currentArray = formData[field as keyof typeof formData] as string[];
    handleInputChange(field, currentArray.filter((_, i) => i !== index));
  };

  const handleAddFileLink = () => {
    if (newFileLink.trim() && newFileName.trim()) {
      const newLink = { name: newFileName.trim(), url: newFileLink.trim() };
      setFormData(prev => ({ 
        ...prev, 
        fileLinks: [...prev.fileLinks, newLink]
      }));
      setNewFileLink('');
      setNewFileName('');
    }
  };

  const removeFileLink = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      fileLinks: prev.fileLinks.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (files: FileList | null, type: 'banner' | 'attachments') => {
    if (!files) return;
    
    if (type === 'banner' && files[0]) {
      setFormData(prev => ({ ...prev, bannerImage: files[0] }));
    } else if (type === 'attachments') {
      const newFiles = Array.from(files);
      setFormData(prev => ({ 
        ...prev, 
        attachments: [...prev.attachments, ...newFiles]
      }));
    }
  };

  const removeFile = (index: number, type: 'banner' | 'attachments') => {
    if (type === 'banner') {
      setFormData(prev => ({ ...prev, bannerImage: null }));
    } else {
      setFormData(prev => ({
        ...prev,
        attachments: prev.attachments.filter((_, i) => i !== index)
      }));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'banner' | 'attachments') => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files, type);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to an API
    console.log('Creating competition:', formData);
    router.push('/employer/competitions');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
              <p className="text-gray-600">Tell us about your competition and upload a banner image</p>
            </div>

            {/* Banner Image Upload */}
            <div className="space-y-6">
              <Label className="text-xl font-semibold">Competition Banner Image</Label>
              <div
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                  dragActive 
                    ? 'border-orange-500 bg-orange-50' 
                    : formData.bannerImage 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-orange-400 hover:bg-orange-50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={(e) => handleDrop(e, 'banner')}
              >
                {formData.bannerImage ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-3">
                      <Image className="h-10 w-10 text-green-600" />
                      <span className="text-xl font-medium text-green-700">
                        {formData.bannerImage.name}
                      </span>
                    </div>
                    <p className="text-base text-gray-600">
                      Size: {(formData.bannerImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => removeFile(0, 'banner')}
                      className="text-red-600 hover:text-red-700 hover:border-red-300 px-8 py-3"
                    >
                      <Trash2 className="h-5 w-5 mr-2" />
                      Remove Image
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-xl font-medium text-gray-700 mb-3">
                        Drop your banner image here, or click to browse
                      </p>
                      <p className="text-base text-gray-500">
                        Recommended: 1200x400px, JPG or PNG, max 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, 'banner')}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">Competition Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="e.g., Senior Frontend Developer Challenge"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe what you're looking for and what the competition involves..."
                    rows={4}
                    className="resize-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-sm font-medium">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel" className="text-sm font-medium">Experience Level</Label>
                  <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (2-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-8 years)</SelectItem>
                      <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Remote, New York, NY"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workType" className="text-sm font-medium">Work Type</Label>
                  <Select value={formData.workType} onValueChange={(value) => handleInputChange('workType', value)}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                      <SelectItem value="onsite">On-site</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Skills & Requirements</h2>
              <p className="text-gray-600">Define what skills you're looking for and project details</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-sm font-medium">Skills Tested *</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., React, Python, UI/UX)"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('skillsTested', newSkill, setNewSkill)}
                    className="h-10"
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('skillsTested', newSkill, setNewSkill)}
                    size="default"
                    className="px-4 h-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.category && skillSuggestions[formData.category as keyof typeof skillSuggestions] && (
                  <div className="space-y-4">
                    <p className="text-base text-gray-600 font-medium">Suggested skills for {formData.category}:</p>
                    <div className="flex flex-wrap gap-3">
                      {skillSuggestions[formData.category as keyof typeof skillSuggestions].map((skill) => (
                        <Button
                          key={skill}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (!formData.skillsTested.includes(skill)) {
                              handleInputChange('skillsTested', [...formData.skillsTested, skill]);
                            }
                          }}
                          disabled={formData.skillsTested.includes(skill)}
                          className="px-3 py-2"
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.skillsTested.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <span className="text-base font-medium">{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('skillsTested', index)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectBrief" className="text-sm font-medium">Project Brief</Label>
                <Textarea
                  id="projectBrief"
                  value={formData.projectBrief}
                  onChange={(e) => handleInputChange('projectBrief', e.target.value)}
                  placeholder="Describe the project or challenge participants will work on..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Evaluation Criteria</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newCriteria}
                    onChange={(e) => setNewCriteria(e.target.value)}
                    placeholder="Add evaluation criteria (e.g., Code Quality, Innovation, User Experience)"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('evaluationCriteria', newCriteria, setNewCriteria)}
                    className="h-10"
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('evaluationCriteria', newCriteria, setNewCriteria)}
                    size="default"
                    className="px-4 h-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.evaluationCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center justify-between bg-green-50 p-4 rounded-lg border border-green-200">
                      <span className="text-base font-medium">{criteria}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('evaluationCriteria', index)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Timeline & Rewards</h2>
              <p className="text-gray-600">Set dates and prizes for your competition</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className="text-sm font-medium">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className="text-sm font-medium">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resultDate" className="text-sm font-medium">Result Date</Label>
                  <Input
                    id="resultDate"
                    type="date"
                    value={formData.resultDate}
                    onChange={(e) => handleInputChange('resultDate', e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label htmlFor="prize" className="text-sm font-medium">Prize *</Label>
                  <Input
                    id="prize"
                    value={formData.prize}
                    onChange={(e) => handleInputChange('prize', e.target.value)}
                    placeholder="e.g., $5,000 + Job Offer"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxParticipants" className="text-sm font-medium">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
                    placeholder="Leave empty for unlimited"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Registration Fee</Label>
                <div className="flex space-x-8">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="free"
                      checked={formData.registrationFee === 'free'}
                      onCheckedChange={() => handleInputChange('registrationFee', 'free')}
                    />
                    <Label htmlFor="free" className="text-base font-medium">Free</Label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="paid"
                      checked={formData.registrationFee === 'paid'}
                      onCheckedChange={() => handleInputChange('registrationFee', 'paid')}
                    />
                    <Label htmlFor="paid" className="text-base font-medium">Paid</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-10">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Submission</h2>
              <p className="text-gray-600">Final details, terms, and additional files</p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-sm font-medium">Submission Formats</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    placeholder="e.g., GitHub repository, PDF document, Video URL"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('submissionFormats', newFormat, setNewFormat)}
                    className="h-10"
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('submissionFormats', newFormat, setNewFormat)}
                    size="default"
                    className="px-4 h-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.submissionFormats.map((format, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                      <span className="text-sm font-medium">{format}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('submissionFormats', index)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Files & Documents Links */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Additional Files & Documents</Label>
                <p className="text-sm text-gray-600 mb-3">
                  Add links to additional files like project requirements, templates, or reference materials (Google Drive, Dropbox, etc.).
                </p>
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter file link (e.g., Google Drive, Dropbox)"
                      value={newFileLink}
                      onChange={(e) => setNewFileLink(e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="File name/description"
                      value={newFileName}
                      onChange={(e) => setNewFileName(e.target.value)}
                      className="w-48"
                    />
                    <Button
                      type="button"
                      onClick={handleAddFileLink}
                      disabled={!newFileLink.trim() || !newFileName.trim()}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Display added file links */}
                {formData.fileLinks && formData.fileLinks.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-gray-700">Added Files:</p>
                    <div className="space-y-2">
                      {formData.fileLinks.map((fileLink, index) => (
                        <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-3">
                            <File className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-sm font-medium text-blue-900">{fileLink.name}</p>
                              <a 
                                href={fileLink.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                {fileLink.url}
                              </a>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFileLink(index)}
                            className="text-red-600 hover:text-red-700 hover:border-red-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Terms and Conditions</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newTerm}
                    onChange={(e) => setNewTerm(e.target.value)}
                    placeholder="Add a term or condition"
                    onKeyPress={(e) => e.key === 'Enter' && addToArray('termsAndConditions', newTerm, setNewTerm)}
                    className="h-10"
                  />
                  <Button
                    type="button"
                    onClick={() => addToArray('termsAndConditions', newTerm, setNewTerm)}
                    size="default"
                    className="px-4 h-10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {formData.termsAndConditions.map((term, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border">
                      <span className="text-sm font-medium">{term}</span>
                      <button
                        type="button"
                        onClick={() => removeFromArray('termsAndConditions', index)}
                        className="text-red-500 hover:text-red-700 p-1 ml-2"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-900">Competition Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Title:</strong> {formData.title || 'Not set'}</p>
                  <p><strong>Category:</strong> {formData.category || 'Not set'}</p>
                  <p><strong>Skills:</strong> {formData.skillsTested.join(', ') || 'None added'}</p>
                  <p><strong>Prize:</strong> {formData.prize || 'Not set'}</p>
                  <p><strong>Duration:</strong> {formData.startDate && formData.endDate 
                    ? `${formData.startDate} to ${formData.endDate}` 
                    : 'Not set'}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-6">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-6 ">
            <Button variant="ghost" onClick={() => router.back()} className="text-sm px-4 py-2 ">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Competition</h1>
              <p className="text-gray-600">Set up a new competition to find top talent</p>
            </div>
          </div>

          {/* Progress */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-700">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-sm text-gray-600">
                  {Math.round((currentStep / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-[#FC5602] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="shadow-lg">
            <CardContent className="p-12">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6 py-2 text-sm"
            >
              Previous
            </Button>

            <div className="flex space-x-4">
              {currentStep === totalSteps ? (
                <>
                  <Button variant="outline" onClick={() => console.log('Save as draft')} className="px-6 py-2 text-sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handleSubmit} className="btn-primary px-8 py-2 text-sm">
                    <Trophy className="h-4 w-4 mr-2" />
                    Create Competition
                  </Button>
                </>
              ) : (
                <Button onClick={handleNext} className="btn-primary px-6 py-2 text-sm">
                  Next Step
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateCompetitionPage() {
  return (
    <AuthGuard requireAuth={true}>
      <CreateCompetitionPageContent />
    </AuthGuard>
  );
}