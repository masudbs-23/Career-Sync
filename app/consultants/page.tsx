"use client";

import { Icon } from "@iconify/react";
import { Section } from "@/components/ui";
import { useState } from "react";

export default function ConsultantsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Consultants", icon: "solar:users-group-two-rounded-linear" },
    { id: "admission", name: "Admission Experts", icon: "solar:graduation-cap-linear" },
    { id: "visa", name: "Visa Consultants", icon: "solar:passport-linear" },
    { id: "career", name: "Career Counselors", icon: "solar:briefcase-linear" },
  ];

  const consultants = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Admission Consultant",
      category: "admission",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1cd?q=80&w=200&auto=format&fit=crop",
      experience: "8+ years",
      specializations: ["USA Universities", "UK Admissions", "Scholarship Guidance"],
      rating: 4.9,
      reviews: 127,
      availability: "Available",
      bio: "Expert in North American and European university admissions with a proven track record of placing students in top-tier institutions."
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Visa & Immigration Specialist",
      category: "visa",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      experience: "6+ years",
      specializations: ["Student Visas", "Work Permits", "Immigration Law"],
      rating: 4.8,
      reviews: 89,
      availability: "Available",
      bio: "Specialized in student visa applications for Australia, Canada, and UK with 95% success rate."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      title: "Career Development Coach",
      category: "career",
      image: "https://images.unsplash.com/photo-1573496359142-b3d40a7a3397?q=80&w=200&auto=format&fit=crop",
      experience: "10+ years",
      specializations: ["Career Planning", "Skill Assessment", "Job Market Analysis"],
      rating: 4.9,
      reviews: 156,
      availability: "Busy",
      bio: "Helping students make informed career decisions based on their skills, interests, and market trends."
    },
    {
      id: 4,
      name: "David Kim",
      title: "Education Consultant",
      category: "admission",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      experience: "5+ years",
      specializations: ["Asian Universities", "Engineering Programs", "Research Guidance"],
      rating: 4.7,
      reviews: 73,
      availability: "Available",
      bio: "Specialist in Asian education systems and engineering program placements across top universities."
    },
    {
      id: 5,
      name: "Lisa Anderson",
      title: "Study Abroad Advisor",
      category: "admission",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
      experience: "7+ years",
      specializations: ["European Universities", "Language Programs", "Cultural Integration"],
      rating: 4.8,
      reviews: 112,
      availability: "Available",
      bio: "Expert in European education systems with focus on language programs and cultural adaptation."
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Immigration Consultant",
      category: "visa",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      experience: "9+ years",
      specializations: ["Permanent Residency", "Family Visas", "Citizenship"],
      rating: 4.9,
      reviews: 143,
      availability: "Available",
      bio: "Comprehensive immigration services for students planning to settle abroad after studies."
    }
  ];

  const filteredConsultants = selectedCategory === "all" 
    ? consultants 
    : consultants.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="w-full lg:w-12/14 lg:mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl lg:text-6xl font-bold text-black mb-6">
            Expert Education Consultants
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            Connect with experienced consultants who can guide you through every step of your educational journey
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 rounded-full font-medium">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {consultants.filter(c => c.availability === "Available").length} Available Now
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-blue-700 rounded-full font-medium">
              <Icon icon="solar:star-bold" className="text-lg" />
              4.8 Average Rating
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="w-full lg:w-12/14 lg:mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              <Icon icon={category.icon} className="text-xl" />
              {category.name}
            </button>
          ))}
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredConsultants.map((consultant) => (
            <div
              key={consultant.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group max-w-sm"
            >
              {/* Consultant Image */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    consultant.availability === "Available"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}>
                    {consultant.availability}
                  </div>
                </div>
              </div>

              {/* Consultant Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">{consultant.name}</h3>
                    <p className="text-gray-600 text-xs">{consultant.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-medium">
                      <Icon icon="solar:star-bold" className="text-yellow-500" />
                      {consultant.rating}
                    </div>
                    <p className="text-xs text-gray-500">{consultant.reviews} reviews</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                  <Icon icon="solar:briefcase-linear" className="text-sm" />
                  {consultant.experience} experience
                </div>

                <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                  {consultant.bio}
                </p>

                <div className="mb-3">
                  <p className="text-xs font-bold text-black uppercase tracking-wider mb-1">Specializations</p>
                  <div className="flex flex-wrap gap-1">
                    {consultant.specializations.slice(0, 2).map((spec, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                    {consultant.specializations.length > 2 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        +{consultant.specializations.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <button className="w-full py-2 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm">
                  Book Consultation
                </button>
              </div>
            </div>
          ))}

          {filteredConsultants.length === 0 && (
            <div className="text-center py-12 col-span-full">
              <Icon icon="solar:search-normal-linear" className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No consultants found in this category.</p>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full lg:w-12/14 lg:mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Need Personalized Guidance?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our consultants are ready to help you navigate your educational journey with expert advice and personalized support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-colors duration-300">
              Get Free Consultation
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300">
              Browse All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
