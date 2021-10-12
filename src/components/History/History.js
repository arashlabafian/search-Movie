import React from "react";
import "./history.css";

const History = (props) => {
  const { history, deleteHistory } = props;

  return (
    <>
      <div className="search__header">
        <label className="history__label">Search history</label>
        <span
          className="filter__delete-history"
          onClick={() => deleteHistory()}
        >
          Clear search history
        </span>
      </div>
      <ul className="list-group">
        {history.map((item) => (
          <li className="list-group-item" key={item.id}>
            <span className="glyphicon glyphicon-ok icon" aria-hidden="true">
              {item.value}
            </span>
            <div className="date">{item.date.toLocaleString()}</div>
            <div className="close" onClick={() => deleteHistory(item.id)}></div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default History;
