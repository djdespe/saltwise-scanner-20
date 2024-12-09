import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { searchProductByBarcode } from "@/services/api";

interface ScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const Scanner = ({ onScan, onClose }: ScannerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoDevice = devices.some(device => device.kind === 'videoinput');
        setHasCamera(hasVideoDevice);
        
        if (hasVideoDevice) {
          const constraints = {
            video: { facingMode: 'environment' }
          };
          
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error('Erreur accès caméra:', error);
        toast({
          variant: "destructive",
          title: "Erreur Caméra",
          description: "Impossible d'accéder à la caméra. Vérifiez vos permissions.",
        });
      }
    };

    checkCamera();

    return () => {
      // Nettoyer le flux vidéo à la fermeture
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleScanClick = async () => {
    setIsLoading(true);
    try {
      // Pour le moment, on utilise toujours le code-barres de test
      // Dans une vraie implémentation, il faudrait utiliser une bibliothèque
      // comme QuaggaJS ou zxing pour scanner le code-barres
      const mockBarcode = "3017620422003";
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
      console.error('Erreur scan:', error);
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
        
        <div className="aspect-video bg-black relative overflow-hidden rounded-lg mb-4">
          {hasCamera ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <p className="text-white text-center absolute inset-0 flex items-center justify-center">
              Caméra non disponible
            </p>
          )}
        </div>

        <Button 
          onClick={handleScanClick} 
          className="w-full bg-amber-500 hover:bg-amber-600"
          disabled={isLoading || !hasCamera}
        >
          {isLoading ? "Recherche..." : "Scanner Code-barres"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Scanner;