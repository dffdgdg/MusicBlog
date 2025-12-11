// src/features/author/components/StatsGrid.tsx
import { Eye, FileText, Edit } from 'lucide-react';

interface AuthorStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  averageRating?: number;
}

interface StatsGridProps {
  stats: AuthorStats;
}

const statCards = [
  {
    label: 'Всего статей',
    value: 'totalArticles',
    icon: FileText,
    color: 'orange' as const,
  },
  {
    label: 'Опубликовано',
    value: 'publishedArticles',
    icon: Edit,
    color: 'green' as const,
  },
  {
    label: 'Черновики',
    value: 'draftArticles',
    icon: FileText,
    color: 'blue' as const,
  },
  {
    label: 'Просмотры',
    value: 'totalViews',
    icon: Eye,
    color: 'purple' as const,
  },
];

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card) => {
        const Icon = card.icon;
        const value = stats[card.value as keyof AuthorStats];
        
        const colorClasses = {
          orange: 'from-orange-500/20 to-orange-500/10 border-orange-500/20 text-orange-400',
          green: 'from-green-500/20 to-green-500/10 border-green-500/20 text-green-400',
          blue: 'from-blue-500/20 to-blue-500/10 border-blue-500/20 text-blue-400',
          purple: 'from-purple-500/20 to-purple-500/10 border-purple-500/20 text-purple-400',
        };

        return (
          <div
            key={card.label}
            className={`bg-gradient-to-br rounded-2xl p-6 border ${colorClasses[card.color]}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">{card.label}</p>
                <p className="text-2xl font-bold text-white mt-2">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}