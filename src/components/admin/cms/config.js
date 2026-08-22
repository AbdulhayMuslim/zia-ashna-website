export const cmsConfigs = {
  hero: {
    initialValue: {
      sectionTitle: "Entrepreneur | Founder",
      name: "Sayed Zia Ashna",
      description: "",
      buttonLabel: "Get In Touch",
      buttonUrl: "#contact",
      heroImageUrl: "",
      logos: [],
    },

    fields: [
      { key: "sectionTitle", label: "Section Title" },
      { key: "name", label: "Name" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "buttonLabel", label: "Button Label" },
      { key: "buttonUrl", label: "Button URL" },
      { key: "heroImageUrl", label: "Hero Image URL" },
    ],

    groups: [
      {
        key: "logos",
        title: "Brand Logos",
        description: "Logos displayed below the hero.",
        itemTitle: "Logo",
        empty: { name: "", imageUrl: "", linkUrl: "" },
        fields: [
          { key: "name", label: "Name" },
          { key: "imageUrl", label: "Image URL" },
          { key: "linkUrl", label: "Website URL" },
        ],
      },
    ],
  },

  about: {
    initialValue: {
      sectionTitle: "About Me",
      role: "",
      heading: "",
      description: "",
      imageUrl: "",
      experiences: [],
      jobExperiences: [],
      education: [],
      certificates: [],
    },

    fields: [
      { key: "sectionTitle", label: "Section Title" },
      { key: "role", label: "Role" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "imageUrl", label: "Profile Image", type: "image", description: "JPG, PNG, or WebP · automatically optimized" },
    ],

    groups: [
      {
        key: "experiences",
        title: "Experience Cards",
        itemTitle: "Experience Card",
        empty: { number: "", title: "" },
        fields: [
          { key: "number", label: "Number" },
          { key: "title", label: "Title" },
        ],
      },
      {
        key: "jobExperiences",
        title: "Job Experience",
        itemTitle: "Job",
        empty: { role: "", institution: "", year: "" },
        fields: [
          { key: "role", label: "Role" },
          { key: "institution", label: "Institution" },
          { key: "year", label: "Year" },
        ],
      },
      {
        key: "education",
        title: "Education Degrees",
        itemTitle: "Degree",
        empty: { degree: "", institution: "", year: "" },
        fields: [
          { key: "degree", label: "Degree" },
          { key: "institution", label: "Institution" },
          { key: "year", label: "Year" },
        ],
      },
      {
        key: "certificates",
        title: "Certificates",
        itemTitle: "Certificate",
        empty: { name: "" },
        fields: [{ key: "name", label: "Name" }],
      },
    ],
  },

  activity: {
    initialValue: {
      sectionTitle: "Activity",
      heading: "",
      description: "",
      cards: [],
    },

    fields: [
      { key: "sectionTitle", label: "Section Title" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
    ],

    groups: [
      {
        key: "cards",
        title: "Activity Cards",
        itemTitle: "Activity Card",
        empty: {
          icon: "Rocket",
          number: "",
          heading: "",
          description: "",
        },
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "number", label: "Number" },
          { key: "heading", label: "Heading" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },

  history: {
    initialValue: {
      sectionTitle: "History",
      heading: "",
      description: "",
      cards: [],
    },

    fields: [
      { key: "sectionTitle", label: "Section Title" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
    ],

    groups: [
      {
        key: "cards",
        title: "History Cards",
        itemTitle: "History Card",
        empty: {
          icon: "Rocket",
          number: "",
          heading: "",
          description: "",
        },
        fields: [
          { key: "icon", label: "Icon", type: "icon" },
          { key: "number", label: "Number" },
          { key: "heading", label: "Heading" },
          { key: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },

  contact: {
    initialValue: {
      sectionTitle: "Contact",
      heading: "",
      description: "",
      cards: [],
    },

    fields: [
      { key: "sectionTitle", label: "Section Title" },
      { key: "heading", label: "Heading" },
      { key: "description", label: "Description", type: "textarea" },
    ],

    groups: [
      {
        key: "cards",
        title: "Contact Cards",
        itemTitle: "Contact Card",
        empty: { title: "", icon: "Mail" },
        fields: [
          { key: "title", label: "Title" },
          { key: "icon", label: "Icon", type: "icon" },
        ],
      },
    ],
  },

  settings: {
    initialValue: {
      siteName: "Sayed Zia Ashna",
      siteDescription: "",
      logoUrl: "",
      faviconUrl: "",
      contactEmail: "",
      phone: "",
      address: "",
      seoTitle: "",
      seoDescription: "",
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      whatsapp: "",
      copyright: "",
    },

    fields: [
      { key: "siteName", label: "Site Name" },
      { key: "siteDescription", label: "Site Description", type: "textarea" },
      { key: "logoUrl", label: "Logo URL" },
      { key: "faviconUrl", label: "Favicon URL" },
      { key: "contactEmail", label: "Contact Email", type: "email" },
      { key: "phone", label: "Phone Number" },
      { key: "address", label: "Address", type: "textarea" },
      { key: "seoTitle", label: "SEO Title" },
      { key: "seoDescription", label: "SEO Description", type: "textarea" },
      { key: "facebook", label: "Facebook URL" },
      { key: "twitter", label: "X / Twitter URL" },
      { key: "instagram", label: "Instagram URL" },
      { key: "linkedin", label: "LinkedIn URL" },
      { key: "youtube", label: "YouTube URL" },
      { key: "whatsapp", label: "WhatsApp URL" },
      { key: "copyright", label: "Copyright" },
    ],

    groups: [],
  },

  profile: {
    initialValue: {
      fullName: "",
      username: "admin",
      email: "",
      phone: "",
      jobTitle: "",
      avatarUrl: "",
    },

    fields: [
      { key: "fullName", label: "Full Name" },
      { key: "username", label: "Username" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone" },
      { key: "jobTitle", label: "Role / Job Title" },
      {
        key: "avatarUrl",
        label: "Profile Image",
        type: "image",
        description: "Max size: 2MB · JPG, PNG, WEBP",
      },
    ],

    groups: [],
  },
};
