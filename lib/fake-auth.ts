export interface User {
  id: string;
  email: string;
  name: string;
  role: "Student" | "Teacher" | "Admin";
  avatar?: string;
}

// Fake users database
export const FAKE_USERS: Record<string, { password: string; user: User }> = {
  "student@onyx.edu": {
    password: "Student123!",
    user: {
      id: "1",
      email: "student@onyx.edu",
      name: "Alice Student",
      role: "Student",
      avatar: "/images/student-avatar.webp",
    },
  },

  "teacher@onyx.edu": {
    password: "Teacher123!",
    user: {
      id: "2",
      email: "teacher@onyx.edu",
      name: "Bob Teacher",
      role: "Teacher",
      avatar: "/images/teacher-avatar.webp",
    },
  },

  "admin@onyx.edu": {
    password: "Admin123!",
    user: {
      id: "3",
      email: "admin@onyx.edu",
      name: "Lê Văn Cường",
      role: "Admin",
      avatar: "/images/admin-avatar.webp",
    },
  },
};

export function authenticateUser(email: string, password: string): User | null {
  const userCord = FAKE_USERS[email];

  if (userCord && userCord.password === password) {
    return userCord.user;
  }

  return null;
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;

  const userStr = localStorage.getItem("currentUser");

  return userStr ? JSON.parse(userStr) : null;
}

export function setCurrentUser(user: User): void {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function logOut(): void {
  localStorage.removeItem("currentUser");
}
