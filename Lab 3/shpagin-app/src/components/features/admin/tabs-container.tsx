import { ReactNode } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsContainerProps {
  tabs: {
    name: string;
    value: string;
    content: ReactNode;
  }[];
  defaultValue?: string;
}

export function TabsContainer({ tabs, defaultValue }: TabsContainerProps) {
  return (
    <div className="flex flex-1 flex-col">
      <Tabs defaultValue={defaultValue} className="w-full flex-1">
        <div className="border-border no-scrollbar w-full overflow-x-auto border-b-2">
          <TabsList className="bg-background flex justify-end rounded-none border-b-0 p-0">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="bg-background dark:data-[state=active]:bg-background dark:data-[state=active]:border-primary data-[state=active]:border-primary h-full rounded-none border-x-0 border-t-0 border-b-2 px-6 text-lg data-[state=active]:shadow-none"
              >
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {tabs.map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className="no-scrollbar flex w-full flex-1"
          >
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
