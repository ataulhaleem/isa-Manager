import Image from "next/image";
import styles from "./page.module.css";
import { MetadataProvider } from "./contexts/MetadataContext";

export default function Home() {
  return (
    <MetadataProvider>
    <main className={styles.main}>
    </main>
    </MetadataProvider>
  );
}
