export type Status = "Pending" | "Approved" | "Rejected";

export type Role = "ADMIN" | "SUB_ADMIN";

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: number;
  name: string;
  email: string;
  created: string;
  details: string;
  status: Status;
}
