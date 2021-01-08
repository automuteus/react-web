import Head from "next/head";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

import Header from "./header";
import Footer from "./footer";
import styles from "./layout.module.css";

export default function Layout({ children, home }) {
  return (
    <Container fluid className={styles.main_container}>
      <Head>
        {/* HTML Meta Tags */}
        <title>AutoMuteUs</title>
        <meta
          name="description"
          content="AutoMuteUs is a Discord Bot that collects Among Us game data to automatically mute/unmute players during games!"
        />
        <meta name="theme-color" content="#7289DA" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="AutoMuteUs" />
        <meta
          itemProp="description"
          content="AutoMuteUs is a Discord Bot that collects Among Us game data to automatically mute/unmute players during games!"
        />
        <meta
          itemProp="image"
          content={`${
            process.env.NEXTAUTH_URL
          }/public/assets/img/logo_embed.png`}
        />

        {/* Discord/Facebook Meta Tags */}
        <meta property="og:url" content={process.env.NEXTAUTH_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AutoMuteUs" />
        <meta
          property="og:description"
          content="AutoMuteUs is a Discord Bot that collects Among Us game data to automatically mute/unmute players during games!"
        />
        <meta
          property="og:image"
          content={`${
            process.env.NEXTAUTH_URL
          }/public/assets/img/logo_embed.png`}
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content="AutoMuteUs" />
        <meta
          name="twitter:description"
          content="AutoMuteUs is a Discord Bot that collects Among Us game data to automatically mute/unmute players during games!"
        />
        <meta
          name="twitter:image"
          content={`${
            process.env.NEXTAUTH_URL
          }/public/assets/img/logo_embed.png`}
        />
      </Head>

      <Header />
      <motion.main
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        id="main-content"
        className=" d-flex flex-lg-row flex-column align-items-center p-3"
      >
        {children}
      </motion.main>
      <Footer />
    </Container>
  );
}
