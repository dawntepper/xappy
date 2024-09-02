import firestore from '@react-native-firebase/firestore';

export interface Article {
  id: string;
  title: string;
  tags: string[];
  url: string;
}

export interface Collection {
  id: string;
  name: string;
  articles: string[]; // Array of article IDs
}

export const fetchArticles = async (): Promise<Article[]> => {
  const articlesSnapshot = await firestore().collection('articles').get();
  return articlesSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Article[];
};

export const fetchCollections = async (): Promise<Collection[]> => {
  const collectionsSnapshot = await firestore().collection('collections').get();
  return collectionsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Collection[];
};

export const fetchCollectionsWithArticles = async (): Promise<(Collection & { fullArticles: Article[] })[]> => {
  const collections = await fetchCollections();
  const articlesSnapshot = await firestore().collection('articles').get();
  const articlesMap = new Map(articlesSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() } as Article]));

  return collections.map(collection => ({
    ...collection,
    fullArticles: collection.articles.map(articleId => articlesMap.get(articleId)).filter(Boolean) as Article[]
  }));
};

export const fetchCollectionWithArticles = async (collectionId: string): Promise<(Collection & { fullArticles: Article[] }) | null> => {
  const collectionDoc = await firestore().collection('collections').doc(collectionId).get();
  const collectionData = collectionDoc.data() as Collection | undefined;
  
  if (collectionData && collectionData.articles) {
    const articlePromises = collectionData.articles.map(articleId => 
      firestore().collection('articles').doc(articleId).get()
    );
    const articleDocs = await Promise.all(articlePromises);
    const articles = articleDocs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Article[];
    
    return {
      id: collectionDoc.id,
      name: collectionData.name,
      articles: collectionData.articles,
      fullArticles: articles
    };
  }
  
  return null;
};