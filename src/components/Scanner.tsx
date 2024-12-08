import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { searchProductByBarcode } from "@/services/api";

interface ScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const Scanner = ({ onScan, onClose }: ScannerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScanClick = async () => {
    setIsLoading(true);
    try {
      // Simulation d'un code-barres pour test
      const mockBarcode = "3017620422003"; // Nutella comme exemple
      const product = await searchProductByBarcode(mockBarcode);
      
      if (product.product.nutriments.salt_100g) {
        onScan(mockBarcode);
        toast({
          title: "Produit trouvé",
          description: `${product.product.product_name} - Sel: ${product.product.nutriments.salt_100g}g/100g`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Information manquante",
          description: "La teneur en sel n'est pas disponible pour ce produit.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de trouver le produit.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Scanner un Produit</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="aspect-video bg-orange-50 flex items-center justify-center mb-4">
          <p className="text-muted-foreground">Aperçu Caméra</p>
        </div>

        <Button 
          onClick={handleScanClick} 
          className="w-full bg-amber-500 hover:bg-amber-600"
          disabled={isLoading}
        >
          {isLoading ? "Recherche..." : "Scanner Code-barres"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Scanner;