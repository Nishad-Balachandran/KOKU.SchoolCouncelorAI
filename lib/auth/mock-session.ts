import { AppUser } from "@/types/domain";

export async function getCurrentUser(): Promise<AppUser> {
  // Placeholder auth until NextAuth/Clerk integration in a later step.
  return {
    id: "user_1",
    schoolId: "school_1",
    name: "Ava Thompson",
    email: "ava.thompson@koku.school",
    role: "COUNSELOR",
    schoolName: "North Valley High School",
  };
}
