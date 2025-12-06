import { Suspense } from "react";

import { UserProfileContent } from "@/components/features/user/profile";
import { ContentContainer } from "@/components/layout";
import { LoadingFallback } from "@/components/loading-fallback";

export default async function ProfilePage() {
  return (
    <ContentContainer title="Профиль">
      <Suspense fallback={<LoadingFallback className="flex-1" />}>
        <UserProfileContent />
      </Suspense>
    </ContentContainer>
  );
}
