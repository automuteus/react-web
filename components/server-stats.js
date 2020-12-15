import React from "react";

import styles from "./server-stats.module.css";

const StatsURL = "https://stats.automute.us/stats/api"

export default class ServerStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      guilds: 0,
      activeGames: 0,
    };
  }

  async fetchData() {
    try {
      const response = await fetch(StatsURL);
      const json = await response.json();
      this.setState({
        isLoaded: true,
        guilds: json.totalGuilds,
        activeGames: json.activeGames,
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
    }, 7000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const { error, isLoaded, guilds, activeGames } = this.state;

    if (error) {
      return (
        <div
          id="home-stats"
          className="d-flex align-content-center align-content-lg-start flex-column flex-lg-row"
        >
          <StatCard label="Servers" stat={"Such"} loaded={true} />
          <StatCard label="Active Games" stat={"Very"} loaded={true} />
        </div>
      );
    } else {
      return (
        <div
          className={`d-flex align-content-center align-content-lg-start flex-column flex-lg-row ${styles.home_stats}`}
        >
          <StatCard label="Servers" stat={guilds} loaded={isLoaded} />
          <StatCard label="Active Games" stat={activeGames} loaded={isLoaded} />
        </div>
      );
    }
  }
}

function StatCard(props) {
  return (
    <div className={`stat-card p-3 p-lg-5 pb-0 ${styles.stat_card}`}>
      <div className={styles.stat_data}>
        <div className={props.loaded ? styles.fadeIn : styles.fadeOut}>{props.stat}</div>
      </div>
      <div className={styles.stat_label}>{props.label}</div>
    </div>
  );
}
