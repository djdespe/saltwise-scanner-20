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
    const mockProduct = {
      name: "Produit Test",
      saltPer100g: 0.5,
      servingSize: 100
    };
    
    const newSaltAmount = dailySalt + mockProduct.saltPer100g;
    setDailySalt(newSaltAmount);
    
    if (newSaltAmount > MAX_DAILY_SALT) {
      toast({
        variant: "destructive",
        title: "Limite Quotidienne de Sel Dépassée",
        description: "Vous avez dépassé votre apport quotidien recommandé en sel.",
      });
    }
    
    setShowScanner(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Suivi du Sel</h1>
        <Button variant="ghost" size="icon" onClick={() => setShowProfile(true)}>
          <User className="h-5 w-5" />
        </Button>
      </div>

      <Card className="p-6 mb-6 bg-orange-50">
        <h2 className="text-lg font-semibold mb-4">Consommation Quotidienne de Sel</h2>
        <Progress value={(dailySalt / MAX_DAILY_SALT) * 100} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          {dailySalt.toFixed(1)}g / {MAX_DAILY_SALT / 1000}g
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          onClick={() => setShowScanner(true)} 
          className="flex flex-col items-center py-8 bg-amber-500 hover:bg-amber-600"
        >
          <Scan className="h-6 w-6 mb-2" />
          Scanner Produit
        </Button>
        <Button 
          variant="outline" 
          className="flex flex-col items-center py-8 border-amber-500 text-amber-700 hover:bg-amber-50"
        >
          <Search className="h-6 w-6 mb-2" />
          Rechercher Produit
        </Button>
      </div>

      <Card className="p-6 bg-orange-50">
        <h2 className="text-lg font-semibold mb-4">Aperçu Hebdomadaire</h2>
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