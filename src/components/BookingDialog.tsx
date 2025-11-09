import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TourPackage } from "@/data/packages";
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
      // Google Form URL - Replace with your actual Google Form URL
      const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
      
      // Google Form field entry IDs - Replace with your actual field IDs
      const formFields = {
        name: "entry.YOUR_NAME_FIELD_ID",
        email: "entry.YOUR_EMAIL_FIELD_ID",
        tourName: "entry.YOUR_TOUR_NAME_FIELD_ID",
        tourDuration: "entry.YOUR_DURATION_FIELD_ID",
        tourPrice: "entry.YOUR_PRICE_FIELD_ID",
        tourLocation: "entry.YOUR_LOCATION_FIELD_ID",
        message: "entry.YOUR_MESSAGE_FIELD_ID",
      };

      const googleFormData = new FormData();
      googleFormData.append(formFields.name, formData.name);
      googleFormData.append(formFields.email, formData.email);
      googleFormData.append(formFields.tourName, tour.name);
      googleFormData.append(formFields.tourDuration, tour.duration);
      googleFormData.append(formFields.tourPrice, tour.price.toString());
      googleFormData.append(formFields.tourLocation, tour.location);
      googleFormData.append(formFields.message, formData.message);

      // Submit to Google Form (using no-cors mode)
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: googleFormData,
        mode: "no-cors",
      });

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
