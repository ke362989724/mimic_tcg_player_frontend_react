import { getCategoryList } from "@/api-service/main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function AppSidebar() {
  const cardCategoryList = useQuery({
    queryKey: ["cardCategoryList"],
    queryFn: async () => {
      return await getCategoryList();
    },
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    cardCategoryList.data && (
      <Sidebar>
        <SidebarHeader className="flex border-b-2">
          <div className="p1">Card Category</div>
        </SidebarHeader>
        <SidebarContent className="gap-0">
          {cardCategoryList.data.map((el, index) => {
            return (
              <Link
                to="/"
                className="hover:bg-accent border-b p-3 duration-200 ease-in-out"
                key={el.name + index}
              >
                <div>{el.name}</div>
              </Link>
            );
          })}
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  );
}

export default AppSidebar;
