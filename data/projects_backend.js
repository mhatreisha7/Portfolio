const backendProjects = [
  {
    id: "localseva",
    title: "LocalSeva Backend",
    shortDesc: "Unified platform connecting users with local service providers.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tech: ["Django", "DRF", "PostgreSQL", "JWT", "Cloudinary", "Redis"],
    github: "https://github.com/harishnadar",
    demo: "https://github.com/harishnadar",
    date: "Jan 2026",
    details: {
      overview:
        "A full-featured backend for a service marketplace platform — designed for customers, service providers, and marketplace sellers. Built with Django REST Framework with a focus on clean architecture and real-world scalability.",
      highlights: [
        "Role-based permission system for three distinct user types: customers, service providers, and sellers.",
        "Quote-driven booking workflow with strict status transitions and role-specific actions.",
        "JWT-based authentication with secure PostgreSQL storage and Cloudinary for cloud media.",
        "Advanced filtering/search, soft deletes, rating aggregation, and basic comment moderation.",
        "RESTful API design with optimized data models and permission-restricted endpoints.",
      ],
    },
  },
  {
    id: "invyta",
    title: "Invyta Event Management",
    shortDesc: "Flask-based REST backend for event lifecycle and invite management.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    tech: ["Flask", "MongoDB", "JWT", "OTP Auth", "Rate Limiting"],
    github: "https://github.com/harishnadar",
    demo: null,
    date: "Feb 2025",
    details: {
      overview:
        "A Flask-based REST backend powering a full event management platform — from auth to invitations and recommendations.",
      highlights: [
        "Secure JWT authentication with email OTP verification and password hashing.",
        "Rate-limited endpoints to prevent abuse and protected routes via middleware.",
        "Event lifecycle management: creation, private/public access control, join approvals, and RSVP tracking.",
        "Invite-based entry system with personalized event recommendations.",
        "MongoDB-backed storage with efficient querying patterns.",
      ],
    },
  },
  {
    id: "railsahayati-backend",
    title: "Rail Sahayati — Backend",
    shortDesc: "AI-driven railway grievance system backend with role-based routing.",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=600&q=80",
    tech: ["Django", "MongoDB", "REST API", "MobileNetV2", "Role-based Auth"],
    github: "https://github.com/harishnadar",
    demo: null,
    date: "Jan 2025",
    details: {
      overview:
        "Backend infrastructure for an AI-powered railway grievance resolution system, integrating ML-based image classification with structured complaint workflows.",
      highlights: [
        "Django and MongoDB backend managing complaint storage and full lifecycle.",
        "Role-based workflow routing to assign complaints to the correct department.",
        "Integrated MobileNetV2 image classification for automatic complaint categorization.",
        "Automated department assignment reduced resolution time by 50% per report.",
        "REST APIs supporting both mobile and web clients.",
      ],
    },
  },
];
