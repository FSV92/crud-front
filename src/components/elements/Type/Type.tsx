import "./Type.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { PostModelType } from "../../../stores/PostsStore";
import PostsStore from "../../../stores/PostsStore";

const Type: React.FC<{ type: PostModelType["type"] }> = (props) => {
  const { type } = props;
  const [typeName, setTypeName] = useState<string>(null);

  useEffect(() => {
    (async () => {
      const typeObj = type.target_id && (await PostsStore.getTaxByID("tip", type.target_id));
      setTypeName(typeObj[0].name[0].value);
    })();
  }, []);

  return (
    <Link to="/NewsDetail" className="type">
      {typeName}
    </Link>
  );
};

export default Type;
