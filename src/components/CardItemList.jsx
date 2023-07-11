import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [lastOpenedCard, setLastOpenedCard] = useState(null);

  const onClickHandler = (currentId) => {
    if (lastOpenedCard) {
      const clickedIndex = cardList.findIndex((itm) => itm.id === currentId);
      setCardValue(currentId, true);
      if (lastOpenedCard.name !== cardList[clickedIndex].name) {
        setTimeout(() => {
          setCardValue(currentId, false);
          setCardValue(lastOpenedCard.id, false);
        }, 1000);
      }
      setLastOpenedCard(null);
    } else {
      setCardValue(currentId, true);
      setLastOpenedCard(getCardValue(currentId));
    }
  };

  function getCardValue(currentId) {
    const cardIndex = cardList.findIndex((itm) => itm.id === currentId);
    return cardList[cardIndex];
  }

  function setCardValue(currentId, value) {
    const tempCardList = [...cardList];
    const clickedIndex = tempCardList.findIndex((itm) => itm.id === currentId);
    tempCardList[clickedIndex].isOpen = value;
    setCardList(tempCardList);
  }

  return (
    <div className="card-item-list">
      {cardList.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
