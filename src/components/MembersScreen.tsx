import { Plus, ChevronRight, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

interface Member {
  id: string;
  name: string;
  email: string;
  role: "owner" | "member" | "viewer";
  initials: string;
}

export function MembersScreen() {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Suat Keskin",
      email: "suat@example.com",
      role: "owner",
      initials: "SK",
    },
  ]);

  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRoleDrawerOpen, setIsRoleDrawerOpen] = useState(false);
  const [isRemoveAlertOpen, setIsRemoveAlertOpen] = useState(false);

  const getRoleLabel = (role: string) => {
    if (role === "owner") return "Admin";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  const handleMemberClick = (member: Member) => {
    setSelectedMember(member);
    setIsDrawerOpen(true);
  };

  const handleChangeRoleClick = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setIsRoleDrawerOpen(true), 300);
  };

  const handleRemoveClick = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setIsRemoveAlertOpen(true), 300);
  };

  const handleConfirmRemove = () => {
    if (selectedMember) {
      setMembers(members.filter(m => m.id !== selectedMember.id));
      setSelectedMember(null);
    }
    setIsRemoveAlertOpen(false);
  };

  const handleRoleSelect = (newRole: "owner" | "member" | "viewer") => {
    if (selectedMember) {
      setMembers(members.map(m =>
        m.id === selectedMember.id ? { ...m, role: newRole } : m
      ));
      setSelectedMember({ ...selectedMember, role: newRole });
    }
    setIsRoleDrawerOpen(false);
  };

  const roles = [
    {
      id: "owner",
      name: "Admin",
      emoji: "👑",
      description: "Full access. Can manage inventory, members, and team settings.",
    },
    {
      id: "member",
      name: "Member",
      emoji: "👤",
      description: "Can add and edit inventory data. No access to admin-only settings.",
    },
    {
      id: "viewer",
      name: "Viewer",
      emoji: "👁️",
      description: "View-only access. Cannot add, edit, or delete anything.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 space-y-4">
        {/* Members List */}
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => handleMemberClick(member)}
            >
              <Avatar className="w-10 h-10 bg-teal-600">
                <AvatarFallback className="bg-teal-600 text-white">
                  {member.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-gray-900">{member.name}</div>
                <p className="text-sm text-gray-500">{getRoleLabel(member.role)}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Member Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="bottom" className="h-auto" aria-describedby={undefined} showClose={false}>
          <SheetHeader className="gap-0">
            <SheetTitle className="text-2xl">Member Settings</SheetTitle>
          </SheetHeader>
          {selectedMember && (
            <div className="py-4 space-y-2">
              <button 
                className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                onClick={handleChangeRoleClick}
              >
                <span className="text-gray-900">Change Role</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                onClick={handleRemoveClick}
              >
                <span className="text-red-600">Remove from Team</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Change Role Drawer */}
      <Sheet open={isRoleDrawerOpen} onOpenChange={setIsRoleDrawerOpen}>
        <SheetContent side="bottom" className="h-auto" aria-describedby={undefined} showClose={false}>
          <SheetHeader className="gap-0">
            <SheetTitle className="text-2xl">Change Role</SheetTitle>
          </SheetHeader>
          {selectedMember && (
            <div className="py-4 space-y-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  className="w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors rounded-lg text-left"
                  onClick={() => handleRoleSelect(role.id as "owner" | "member" | "viewer")}
                >
                  <div className="text-2xl">{role.emoji}</div>
                  <div className="flex-1">
                    <div className="text-gray-900 mb-1">{role.name}</div>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                  {selectedMember.role === role.id && (
                    <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-1" />
                  )}
                </button>
              ))}
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Remove Member Alert */}
      <AlertDialog open={isRemoveAlertOpen} onOpenChange={setIsRemoveAlertOpen}>
        <AlertDialogContent className="max-w-[320px] rounded-2xl">
          <AlertDialogHeader className="text-center gap-2">
            <AlertDialogTitle className="text-xl">Remove Member</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              {selectedMember && `Remove '${selectedMember.name}' from this team?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-2 mt-2">
            <AlertDialogCancel className="flex-1 m-0 bg-gray-200 hover:bg-gray-300 border-0">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmRemove} className="flex-1 bg-blue-600 hover:bg-blue-700">OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}