"use client";

import UserProfile from "@/components/UserProfile/UserProfile";

const ProfilePage: React.FC = () => {
  // Example user data (replace this with your actual user fetching logic)
  const user = {
    id: "",
    username: "",
    email: "",
  };

  return <UserProfile user={user} />;
};

export default ProfilePage;
