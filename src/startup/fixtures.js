import CategoryDataService from 'services/CategoryDataService';

const categories = [
  {
    _id: 'tasks',
    iconClass: 'tim-icons icon-notes',
    title: 'Tasks',
    readonly: true,
  },
  {
    _id: 'shopping',
    iconClass: 'tim-icons icon-bag-16',
    title: 'Shopping',
    readonly: true,
  },
  {
    _id: 'goals',
    iconClass: 'tim-icons icon-trophy',
    title: 'Global goals',
    readonly: true,
  },
];

const categoryFixtures = () =>
  Promise.all(
    categories.map(async (category) => {
      const existing = await CategoryDataService.findOne({ _id: category._id });
      if (!existing) {
        await CategoryDataService.insert(category);
      }
    }),
  );

export default async () => {
  await categoryFixtures();
};
