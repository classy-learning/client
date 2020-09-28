import { Icon, Popup, Statistic } from "semantic-ui-react";
import React, { useContext } from "react";

import PropTypes from "prop-types";
import StudentContext from "bits/customer/StudentContext";

const Prices = (props) => {
  const student = useContext(StudentContext);

  const priceStats = [
    {
      key: "subscription",
      price: "$10",
      unit: "flat rate",
      popupContent: `This flat fee secures ${student.givenName}'s fully-configured virtual desktop.`,
    },
    {
      key: "lesson",
      price: "$50",
      unit: "per lesson",
      popupContent: `We pay competetively hourly rates to attract top-quality instructors.`,
    },
    {
      key: "desktop hour",
      price: "$1",
      unit: "per desktop hour",
      popupContent: `Connect from anywhere. Pay only for what ${student.givenName} uses each month.`,
    },
  ];

  return (
    <Statistic.Group size="mini" widths={priceStats.length}>
      {priceStats.map((stat) => (
        <Statistic key={stat.key}>
          <Statistic.Value>{stat.price}</Statistic.Value>
          <Statistic.Label>
            {stat.unit}{" "}
            <Popup
              content={stat.popupContent}
              position="top center"
              trigger={<Icon name="info circle"></Icon>}
            ></Popup>
          </Statistic.Label>
        </Statistic>
      ))}
    </Statistic.Group>
  );
};

export default Prices;
