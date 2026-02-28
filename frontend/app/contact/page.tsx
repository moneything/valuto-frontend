"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import Button from "@/components/theme/Button";
import { Mail, School } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 2000;

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export default function Features() {
    const { toast } = useToast();
    const [sending, setSending] = useState(false);
    const [formData, setFormData] = useState<ContactFormData>({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});

    const updateField = (field: keyof ContactFormData, value: string) => {
      const nextValue = sanitizeFieldValue(field, value);
      setFormData((current) => ({ ...current, [field]: nextValue }));

      if (errors[field]) {
        const nextErrors = validateForm({ ...formData, [field]: nextValue });
        setErrors((current) => ({ ...current, [field]: nextErrors[field] }));
      }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const sanitizedFormData = sanitizeFormData(formData);
        const validationErrors = validateForm(sanitizedFormData);

        setFormData(sanitizedFormData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
          toast({
            title: "Invalid form",
            description: "Please correct the highlighted fields before sending.",
            variant: "destructive",
          });
          return;
        }

        setSending(true);

        try {
          const response = await fetch(`${API_BASE_URL}/api/contact`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sanitizedFormData),
          });

          const data = await response.json();

          if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to send message");
          }

          toast({ title: "Message sent!", description: "We'll get back to you soon." });
          setFormData({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
          setErrors({});
        } catch (error) {
          toast({
            title: "Message failed",
            description: error instanceof Error ? error.message : "Please try again later.",
            variant: "destructive",
          });
        } finally {
          setSending(false);
        }
    };

  return (
    <>
        <Header />
        <section className="section-dark py-24 lg:py-32">
            <div className="container mx-auto px-4 text-center">
              <AnimatedSection>
                <p className="text-primary font-semibold text-sm mb-4 uppercase tracking-wide">Contact</p>
                <h1 className="text-4xl sm:text-5xl font-display font-bold text-hero-foreground mb-4">
                  Get in <span className="gradient-text">touch</span>
                </h1>
                <p className="text-hero-muted text-lg">Got a question? We'd love to hear from you.</p>
              </AnimatedSection>
            </div>
          </section>
        
          <section className="py-24 section-light">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="grid md:grid-cols-2 gap-12">
                <AnimatedSection>
                  <h2 className="text-2xl font-display font-bold mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <Input
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        maxLength={MAX_NAME_LENGTH}
                        autoComplete="name"
                        required
                      />
                      {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
                    </div>
                    <div className="space-y-1">
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        maxLength={MAX_EMAIL_LENGTH}
                        autoComplete="email"
                        inputMode="email"
                        required
                      />
                      {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
                    </div>
                    <div className="space-y-1">
                      <Input
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={(e) => updateField("subject", e.target.value)}
                        maxLength={MAX_SUBJECT_LENGTH}
                        required
                      />
                      {errors.subject ? <p className="text-sm text-red-500">{errors.subject}</p> : null}
                    </div>
                    <div className="space-y-1">
                      <Textarea
                        placeholder="Your message..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        maxLength={MAX_MESSAGE_LENGTH}
                        required
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{errors.message ? <span className="text-red-500">{errors.message}</span> : "Keep it clear and avoid sharing sensitive data."}</span>
                        <span>{formData.message.length}/{MAX_MESSAGE_LENGTH}</span>
                      </div>
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={sending}>
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </AnimatedSection>
        
                <AnimatedSection delay={0.1}>
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Mail className="text-primary" size={20} />
                        </div>
                        <h3 className="font-display font-semibold text-lg">Email us</h3>
                      </div>
                      <p className="text-muted-foreground text-sm">jakebpb1@gmail.com</p>
                    </div>
        
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <School className="text-primary" size={20} />
                        </div>
                        <h3 className="font-display font-semibold text-lg">For schools & partnerships</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        Want to bring Valuto to your school or organisation? We offer special pricing and dedicated support for educational institutions.
                      </p>
                      <p className="text-muted-foreground text-sm">jakebpb1@gmail.com</p>
                    </div>
        
                    <div>
                      <h3 className="font-display font-semibold text-lg mb-3">Follow us</h3>
                      <div className="flex gap-3">
                        <a 
                            key="Instagram" 
                            href="https://www.instagram.com/valutouk" 
                            className="px-4 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                            Instagram
                        </a>
                        
                        <a 
                            key="LinkedIn" 
                            href="https://www.linkedin.com/company/valutouk/posts/?feedView=all"
                            className="px-4 py-2 rounded-lg bg-muted text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                        >
                            LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        <Footer />
    </>
  );
}

function sanitizeFormData(formData: ContactFormData): ContactFormData {
  return {
    name: sanitizeFieldValue("name", formData.name),
    email: sanitizeFieldValue("email", formData.email),
    subject: sanitizeFieldValue("subject", formData.subject),
    message: sanitizeFieldValue("message", formData.message),
  };
}

function sanitizeFieldValue(field: keyof ContactFormData, value: string): string {
  const withoutNulls = value.replace(/\0/g, "");

  if (field === "message") {
    return withoutNulls
      .replace(/[^\S\r\n]+/g, " ")
      .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
      .slice(0, MAX_MESSAGE_LENGTH)
      .trim();
  }

  const normalized = withoutNulls
    .replace(/\s+/g, " ")
    .replace(/[\u0001-\u001F\u007F]/g, "")
    .trim();

  if (field === "email") {
    return normalized.slice(0, MAX_EMAIL_LENGTH).toLowerCase();
  }

  if (field === "name") {
    return normalized.slice(0, MAX_NAME_LENGTH);
  }

  return normalized.slice(0, MAX_SUBJECT_LENGTH);
}

function validateForm(formData: ContactFormData): ContactFormErrors {
  const nextErrors: ContactFormErrors = {};

  if (!formData.name) {
    nextErrors.name = "Name is required.";
  } else if (!/^[A-Za-z ,.'-]+$/.test(formData.name)) {
    nextErrors.name = "Name contains unsupported characters.";
  }

  if (!formData.email) {
    nextErrors.email = "Email is required.";
  } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!formData.subject) {
    nextErrors.subject = "Subject is required.";
  } else if (/[<>]/.test(formData.subject)) {
    nextErrors.subject = "Subject cannot contain angle brackets.";
  }

  if (!formData.message) {
    nextErrors.message = "Message is required.";
  } else if (formData.message.length < 10) {
    nextErrors.message = "Message must be at least 10 characters.";
  } else if (/[<>]/.test(formData.message)) {
    nextErrors.message = "Message cannot contain angle brackets.";
  }

  return nextErrors;
}
