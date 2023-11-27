const createCardCollection = (collectionTitle) => {
  const collectionList = [];

  const getCollectionTitle = () => collectionTitle;

  const pushCardToCollection = (card) => {
    collectionList.push(card);
  };

  return { pushCardToCollection, getCollectionTitle };
};

const createCard = (imgUrl, imgTitle) => {
  return { imgUrl, imgTitle };
};
