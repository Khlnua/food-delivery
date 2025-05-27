import { UserContextProvider } from "@/provider/UserProvider";
import { PropsWithChildren } from "react";

const UserPage = ({ children }: PropsWithChildren) => {
  return (
    <UserContextProvider>
      <div>{children}</div>
    </UserContextProvider>
  );
};

export default UserPage;
