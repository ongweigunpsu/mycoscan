import './globals.css';

export const metadata = {
  title: 'MycoScan — Open Platform for Mushroom Disease Research',
  description: 'An open-access platform for mushroom disease data, AI-assisted identification, and integrated pest management decision support. A Penn State Mushroom Research Center initiative.',
  keywords: 'mushroom disease, Agaricus bisporus, dry bubble, wet bubble, IPM, decision support, Penn State, MRC',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
