"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser, useAuth } from "@clerk/nextjs";
import { useUserProfile } from "@/lib/userContext";
import { UserProfile } from "@/lib/localStorage";
import { createOrUpdateUser } from "@/lib/api/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
  ChoiceboxItemDescription,
  ChoiceboxItemContent,
  ChoiceboxItemIndicator,
} from "@/components/ui/choicebox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const { updateProfile } = useUserProfile();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "student" as "student" | "teacher",
    age: "",
    school: "",
    grade: "",
    subject: "",
  });

  useEffect(() => {
    if (isLoaded && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [isLoaded, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 Submitting onboarding form...");

    try {
      const token = await getToken({ template: "default" });
      if (!token) throw new Error("No Clerk token found!");

      const profile: UserProfile = {
        userId: user?.id || "",
        name: formData.name,
        email: formData.email,
        role: formData.role,
        age: formData.age ? parseInt(formData.age) : undefined,
        school: formData.school,
        grade: formData.role === "student" ? formData.grade : undefined,
        subject: formData.role === "teacher" ? formData.subject : undefined,
        completedOnboarding: true,
        createdAt: new Date().toISOString(),
      };

      console.log("🧩 Profile to save:", profile);

      const savedProfile = await createOrUpdateUser(profile, token);
      console.log("✅ Profile saved:", savedProfile);

      updateProfile({ ...savedProfile.data, completedOnboarding: true });
      console.log("🔁 Redirecting to /dashboard...");
      router.push("/dashboard");
    } catch (err) {
      console.error("❌ Onboarding failed:", err);
      alert("Something went wrong while saving your profile. Check console logs!");
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50">
        <p className="text-gray-600 text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-valuto-green-50 via-white to-valuto-green-50 flex items-center justify-center p-4">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-valuto-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-valuto-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome to <span className="text-valuto-green-600">Valuto</span>
          </h1>
          <p className="text-gray-600">
            Let's set up your profile to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Full Name *
            </Label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 h-12 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              disabled
              value={formData.email}
              className="w-full px-4 py-3 h-12 border-2 border-gray-100 rounded-lg bg-gray-50 text-gray-500"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-semibold text-gray-700">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              min="11"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-4 py-3 h-12 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
              placeholder="Enter your age"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">
              I am a...
            </Label>
            <Choicebox
              value={formData.role}
              onValueChange={(value) =>
                setFormData({ ...formData, role: value as "student" | "teacher" })
              }
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <ChoiceboxItem value="student" className="border-2 hover:border-valuto-green-300">
                <ChoiceboxItemHeader>
                  <div className="text-4xl mb-3">🎓</div>
                  <ChoiceboxItemTitle className="text-xl font-bold text-gray-900">
                    Student
                  </ChoiceboxItemTitle>
                  <ChoiceboxItemDescription className="text-sm text-gray-600">
                    Learn about money and play educational games
                  </ChoiceboxItemDescription>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>

              <ChoiceboxItem value="teacher" className="border-2 hover:border-valuto-green-300">
                <ChoiceboxItemHeader>
                  <div className="text-4xl mb-3">👨‍🏫</div>
                  <ChoiceboxItemTitle className="text-xl font-bold text-gray-900">
                    Teacher
                  </ChoiceboxItemTitle>
                  <ChoiceboxItemDescription className="text-sm text-gray-600">
                    Create games and teach financial literacy
                  </ChoiceboxItemDescription>
                </ChoiceboxItemHeader>
                <ChoiceboxItemContent>
                  <ChoiceboxItemIndicator />
                </ChoiceboxItemContent>
              </ChoiceboxItem>
            </Choicebox>
          </div>

          {/* School */}
          <div className="space-y-2">
            <Label htmlFor="school" className="text-sm font-semibold text-gray-700">
              School/Institution
            </Label>
            <Input
              id="school"
              type="text"
              value={formData.school}
              onChange={(e) => setFormData({ ...formData, school: e.target.value })}
              className="w-full px-4 py-3 h-12 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
              placeholder="Enter your school name"
            />
          </div>

          {/* Grade (Student) */}
          {formData.role === "student" && (
            <div className="space-y-2">
              <Label htmlFor="grade" className="text-sm font-semibold text-gray-700">
                Grade/Year
              </Label>
              <Select
                value={formData.grade}
                onValueChange={(value) =>
                  setFormData({ ...formData, grade: value })
                }
              >
                <SelectTrigger className="w-full px-4 py-3 h-12 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {["Year 7", "Year 8", "Year 9", "Year 10", "Year 11", "Year 12", "Year 13"].map(
                    (year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Subject (Teacher) */}
          {formData.role === "teacher" && (
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                Subject
              </Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-4 py-3 h-12 border-2 border-gray-200 rounded-lg focus:border-valuto-green-600"
                placeholder="e.g., Mathematics, Economics"
              />
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-valuto-green-600 hover:bg-valuto-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Complete Setup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
