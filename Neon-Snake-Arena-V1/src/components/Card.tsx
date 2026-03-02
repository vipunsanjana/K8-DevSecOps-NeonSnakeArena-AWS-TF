import { Sparkles, Heart, Star, Zap, Crown, Flame, Trophy, Gem } from 'lucide-react';

interface CardProps {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const iconMap: { [key: string]: React.ElementType } = {
  sparkles: Sparkles,
  heart: Heart,
  star: Star,
  zap: Zap,
  crown: Crown,
  flame: Flame,
  trophy: Trophy,
  gem: Gem,
};

export default function Card({ icon, isFlipped, isMatched, onClick }: CardProps) {
  const IconComponent = iconMap[icon];

  return (
    <div
      className={`card ${isFlipped || isMatched ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className="card-pattern"></div>
        </div>
        <div className={`card-back ${isMatched ? 'matched' : ''}`}>
          {IconComponent && <IconComponent size={32} strokeWidth={2.5} />}
        </div>
      </div>
    </div>
  );
}
