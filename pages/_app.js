import '@/styles/globals.css';
import { wrapper } from '@/src/store/store';

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
