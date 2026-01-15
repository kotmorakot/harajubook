# Harajubook

**Harajubook** is a modern, high-performance personal blog and knowledge base built with [Next.js](https://nextjs.org) and [Convex](https://convex.dev). It features a sleek, minimalist design, Markdown content management, and a secure admin interface for managing articles.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15 (App Router), TypeScript, and Tailwind CSS.
- **Real-time Backend**: Powered by Convex for instant data updates and robust backend logic.
- **Markdown Support**: Render articles securely using `next-mdx-remote` with GitHub Flavored Markdown support.
- **Admin Dashboard**: Secure, password-protected admin area to creating, editing, and deleting articles.
- **Responsive Design**: Mobile-first approach ensuring great readability on all devices.
- **SEO Optimized**: dynamic metadata and Open Graph support.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Convex](https://convex.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kotmorakot/harajubook.git
   cd harajubook
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Create a `.env.local` file in the root directory and add the following:
   ```env
   # Admin Password for the Dashboard
   ADMIN_PASSWORD=your_secure_password
   ```

4. **Start Convex Dev Server**
   To sync your backend and schema:
   ```bash
   npx convex dev
   ```

5. **Run the Application**
   In a new terminal:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🚀 Deployment

This project is optimized for deployment on **Vercel**.

1. **Push to GitHub**: Ensure your code is pushed to your repository.
2. **Import to Vercel**: Create a new project in Vercel and import your repository.
3. **Configure Environment Variables**:
   Add the following variables in Vercel Project Settings:
   - `CONVEX_DEPLOY_KEY`: (From Convex Dashboard > Settings > API Keys)
   - `NEXT_PUBLIC_CONVEX_URL`: (From Convex Dashboard)
   - `ADMIN_PASSWORD`: Your chosen admin password.

   *Refer to `VERCEL_README.md` for detailed deployment steps.*

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Antigravity](https://github.com/kotmorakot).
