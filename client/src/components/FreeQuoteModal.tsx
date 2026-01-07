import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema } from "@shared/schema";
import { useCreateInquiry } from "@/hooks/use-inquiries";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

type FormData = z.infer<typeof insertInquirySchema>;

export function FreeQuoteModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateInquiry();

  const form = useForm<FormData>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "Residential",
      message: "",
      customerNo: "",
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-0 shadow-2xl rounded-2xl">
        <div className="bg-gradient-to-r from-secondary to-secondary/90 p-6 text-white">
          <DialogTitle className="text-2xl font-display font-bold">
            Get Your Free Quote
          </DialogTitle>
          <DialogDescription className="text-white/80 mt-2">
            Fill out the form below and our solar experts will get back to you
            with a custom proposal within 24 hours.
          </DialogDescription>
        </div>

        <div className="p-6 bg-white max-h-[70vh] overflow-y-auto">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Harshal Tapre"
                  className="rounded-lg"
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...form.register("phone")}
                  placeholder="9876543210"
                  className="rounded-lg"
                />
                {form.formState.errors.phone && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...form.register("email")}
                  placeholder="harshal@example.com"
                  className="rounded-lg"
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="customerNo">Consumer No. (Optional)</Label>
                <Input
                  id="customerNo"
                  {...form.register("customerNo")}
                  placeholder="MSEB-12345"
                  className="rounded-lg"
                />
                {form.formState.errors.customerNo && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.customerNo.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type</Label>
              <Select
                onValueChange={(val) =>
                  form.setValue("projectType", val as any)
                }
                defaultValue="Residential"
              >
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Residential">
                    Residential (Home)
                  </SelectItem>
                  <SelectItem value="Commercial">
                    Commercial (Office/Shop)
                  </SelectItem>
                  <SelectItem value="Industrial">
                    Industrial (Factory)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message / Details</Label>
              <Textarea
                id="message"
                {...form.register("message")}
                placeholder="Tell us about your energy needs..."
                className="rounded-lg min-h-[100px]"
              />
              {form.formState.errors.message && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg py-6 text-lg font-bold shadow-lg shadow-primary/20"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Get My Free Quote"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
