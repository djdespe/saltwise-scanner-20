import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UserProfileProps {
  onClose: () => void;
}

const UserProfile = ({ onClose }: UserProfileProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: localStorage.getItem('user_name') || '',
    age: localStorage.getItem('user_age') || '',
    weight: localStorage.getItem('user_weight') || '',
    dailyLimit: localStorage.getItem('user_daily_limit') || '5'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSave = () => {
    // Validation des données
    if (!formData.name.trim()) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Le nom est requis",
      });
      return;
    }

    if (parseInt(formData.age) <= 0 || parseInt(formData.weight) <= 0 || parseInt(formData.dailyLimit) <= 0) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Les valeurs numériques doivent être positives",
      });
      return;
    }

    // Sauvegarde dans le localStorage
    localStorage.setItem('user_name', formData.name);
    localStorage.setItem('user_age', formData.age);
    localStorage.setItem('user_weight', formData.weight);
    localStorage.setItem('user_daily_limit', formData.dailyLimit);

    toast({
      title: "Succès",
      description: "Profil sauvegardé avec succès",
    });

    onClose();
  };

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
            <Input 
              id="name" 
              placeholder="Entrez votre nom" 
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Âge</Label>
            <Input 
              id="age" 
              type="number" 
              placeholder="Entrez votre âge" 
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Poids (kg)</Label>
            <Input 
              id="weight" 
              type="number" 
              placeholder="Entrez votre poids" 
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyLimit">Limite Quotidienne de Sel (g)</Label>
            <Input 
              id="dailyLimit" 
              type="number" 
              value={formData.dailyLimit}
              onChange={handleChange}
            />
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full bg-amber-500 hover:bg-amber-600"
          >
            Enregistrer les Modifications
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;