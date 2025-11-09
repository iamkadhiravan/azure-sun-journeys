import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TourPackage } from "@/data/packages";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface BookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tour: TourPackage;
}

export const BookingDialog = ({ open, onOpenChange, tour }: BookingDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.functions.invoke("send-booking", {
        body: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          tourName: tour.name,
          tourDuration: tour.duration,
          tourPrice: tour.price,
          tourLocation: tour.location,
        },
      });

      if (error) throw error;

      toast.success("Booking request sent successfully!");
      setFormData({ name: "", email: "", message: "" });
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending booking:", error);
      toast.error("Failed to send booking request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book {tour.name}</DialogTitle>
          <DialogDescription>
            Fill in your details to book this tour package. We'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any special requirements or questions?"
              rows={4}
            />
          </div>
          <div className="bg-muted p-4 rounded-md space-y-1">
            <p className="text-sm font-semibold">Package Details:</p>
            <p className="text-sm">{tour.duration}</p>
            <p className="text-sm font-semibold text-primary">₹{tour.price.toLocaleString("en-IN")}</p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Submit Booking Request"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
