import { getCategoryList } from "@/api-service/category-list";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { CardCategoryProp } from "@/interface/card-category-list";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function AppSidebar() {
  const { data } = useQuery({
    queryKey: ["cardCategoryList"],
    queryFn: async () => {
      return await getCategoryList();
    },
    gcTime: 1000 * 60 * 60 * 24,
    staleTime: 1000 * 60 * 60 * 24,
  });

  return (
    <Sidebar>
      <SidebarHeader className="flex border-b-2">
        <div className="title">Card Category</div>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data?.data.map((el: CardCategoryProp) => {
          return (
            <Link
              to="/"
              className="hover:bg-accent border-b p-3 duration-200 ease-in-out"
            >
              <div>{el.name}</div>
            </Link>
          );
        })}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
