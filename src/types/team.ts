export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "owner" | "admin" | "member";
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
  createdAt: Date;
}
