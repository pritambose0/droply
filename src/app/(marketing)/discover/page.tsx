"use client";

import Link from "next/link";
import { useState } from "react";

const mockProducts = [
  { id: 1, name: "SaaS Starter Kit 2026", creator: "DevTide Apps", price: "$49.00", icon: "🚀", tag: "Code" },
  { id: 2, name: "Advanced Generative AI Prompts", creator: "Sarah J.", price: "$12.50", icon: "🧠", tag: "EBook" },
  { id: 3, name: "Glassmorphism UI Kit (Figma)", creator: "Pixel Perfect", price: "$29.00", icon: "✨", tag: "Design" },
  { id: 4, name: "Node.js Microservices Course", creator: "Backend Masters", price: "$89.99", icon: "📦", tag: "Video" },
  { id: 5, name: "Minimalist Branding Templates", creator: "Studio V", price: "$15.00", icon: "🎨", tag: "Templates" },
  { id: 6, name: "Technical Interview Cheatsheet", creator: "AlgoHack", price: "Free", icon: "📝", tag: "EBook" },
];

export default function DiscoverPage() {
  const [filter, setFilter] = useState("All");
  
  const tags = ["All", "Code", "EBook", "Design", "Video", "Templates"];
  
  const filtered = filter === "All" ? mockProducts : mockProducts.filter(p => p.tag === filter);

  return (
    <div className="pt-40 pb-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-3 block">
            Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Discover <span className="gradient-text">Creator Tools</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore thousands of digital products built by top creators around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 animate-fade-in-up delay-100">
           {tags.map(tag => (
             <button 
               key={tag}
               onClick={() => setFilter(tag)}
               className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${filter === tag ? 'bg-accent text-white shadow-lg shadow-accent/20' : 'glass text-muted-foreground hover:text-foreground hover:bg-surface-hover'}`}
             >
               {tag}
             </button>
           ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up delay-200">
           {filtered.map((product) => (
             <div key={product.id} className="group glass rounded-2xl p-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 flex flex-col justify-between">
                <div>
                   <div className="w-16 h-16 rounded-2xl bg-surface border border-card-border flex items-center justify-center text-3xl mb-6 shadow-sm group-hover:scale-110 transition-transform">
                     {product.icon}
                   </div>
                   <div className="mb-2">
                     <span className="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
                       {product.tag}
                     </span>
                   </div>
                   <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-accent transition-colors cursor-pointer">{product.name}</h3>
                   <p className="text-sm text-muted-foreground mb-6">by {product.creator}</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-card-border">
                   <div className="text-lg font-bold text-foreground">{product.price}</div>
                   <Link href="/sign-up" className="px-4 py-2 rounded-xl bg-surface text-sm font-medium hover:bg-accent hover:text-white transition-all shadow-sm">
                     Buy Now
                   </Link>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
