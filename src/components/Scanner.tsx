import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

const Scanner = ({ onScan, onClose }: ScannerProps) => {
  // Mock scanner - in real app would use camera API
  const handleScanClick = () => {
    onScan("123456789");
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Scan Product</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="aspect-video bg-muted flex items-center justify-center mb-4">
          <p className="text-muted-foreground">Camera Preview</p>
        </div>

        <Button onClick={handleScanClick} className="w-full">
          Scan Barcode
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Scanner;