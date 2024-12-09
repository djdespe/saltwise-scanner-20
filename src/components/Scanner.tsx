import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { searchProductByBarcode } from "@/services/api";
import { BrowserMultiFormatReader, Result } from '@zxing/library';

interface ScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const Scanner = ({ onScan, onClose }: ScannerProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCamera, setHasCamera] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const codeReader = useRef<BrowserMultiFormatReader>();
  const { toast } = useToast();

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideoDevice = devices.some(device => device.kind === 'videoinput');
        setHasCamera(hasVideoDevice);
        
        if (hasVideoDevice) {
          const constraints = {
            video: { 
              facingMode: 'environment',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          };
          
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          // Initialiser ZXing
          codeReader.current = new BrowserMultiFormatReader();
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
      if (codeReader.current) {
        codeReader.current.reset();
      }
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [toast]);

  const startScanning = async () => {
    if (!codeReader.current || !videoRef.current || isScanning) return;
    
    setIsScanning(true);
    try {
      const result: Result = await codeReader.current.decodeOnceFromVideoElement(videoRef.current);
      if (result && result.getText()) {
        handleProductSearch(result.getText());
      }
    } catch (error) {
      console.error('Erreur scan:', error);
      toast({
        variant: "destructive",
        title: "Erreur Scan",
        description: "Impossible de lire le code-barres. Réessayez.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleProductSearch = async (barcode: string) => {
    setIsLoading(true);
    try {
      console.log('Recherche du produit:', barcode);
      const product = await searchProductByBarcode(barcode);
      
      if (product.product.nutriments.salt_100g) {
        onScan(barcode);
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
      console.error('Erreur recherche produit:', error);
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
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-2 border-amber-500 opacity-50 m-8">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>
              </div>
            </>
          ) : (
            <p className="text-white text-center absolute inset-0 flex items-center justify-center">
              Caméra non disponible
            </p>
          )}
        </div>

        <Button 
          onClick={startScanning} 
          className="w-full bg-amber-500 hover:bg-amber-600"
          disabled={isLoading || !hasCamera || isScanning}
        >
          {isLoading ? "Recherche..." : isScanning ? "Scan en cours..." : "Scanner Code-barres"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Scanner;