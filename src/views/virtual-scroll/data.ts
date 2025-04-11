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
  const allTags = ['Vue', 'React', 'Angular', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'Go', 'Ruby'];
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
    title: `Card Title ${index + 1}`,
    description: `This is a description for card ${index + 1}. It contains some sample text to demonstrate the card content.`,
    imageUrl: `https://picsum.photos/300/200?random=${index + 1}`,
    tags: generateTags(),
    createTime: generateDate()
  }));
};

export const mockData = generateMockData();
