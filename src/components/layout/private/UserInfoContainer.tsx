"use client";

import { useGetMe } from "@/hooks";
import { useUserStore } from "@/store/useUserStore";
import Image from "next/image";

const UserInfoContainer = () => {
  const { data, isPending } = useGetMe();

  const activeUser = data?.data;


  return (
    <div className="flex items-center gap-2">
      <div className="text-right">
        <h1 className="text-sm font-semibold text-gray-500">{activeUser.name}</h1>
        <h1 className="text-xs font-semibold text-gray-400">{activeUser.email}</h1>
      </div>
      <div>
        <div className="relative size-10 rounded-full overflow-hidden bg-muted border border-border/60">
          <Image
            src={
              activeUser.profileURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                activeUser.name || "User",
              )}&background=ea580c&color=fff&bold=true`
            }
            alt={activeUser.name || "User"}
            fill
            sizes="32px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInfoContainer;
