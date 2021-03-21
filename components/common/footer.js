import React from "react";

import styles from "./footer.module.css";

const global_enable = false;

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  onToggle(e) {
    this.setState({
      effectActive: e.target.checked && global_enable,
    });
  }
  render() {
    return (
      <footer className={`${styles.footer} ${styles.muted_effect} text-right`}>
      </footer>
    );
  }
}
