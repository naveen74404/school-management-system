# School Management System

A modern, responsive school management system built with Next.js 14, React Hook Form, Prisma, MySQL, and Cloudinary for image uploads.

## Features

- ✨ **Modern UI**: Beautiful, responsive design with Tailwind CSS
- 📝 **Add Schools**: Complete form with validation using React Hook Form + Zod
- 🖼️ **Image Upload**: Cloudinary integration for optimized image storage
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔍 **Search & Filter**: Search schools by name, city, state, or address
- 🎯 **Grid/List View**: Toggle between card grid and detailed list views
- ⚡ **Fast Performance**: Optimized with Next.js 14 App Router
- 🗄️ **Database**: Prisma ORM with MySQL (PlanetScale recommended)

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your database and Cloudinary credentials in `.env`

3. **Set up the database**
   ```bash
   npx prisma db push
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env` file with:

```env
DATABASE_URL="mysql://username:password@host:port/database?sslaccept=strict"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy!

See DEPLOYMENT.md for detailed instructions.

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- React Hook Form + Zod validation
- Prisma ORM
- MySQL/PlanetScale
- Cloudinary for images
- Tailwind CSS
- Lucide React icons

## Project Structure

```
school-management-system/
├── app/                 # Next.js App Router
│   ├── api/schools/     # API endpoints
│   ├── addSchool/       # Add school page
│   ├── showSchools/     # Display schools page
│   └── ...
├── components/          # React components
├── lib/                 # Utilities
├── prisma/             # Database schema
└── ...
```

Built with ❤️ using Next.js and modern web technologies.