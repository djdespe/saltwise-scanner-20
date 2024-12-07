import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Scan, Search, User, AlertCircle } from "lucide-react";
import Scanner from '@/components/Scanner';
import DailySaltChart from '@/components/DailySaltChart';
import UserProfile from '@/components/UserProfile';

const MAX_DAILY_SALT = 5000; // 5g recommended by WHO

const Index = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [dailySalt, setDailySalt] = useState(0);
  const { toast } = useToast();

  const handleScan = (barcode: string) => {
    // Mock scan result - in real app would call API
    const mockProduct = {
      name: "Test Product",
      saltPer100g: 0.5,
      servingSize: 100
    };
    
    const newSaltAmount = dailySalt + mockProduct.saltPer100g;
    setDailySalt(newSaltAmount);
    
    if (newSaltAmount > MAX_DAILY_SALT) {
      toast({
        variant: "destructive",
        title: "Daily Salt Limit Exceeded",
        description: "You've exceeded your recommended daily salt intake.",
      });
    }
    
    setShowScanner(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Salt Tracker</h1>
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
          <User className="h-5 w-5" />
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Daily Salt Intake</h2>
        <Progress value={(dailySalt / MAX_DAILY_SALT) * 100} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          {dailySalt.toFixed(1)}g / {MAX_DAILY_SALT / 1000}g
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button onClick={() => setShowScanner(true)} className="flex flex-col items-center py-8">
          <Scan className="h-6 w-6 mb-2" />
          Scan Product
        </Button>
        <Button variant="outline" className="flex flex-col items-center py-8">
          <Search className="h-6 w-6 mb-2" />
          Search Product
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Weekly Overview</h2>
        <DailySaltChart />
      </Card>

      {showScanner && (
        <Scanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}

      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}
    </div>
  );
};

export default Index;