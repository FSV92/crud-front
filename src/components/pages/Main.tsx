import "./Main.scss";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import News from "../widgets/News/News";
import Filter from "../widgets/Filter/Filter";
import Search from "../widgets/Search/Search";

const Main = observer(() => {
  return (
    <div className="main">
      <div className="main__container">
        <div className="main__wrap">
          <div className="main__wrap-filter">
            <Filter />
          </div>
          <div className="main__wrap-search">
            <Search />
          </div>
        </div>

        <News />
      </div>
    </div>
  );
});

export default Main;
