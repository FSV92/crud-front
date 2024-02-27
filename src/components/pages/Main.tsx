import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import News from "../widgets/News/News";

const Main = observer(() => {
  return (
    <div className="main">
      <News />
    </div>
  );
});

export default Main;
