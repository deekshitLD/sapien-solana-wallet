import React, { useEffect } from "react";
import { useRouter } from "next/router";

const protectedRoutes = ["/addArticle", "/articleList"];

const WithAuth = (props: any) => {
  const router = useRouter();
  useEffect(() => {
    if (protectedRoutes.includes(router.pathname)) {
      if (!localStorage.getItem("token")) {
        router.push("/");
      }
    }
  }, [router.pathname]);

  return <>{props.children}</>;
};

export default WithAuth;
