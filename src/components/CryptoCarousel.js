import React from 'react';

const CryptoCarousel = () => {
  const cryptos = [
    {
      name: 'Bitcoin (BTC)',
      description: 'Bitcoin is the first and most well-known cryptocurrency, created in 2009. It introduced the concept of decentralized digital currency.',
      image: '/imgs/bitcoin-btc-logo.png',
    },
    {
      name: 'Ethereum (ETH)',
      description: 'Ethereum is a decentralized platform that enables smart contracts and decentralized applications (dApps).',
      image: '/imgs/ethereum-eth-logo.png',
    },
    {
      name: 'Solana (SOL)',
      description: 'Solana is known for its high-speed transactions and low fees, making it a favorite for DeFi and NFTs.',
      image: '/imgs/solana-sol-logo.png',
    },
    {
      name: 'Binance Coin (BNB)',
      description: 'BNB powers the Binance ecosystem and is used for trading fee discounts and DeFi applications.',
      image: '/imgs/binance-coin-bnb-logo.png',
    },
    {
      name: 'Ripple (XRP)',
      description: 'Ripple is a payment protocol that enables fast and inexpensive international transactions.',
      image: '/imgs/xrp-xrp-logo.png',
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Top Cryptocurrencies</h2>
      <div id="cryptoCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {cryptos.map((crypto, index) => (
            <div key={crypto.name} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <div className="d-flex flex-column align-items-center">
                <img
                  src={crypto.image}
                  className="d-block mb-3"
                  alt={crypto.name}
                  style={{ maxWidth: '150px', height: 'auto' }}
                />
                <h4>{crypto.name}</h4>
                <p className="text-center w-75">{crypto.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#cryptoCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#cryptoCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default CryptoCarousel;
