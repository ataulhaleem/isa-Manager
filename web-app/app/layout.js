"use client"

import "./globals.css";
import Header from "./components/Header";
import { Box, Container } from '@mui/material';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Container>
        <Header />
        {children}
        </Container>
        </body>
    </html>
  );
}


// "use client"
// import { Box, Container } from '@mui/material';
// import Header from './components/Header';

// export default function RootLayout({ children }) {
  
//   return (
//     <>
//       <Container disableGutters>
//         <Box sx={{ backgroundColor: '#e5eff7', minHeight: '100vh' }}>
//           <Header />
//           {children}
//         </Box>
//       </Container>
//     </>
//   );
// }


