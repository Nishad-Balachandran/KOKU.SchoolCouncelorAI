import { AppUser } from "@/types/domain";

export async function getCurrentUser(): Promise<AppUser> {
  // Placeholder auth until NextAuth/Clerk integration in a later step.
  return {
    id: "user_1",
    schoolId: "school_1",
    name: "Ashley Gaigher",
    email: "ashley.gaigher@koku.school",
    role: "COUNSELOR",
    schoolName: "NorthWest High School",
  };
}
