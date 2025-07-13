import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

const TestCard = () => {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Shadcn UI Test</h2>
      
      <Card className="bg-gradient-to-br from-blue-400 to-blue-600 text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold">Test Card</h3>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              2/5
            </Badge>
          </div>
          
          <div className="space-y-3">
            <Progress value={40} className="h-2 bg-white/20" />
            
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star 
                  key={index}
                  size={16} 
                  className={`text-yellow-300 ${index < 2 ? 'fill-yellow-300' : 'fill-none opacity-30'}`}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestCard;