// Navbar.js
import React from 'react';
import CryptoCarousel from './CryptoCarousel';

const CryptoContent = () => {
  return (
    
    <div className="container my-5">

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">What is Cryptocurrency?</h2>
              <p className="card-text">
                Cryptocurrency is a digital form of currency that uses cryptography for security. Unlike traditional money, cryptocurrencies are typically decentralized and operate on blockchain technology, which is a distributed ledger maintained by a network of computers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">History of Cryptocurrency</h2>
              <p className="card-text">
                Bitcoin, created in 2009 by the anonymous figure Satoshi Nakamoto, was the first cryptocurrency. It introduced the idea of decentralized digital money without the need for intermediaries like banks.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h2 className="card-title">How Blockchain Works</h2>
              <p className="card-text">
                Blockchain is a chain of blocks, each containing data, a timestamp, and a cryptographic hash of the previous block. This makes the data immutable and secure. It’s the foundation of most cryptocurrencies.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-5">
        <div className="col">
          <h2 className="text-center mb-4">Explore Cryptocurrency</h2>
          <CryptoCarousel />
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">How to Buy Crypto</h2>
              <p className="card-text">
                Cryptocurrencies can be bought through exchanges like Coinbase, Binance, or Kraken. Users create an account, verify their identity, deposit money, and then trade crypto assets.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Crypto Wallets</h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Hot Wallets:</strong> Connected to the internet, like MetaMask or Trust Wallet.</li>
                <li className="list-group-item"><strong>Cold Wallets:</strong> Offline storage, like Ledger or Trezor hardware wallets.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Crypto vs. Traditional Currency</h2>
              <p className="card-text">
                Traditional currency is government-issued and regulated. Cryptocurrency operates on decentralized networks and is not controlled by any central authority, offering more privacy and lower fees, but with higher volatility and risk.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col">
          <div className="card bg-light">
            <div className="card-body">
              <h2 className="card-title">Conclusion</h2>
              <p className="card-text">
                Cryptocurrency is transforming how people think about money and finance. With growing adoption and innovation, it plays a crucial role in the future of global economics and technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoContent;

    