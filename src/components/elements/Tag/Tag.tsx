import "./Tag.scss";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import PostsStore from "../../../stores/PostsStore";

const Tag: React.FC<{ tid: number }> = observer((props) => {
  const { tid } = props;
  const [tagName, setTagName] = useState<string>(null);

  useEffect(() => {
    (async () => {
      const tagObj = tid && (await PostsStore.getTaxByID("tags", tid));

      setTagName(tagObj[0].name[0].value);
    })();
  }, []);

  return <div className="tag">{tagName}</div>;
});

export default Tag;
