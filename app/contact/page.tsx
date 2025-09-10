"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Award } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

interface ContactForm {
  name: string
  email: string
  company: string
  subject: string
  category: string
  message: string
}

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    category: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setForm({
        name: '',
        email: '',
        company: '',
        subject: '',
        category: '',
        message: ''
      })
    }, 3000)
  }

  const updateForm = (field: keyof ContactForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["hello@giggeni.com", "support@giggeni.com"],
      description: "Get in touch for general inquiries or support"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Speak directly with our team"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["123 Innovation Drive", "Tech Valley, CA 94025"],
      description: "Our headquarters in Silicon Valley"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM PST", "Sat: 10:00 AM - 4:00 PM PST"],
      description: "We're here when you need us"
    }
  ]

  const categories = [
    "General Inquiry",
    "Competition Support",
    "Technical Issues",
    "Partnership Opportunities",
    "Media & Press",
    "Feedback & Suggestions"
  ]

  const stats = [
    { icon: <Users className="w-8 h-8" />, label: "Active Users", value: "50,000+" },
    { icon: <Award className="w-8 h-8" />, label: "Competitions Hosted", value: "1,200+" },
    { icon: <MessageSquare className="w-8 h-8" />, label: "Support Tickets Resolved", value: "25,000+" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-[#FC5602]">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about our platform? Want to partner with us? Or just want to say hello? 
            We'd love to hear from you. Our team is here to help you succeed.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4 text-[#FC5602]">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Send className="w-6 h-6 text-[#FC5602]" />
                Send us a Message
              </CardTitle>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        placeholder="john@company.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company/Organization
                      </label>
                      <Input
                        type="text"
                        value={form.company}
                        onChange={(e) => updateForm('company', e.target.value)}
                        placeholder="Acme Corp"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <Select value={form.category} onValueChange={(value) => updateForm('category', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      value={form.subject}
                      onChange={(e) => updateForm('subject', e.target.value)}
                      placeholder="How can we help you?"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => updateForm('message', e.target.value)}
                      placeholder="Tell us more about your inquiry..."
                      required
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || !form.name || !form.email || !form.subject || !form.category || !form.message}
                    className="w-full bg-[#FC5602] hover:bg-[#E54D02] text-white py-3 text-lg font-semibold"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-gray-600 mb-8">
                Choose the best way to reach us. We're committed to providing excellent support 
                and building meaningful partnerships.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#FC5602] bg-opacity-10 rounded-lg flex items-center justify-center text-[#FC5602]">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                        <div className="space-y-1 mb-2">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-700 font-medium">{detail}</p>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Info */}
            {/* <Card className="bg-gradient-to-r from-[#FC5602] to-[#E54D02] text-white">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Why Choose GiG Geni?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-none">
                      ✓
                    </Badge>
                    <span>Industry-leading competition platform</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-none">
                      ✓
                    </Badge>
                    <span>24/7 dedicated support team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-none">
                      ✓
                    </Badge>
                    <span>Trusted by 50,000+ professionals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-none">
                      ✓
                    </Badge>
                    <span>Innovative features and regular updates</span>
                  </div>
                </div>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* FAQ Section */}
        {/* <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">How quickly do you respond to inquiries?</h3>
                <p className="text-gray-600">We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Do you offer custom enterprise solutions?</h3>
                <p className="text-gray-600">Yes! We provide tailored solutions for enterprise clients. Contact us to discuss your specific requirements and get a custom quote.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Can I schedule a demo of the platform?</h3>
                <p className="text-gray-600">Absolutely! We offer personalized demos to showcase how GiG Geni can benefit your organization. Use the contact form to request a demo.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-3">What support options are available?</h3>
                <p className="text-gray-600">We offer email support, phone support, live chat, and comprehensive documentation. Premium plans include priority support and dedicated account managers.</p>
              </CardContent>
            </Card>
          </div>
        </div> */}
      </div>
    </div>
  )
}