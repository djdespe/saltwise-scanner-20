import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile = ({ onClose }: UserProfileProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Paramètres du Profil</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input id="name" placeholder="Entrez votre nom" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Âge</Label>
            <Input id="age" type="number" placeholder="Entrez votre âge" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Poids (kg)</Label>
            <Input id="weight" type="number" placeholder="Entrez votre poids" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyLimit">Limite Quotidienne de Sel (g)</Label>
            <Input id="dailyLimit" type="number" defaultValue="5" />
          </div>

          <Button className="w-full bg-amber-500 hover:bg-amber-600">Enregistrer les Modifications</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;