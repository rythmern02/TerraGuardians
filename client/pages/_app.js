import { ThirdwebProvider } from "@thirdweb-dev/react";
import Navbar from "../components/Navbar";
import "../styles/globals.css";

const activeChain = "mumbai";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
    >
      <Navbar />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
// secret key : Klb1PrLbfG40JoOyC1UynB40VcuXXPv9W-5Rcgt9lVynXKb7zPd5h-I9Eczc0oFE_J-fH3Xi_zgXM4SrM9cg6A
