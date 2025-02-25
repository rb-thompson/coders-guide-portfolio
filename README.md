# The Coder's Guide to the Portfolio Project

Welcome to **The Coder's Guide to the Portfolio Project**, a cosmic-themed web app designed to guide aspiring coders through interactive quests, helping them build portfolio-worthy confidence while learning key skills and exciting tech news. I created this solo, with a bit of AI assistance and GitHub to track my journey—hoping it catches the eye.

🚀 [Try it live on Vercel!](https://coders-guide-portfolio.vercel.app/signup)

## What It Does

Embark on a journey through the Data Galaxy where you, a coder, must navigate toward the prize.

- **Complete Quests**: Drag-and-drop challenges like "Explore the Cosmic Console" to master coding concepts.

- **Track Progress**: Collect badges and watch quests mark as completed with a *satisfying* checkmark. 

- **Showcase Skills**: A portfolio piece that's both functional and fun.



## Tech Stack

> "We don't learn new tools just for the sake of it." - Jeffrey W.

Built with modern tools I've learned to love:

- **Next.js**: For a fast, dynamic frontend with the App Router.

- **Tailwind CSS**: Easy and beautiful responsive styling.

- **Framer Motion**: Subtle animations.

- **React Context & localStorage**: User state management (until the backend spins)

- **GitHub**: Tracked every step of my five-day sprint.



## How I Built It

This project was a labor of love for *the process*—hours of coding, debugging, and learning over five days. I started with a vision: a gamified portfolio to stand out. With AI as a coding companion and GitHub to log my progress (check the [commit history](https://github.com/rb-thompson/coders-guide-portfolio/commits/main/)), I tackled challenges like Next.js Promise-based params, deployment hiccups, and state bugs. It's not perfect, but it's mine—and I’m proud of it.



## Get Involved

I'd love feedback or opportunities:

- Live Demo: [coders-guide-portfolio.vercel.app](coders-guide-portfolio.vercel.app)

- Connect: Reach me at [prizecoffeecup@gmail.com](prizecoffeecup@gmail.com)

- Contribute: Fork it, suggest ideas, or share it with someone building out first-portfolios.



## Thanks

To you who's reading this: thank you for checking out my work. This project reflects a lot of my passion for coding and my drive to learn. If it sparks interest or a conversation, I'd be thrilled.


Happy coding!

R. Brandon Thompson 

## Additional Project Structure

```
# Project Structure

coders-guide-portfolio/
├── frontend/                                   # Next.js frontend
│   ├── app/                                    # App Router directory (replaces pages/)
│   │   ├── chapters/                         
│   │   │   ├── [id]/                       
│   │   │   │   ├── [slug]/                 
│   │   │   │   │   ├── complete/           
│   │   │   │   │   │   └── page.tsx            # Quest completion page (/chapters/[id]/[slug]/complete)
│   │   │   │   │   └── page.tsx                # Quest page (/chapters/[id]/[slug])
│   │   │   │   └── page.tsx                    # Select a quest (/chapters/[id])
│   │   │   ├── chapters.ts                     # Chapter data
│   │   │   └── page.tsx                        # Select a chapter (/chapters) 
│   │   ├── components/                         # Next.js reusable components
│   │   │   ├── quests/                         
│   │   │   │   ├── ExploreCosmicConsole.tsx    # Each quest challenge is found here
│   │   │   │   └── ResumeRuckus.tsx            # and loaded into the quest page.
│   │   │   ├── GalacticEntity.tsx              # UI element that wanders the homepage
│   │   │   ├── LoadingSpinner.tsx              # Shows in between page loads
│   │   │   ├── NavBar.tsx                      # Main navigation component
│   │   │   ├── PageTransition.tsx              # Smoothes page transitions
│   │   │   └── Toast.tsx                       # Toast messages
│   │   ├── context/                        
│   │   │   └── UserContext.tsx                 # User state management
│   │   ├── login/                          
│   │   │   └── page.tsx                        # Login page (/login)
│   │   ├── portfolio/                        
│   │   │   └── page.tsx                        # Portfolio page (Badge Showcase) (/portfolio)
│   │   ├── profile/                        
│   │   │   └── page.tsx                        # Profile Settings page (/profile)
│   │   ├── signup/                        
│   │   │   └── page.tsx                        # Signup page (/signup)
│   │   ├── layout.tsx                          # Root layout (wraps all pages)
│   │   ├── page.tsx                            # Home page (equivalent to pages/index.tsx)
│   │   ├── globals.css                         # Global styles (includes Tailwind directives)
│   │   └── favicon.ico                         # Favicon
│   ├── public/                                 # Static assets (images, fonts, etc.)
│   ├── package.json                            # Node.js dependencies
│   ├── tsconfig.json                           # TypeScript configuration
│   ├── next.config.mjs                         # Next.js configuration
│   ├── postcss.config.mjs                      # PostCSS configuration (for Tailwind)
│   └── tailwind.config.ts                      # Tailwind CSS configuration
├── backend/                                    # Python backend
│   ├── venv/                                   # Python virtual environment
│   ├── main.py                                 # FastAPI app
│   └── requirements.txt                        # Python dependencies
├── .gitignore                                  # Git ignore file
└── README.md                                   # Project documentation
```