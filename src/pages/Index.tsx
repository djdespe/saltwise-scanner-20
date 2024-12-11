import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Scan, Search, User } from "lucide-react";
import Scanner from '@/components/Scanner';
import DailySaltChart from '@/components/DailySaltChart';
import UserProfile from '@/components/UserProfile';
import { searchProductByBarcode } from "@/services/api";

const MAX_DAILY_SALT = 5000; // 5g recommandé par l'OMS

const Index = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dailySalt, setDailySalt] = useState(0);
  const { toast } = useToast();

  const handleScan = async (barcode: string) => {
    handleProductSearch(barcode);
    setShowScanner(false);
  };

  const handleProductSearch = async (barcode: string) => {
    try {
      console.log('Recherche du produit:', barcode);
      const product = await searchProductByBarcode(barcode);
      
      if (product.product.nutriments.salt_100g) {
        const newSaltAmount = dailySalt + product.product.nutriments.salt_100g;
        setDailySalt(newSaltAmount);
        
        toast({
          title: "Produit trouvé",
          description: `${product.product.product_name} - Sel: ${product.product.nutriments.salt_100g}g/100g`,
        });

        if (newSaltAmount > MAX_DAILY_SALT) {
          toast({
            variant: "destructive",
            title: "Attention",
            description: "Vous avez dépassé votre apport quotidien recommandé en sel.",
          });
        }
      } else {
        toast({
          variant: "destructive",
          title: "Information manquante",
          description: "La teneur en sel n'est pas disponible pour ce produit.",
        });
      }
    } catch (error) {
      console.error('Erreur recherche produit:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de trouver le produit.",
      });
    }
  };

  const handleManualSearch = async () => {
    if (searchQuery.trim()) {
      await handleProductSearch(searchQuery.trim());
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-amber-700">SaltWise Scanner</h1>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowProfile(true)}
          className="hover:bg-amber-200/50 transition-colors rounded-full"
        >
          <User className="h-5 w-5 text-amber-700" />
        </Button>
      </div>

      <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in rounded-[24px]">
        <h2 className="text-lg font-semibold mb-4 text-amber-800">Consommation Quotidienne de Sel</h2>
        <Progress 
          value={(dailySalt / MAX_DAILY_SALT) * 100} 
          className="mb-2 h-3 bg-amber-100 rounded-full overflow-hidden"
        />
        <p className="text-sm text-amber-700 font-medium">
          {dailySalt.toFixed(1)}g / {MAX_DAILY_SALT / 1000}g
        </p>
      </Card>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button 
          onClick={() => setShowScanner(true)} 
          className="flex flex-col items-center py-8 bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 shadow-lg transform hover:scale-105 transition-all duration-200 rounded-[24px] border-0"
        >
          <Scan className="h-6 w-6 mb-2" />
          Scanner Produit
        </Button>
        <Button 
          onClick={() => setShowSearch(true)}
          className="flex flex-col items-center py-8 bg-white hover:bg-amber-50 border-2 border-amber-400 text-amber-700 shadow-lg transform hover:scale-105 transition-all duration-200 rounded-[24px]"
        >
          <Search className="h-6 w-6 mb-2" />
          Rechercher Produit
        </Button>
      </div>

      <Card className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg animate-fade-in rounded-[24px]">
        <h2 className="text-lg font-semibold mb-4 text-amber-800">Aperçu Hebdomadaire</h2>
        <DailySaltChart />
      </Card>

      {showScanner && (
        <Scanner onScan={handleScan} onClose={() => setShowScanner(false)} />
      )}

      {showProfile && (
        <UserProfile onClose={() => setShowProfile(false)} />
      )}

      <Dialog open={showSearch} onOpenChange={setShowSearch}>
        <DialogContent className="bg-white/95 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-amber-800">Rechercher un Produit</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Entrez le code-barres du produit"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-amber-200 focus:border-amber-400"
            />
            <Button 
              onClick={handleManualSearch}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600"
            >
              Rechercher
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;