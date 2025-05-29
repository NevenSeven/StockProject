import React from 'react';
import { useEffect, useState } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "d0pnja1r01qgccua8n8gd0pnja1r01qgccua8n90";
  const symbol = "AAPL"; // Change this to any stock ticker you want
  const today = new Date().toISOString().split("T")[0];
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const fetchNews = async () => {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${oneWeekAgo}&to=${today}&token=${API_KEY}`
      );
      const data = await res.json();
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="p-4">Loading stock news...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Stock News for {symbol}</h1>
      <div className="space-y-4 max-h-[600px] overflow-y-auto">
        {articles.length === 0 ? (
          <p>No news found.</p>
        ) : (
          articles.map((article, idx) => (
            <div key={idx} className="p-4 border rounded shadow">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-semibold">{article.headline}</h2>
                <p className="text-sm text-gray-600">{article.summary}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(article.datetime * 1000).toLocaleString()}
                </p>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default News;
