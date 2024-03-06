"use client"
import "./globals.css";
import Header from "./components/Header";
import { Container } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Container maxWidth='ld'>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  );
}
