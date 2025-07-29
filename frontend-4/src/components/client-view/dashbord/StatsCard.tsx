import React, { type ElementType } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  icon: ElementType;
  change: string;
  changeType: 'positive' | 'negative';
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon = LucideIcon, 
  change, 
  changeType, 
  color 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
        <span 
          className={`text-sm font-medium px-2 py-1 rounded ${
            changeType === 'positive' 
              ? 'text-green-700 bg-green-100' 
              : 'text-red-700 bg-red-100'
          }`}
        >
          {change}
        </span>
      </div>
      
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-gray-600 text-sm">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;