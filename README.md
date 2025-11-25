🎬 CineMate — Movie Recommendation System

CineMate is a content-based movie recommendation system built using Next.js + TypeScript.
Users can search any movie and instantly get 5 similar recommended movies, based on genre similarity and TF-IDF similarity of overview descriptions.

Deployed Live : https://movie-recommender-alpha-seven.vercel.app/

| Feature                               | Description                                            |
| ------------------------------------- | ------------------------------------------------------ |
| Search-based recommendations          | Enter movie name & get top 5 similar movies            |
| Content-based filtering               | Uses genre overlap + TF-IDF score of overview text     |
| Real MovieLens dataset                | Uses Kaggle MovieLens Small dataset (`movies.csv`)     |
| Smart recommendation scoring          | Weighted similarity: 60% TF-IDF + 40% genre similarity |
| Modern UI                             | Built using TailwindCSS + Next.js App Router           |
| Server-side search and recommendation | No client-side computation                             |
| Fully deployable                      | Works on Vercel deployment                             |

🧠 How Recommendations Work

The system uses a hybrid content-based filtering approach combining:

1. Genre Similarity

Movies are converted to genre word vectors:

Action Sci-Fi Thriller


The overlap between two sets is computed:

similarity = common / sqrt(sizeA × sizeB)

2. Overview TF-IDF Similarity

Movie descriptions are tokenized & converted into vector space representation, then cosine similarity is applied.

3. Combined Similarity Score
finalScore = 0.4 * genreSimilarity + 0.6 * tfidfSimilarity


Movies are then sorted and the top 5 are returned.

🏗️ Project Architecture
movie-recommender/
│
├── app/
│   ├── page.tsx                     # Home screen
│   ├── movies/page.tsx             # Movie list + Search
│   ├── recommendations/page.tsx    # Recommendation results
│
├── data/
│   ├── movies.csv                  # MovieLens dataset
│   ├── overviews.ts                # Small initial overview mapping
│
├── lib/
│   ├── movies.ts                   # CSV loader & movie helpers
│   ├── recommendations.ts          # Recommendation engine
│   ├── tfidf.ts                    # TF-IDF cosine similarity helper
│
├── types/
│   ├── movie.ts                    # Movie type definition
│
├── public/                         # Assets if needed
│
├── package.json
├── tailwind.config.js
└── README.md



🚀 Getting Started (Local Setup)
Prerequisites

Node.js 18+

npm or yarn

Basic understanding of Next.js

Installation
git clone https://github.com/yourusername/movie-recommender.git
cd movie-recommender
npm install

Run Development Server
npm run dev


Then open http://localhost:3000


🧪 Usage
Search Similar Movies:

Go to /recommendations

Type a movie name (e.g., toy, dark, inter)

Click Get Similar

System displays 5 recommended similar movies

📦 Dataset Used

📌 MovieLens Small dataset (Kaggle)
Contains:

movies.csv: Movie list & genres

ratings.csv: (not used yet, reserved for future collaborative filtering)

🌐 Deployment

This project is fully compatible with Vercel deployment.

Deploy Steps

Push code to GitHub

Go to: https://vercel.com
 → Import project from GitHub

Set build settings automatically detected by Vercel

Add the following to pages using fs:

export const runtime = "nodejs";


Deploy 🚀

📍 Future Enhancements
Feature	Status
TMDB API integration (real posters & descriptions)	⏳ Planned
Collaborative filtering using user ratings	⏳
Auto-complete search suggestions	⏳
LocalStorage ratings	⏳
Real vector embeddings using NLP	⏳
📝 Project Report Support Sections

Use in your document:

Problem Statement

Users spend significant time searching for movies that match their interests. CineMate solves this by providing personalized similarity-based recommendations using movie metadata and natural-language plot understanding.

Objectives

Build content-based movie recommender

Integrate search + similar-movie recommendations

Deploy full-stack system publicly

Tech Stack
Layer	Technology
Frontend + Backend	Next.js + TypeScript
Styling	TailwindCSS
Deployment	Vercel
Dataset	MovieLens Small (Kaggle)
🤝 Contribution

Fork the project and submit a PR with improvements!
Suggestions welcome 👇

