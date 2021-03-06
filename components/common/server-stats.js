import React from "react";
import { Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import numeral from "numeral";

const StatsURL = "https://galactus.automute.us";
export default class ServerStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      guilds: 0,
      activeGames: 0,
      totalGames: 0,
      totalUsers: 0,
    };
  }

  async fetchData() {
    try {
      const response = await fetch(StatsURL);
      const json = await response.json();
      this.setState({
        isLoaded: true,
        totalGuilds: json.totalGuilds,
        activeGames: json.activeGames,
        totalGames: json.totalGames,
        totalUsers: json.totalUsers,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  componentDidMount() {
    this.fetchData();
    this.interval = setInterval(() => {
      this.fetchData();
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      error,
      isLoaded,
      totalGuilds,
      activeGames,
      totalGames,
      totalUsers,
    } = this.state;

    if (error) {
      return (
        <div className="home-stats-wrapper">
          <StatCard label="Active Games" stat={"Very"} loaded={true} />
          <StatCard label="Servers" stat={"Such"} loaded={true} />
          <StatCard label="Users" stat={"Many"} loaded={true} />
          <StatCard label="Games Muted" stat={"Wow"} loaded={true} />
        </div>
      );
    } else {
      return (
        <Row className="home-stats-wrapper">
          <StatCard
            label="Servers"
            stat={totalGuilds}
            loaded={isLoaded}
            tooltip={true}
            placement="bottom"
            minValue={0}
          />
          <StatCard
            label="Active Games"
            stat={activeGames}
            loaded={isLoaded}
            tooltip={false}
            minValue={0}
          />
          <StatCard
            label="Users"
            stat={totalUsers}
            loaded={isLoaded}
            tooltip={true}
            placement="bottom"
            minValue={0}
          />
          <StatCard
            label="Games Muted"
            stat={totalGames}
            loaded={isLoaded}
            tooltip={true}
            placement="bottom"
            minValue={262000}
          />
        </Row>
      );
    }
  }
}

function StatCard(props) {
  const stat = props.stat + props.minValue;

  const content = (
    <div>
      <div className="stat-data">
        <div className={props.loaded ? "fadeIn" : "fadeOut"}>
          {numeral(stat).format('0a')}
        </div>
      </div>
      <div className="stat-label">{props.label}</div>
    </div>
  );

  const tooltip = (
    <OverlayTrigger
      placement={props.placement || "bottom"}
      delay={{ show: 100, hide: 0 }}
      trigger={["hover", "focus"]}
      overlay={
        <Tooltip className="stats-tooltip" id={props.label + "tooltip"}>
          {stat}
        </Tooltip>
      }
    >
      {content}
    </OverlayTrigger>
  );

  if (props.tooltip) {
    return (
      <Col xs={12} sm={6} className="stat-card p-4">
        {tooltip}
      </Col>
    );
  }

  return (
    <Col xs={12} sm={6} className="stat-card p-4">
      {content}
    </Col>
  );
}
