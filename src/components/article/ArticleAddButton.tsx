import React, { useCallback } from "react";
import { updateArticle } from "../../api/article";
import { Button, useStyleConfig } from "@chakra-ui/react";

import { useRouter } from "next/router";
import { ObjectID } from "bson";

interface ArticleAddButtonProps {
  mode: string;
  title: string;
  data: any;
}
const ArticleAddButton = ({ mode, title, data }: ArticleAddButtonProps) => {
  const router = useRouter();

  const { articleId } = router.query;
  const { heading, content } = data;
  const styles = useStyleConfig("Button", { variants: "outline" });
  const handleAddArticle = async () => {
    if (mode === "draft") {
      // let res = await addArticle();
      if (articleId) {
        updateArticle({ id: articleId, heading, content });
      } else {
        const id = new ObjectID();
        updateArticle({ id: id.toString(), heading, content });
        router.query.articleId = id.toString();
        router.push(router);
      }
    } else {
    }
  };

  return (
    <>
      <Button
        variant={mode === "draft" ? "outline" : "solid"}
        onClick={handleAddArticle}
      >
        {title}
      </Button>
    </>
  );
};

export default ArticleAddButton;
