import React, { useEffect, useState } from "react";
import { useAnswers } from "../AnswersContext";
import { Link } from "react-router-dom";

type Card = {
  id: string;
  title: string;
  content?: string;
  img?: string;
  price?: string;
  subtitle?: string;
};

function Result() {
  const { answers, resetAnswers } = useAnswers();
  const [products, setProducts] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [followedCards, setFollowedCards] = useState<string[]>([]);

  const staticCards: Card[] = [
    {
      id: "routine",
      title: "Daily routine",
      content:
        "Perfect for if you're looking for soft, nourished skin, our moisturizing body washes are made with skin-natural nutrients that work with your skin to replenish moisture. With a light formula, the bubbly lather leaves your skin feeling cleansed and cared for. And by choosing relaxing fragrances you can add a moment of calm to the end of your day.",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://jeval.com.au/collections/hair-care/products.json?page=1"
        );
        if (!response.ok) throw new Error("Network response failed");

        const data = await response.json();
        const all = data.products;

        const randomProducts = all
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map((product: any) => ({
            id: product.id.toString(),
            title: product.title,
            img: product.images[0]?.src || "",
            price: `$${product.variants[0]?.price || "0.00"}`,
          }));

        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const answerCards: Card[] = Object.entries(answers).map(([key, value]) => ({
    id: key,
    title: `Question ${key}`,
    subtitle: "Your answer(s):",
    content: Array.isArray(value) ? value.join(", ") : value,
  }));

  const allCards: Card[] = [...staticCards, ...products, ...answerCards];

  const cardsPerView = 3;
  const totalCards = allCards.length;
  const maxPage =
    totalCards - cardsPerView >= 0 ? totalCards - cardsPerView : 0;
  const totalDots = maxPage + 1;

  const handlePrev = () => {
    setPage((p) => (p === 0 ? 0 : p - 1));
  };

  const handleNext = () => {
    setPage((p) => (p === maxPage ? maxPage : p + 1));
  };

  const handleFollow = (cardId: string) => {
    setFollowedCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  return (
    <div style={{ height: "110vh" }}>
      <div className="result-container">
        <div className="inner-container">
          <h1>Build your everyday self care routine.</h1>
          <p>
            Perfect for if you're looking for soft, nourished skin, our
            moisturizing body washes are made with skin-natural nutrients that
            work with your skin to replenish moisture. With a light formula, the
            bubbly lather leaves your skin feeling cleansed and cared for. And
            by choosing relaxing fragrances you can add a moment of calm to the
            end of your day.
          </p>
          <Link to="/" className="btn-retake" onClick={() => resetAnswers()}>
            Retake the quiz
          </Link>
        </div>
      </div>

      <div className="carousel-wrapper">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          aria-label="Previous card"
          className="arrow-btn left-arrow"
        >
          ◁
        </button>
        <div className="carousel">
          <div
            className="cards-container"
            style={{
              transform: `translateX(-${(page * 100) / cardsPerView}%)`,
            }}
          >
            {allCards.map((card) => (
              <div className="card" key={card.id}>
                {card.img && (
                  <div
                    className="card-img-container"
                    style={{
                      backgroundImage: `url(${card.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "10px",
                      height: "400px",
                      position: "relative",
                    }}
                  >
                    <button
                      className="follow-button"
                      onClick={() => handleFollow(card.id)}
                    >
                      <i
                        className={`fa-heart ${
                          followedCards.includes(card.id)
                            ? "fas followed"
                            : "far"
                        }`}
                      ></i>
                    </button>
                  </div>
                )}
                <h3>{card.title}</h3>
                {card.subtitle && <h4>{card.subtitle}</h4>}
                <p>{card.content || card.price}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={page === maxPage}
          aria-label="Next card"
          className="arrow-btn right-arrow"
        >
          ▷
        </button>
      </div>
      <div className="dots-container">
        {Array.from({ length: totalDots }).map((_, i) => (
          <span
            key={i}
            className={`dot ${page === i ? "active" : ""}`}
            onClick={() => setPage(i)}
            role="button"
            tabIndex={0}
            aria-label={`Go to page ${i + 1}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setPage(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Result;
