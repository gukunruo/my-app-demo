interface CardItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  createTime: string;
}

// 生成随机标签
const generateTags = (): string[] => {
  const allTags = ['前端开发', '后端开发', '移动开发', '人工智能', '大数据', '云计算', '区块链', '物联网', '网络安全', 'DevOps'];
  const count = Math.floor(Math.random() * 3) + 1; // 1-3个标签
  const tags: string[] = [];
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allTags.length);
    if (!tags.includes(allTags[randomIndex])) {
      tags.push(allTags[randomIndex]);
    }
  }
  return tags;
};

// 生成随机日期
const generateDate = (): string => {
  const start = new Date(2023, 0, 1).getTime();
  const end = new Date().getTime();
  const randomDate = new Date(start + Math.random() * (end - start));
  return randomDate.toISOString().split('T')[0];
};

// 生成mock数据
export const generateMockData = (count: number = 100): CardItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    title: `技术文章 ${index + 1}`,
    description: `这是一篇关于${generateTags()[0]}的技术文章，主要介绍了相关技术的最新发展和应用实践。文章内容深入浅出，适合各个层次的开发者阅读。`,
    imageUrl: `https://picsum.photos/300/200?random=${index + 1}`,
    tags: generateTags(),
    createTime: generateDate()
  }));
};

export const mockData = generateMockData();
