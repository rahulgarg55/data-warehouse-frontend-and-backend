import Mock from '../mock';
import shortId from 'shortid';

const NotificationDB = {
  list: [
    {
      id: shortId.generate(),
      heading: 'Supplier Inquiry',
      icon: { name: 'chat', color: 'primary' },
      timestamp: 1631182802573,
      title: 'Supplier A',
      subtitle: 'Is this product needed in stock?',
      path: 'chat'
    },
    {
      id: shortId.generate(),
      heading: 'Supplier Inquiry',
      icon: { name: 'chat', color: 'primary' },
      timestamp: 1631182702573,
      title: 'Supplier B',
      subtitle: 'Requesting information about product availability',
      path: 'chat'
    },
    {
      id: shortId.generate(),
      heading: 'Supplier Inquiry',
      icon: { name: 'chat', color: 'primary' },
      timestamp: 1631082502573,
      title: 'Supplier C',
      subtitle: 'Can you confirm if this product is needed?',
      path: 'chat'
    }
  ]
};

Mock.onGet('/api/notification').reply(() => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost('/api/notification/add').reply(() => {
  const response = NotificationDB.list;
  return [200, response];
});

Mock.onPost('/api/notification/delete').reply((config) => {
  let { id } = JSON.parse(config.data);

  const response = NotificationDB.list.filter((notification) => notification.id !== id);
  NotificationDB.list = [...response];
  return [200, response];
});

Mock.onPost('/api/notification/delete-all').reply(() => {
  NotificationDB.list = [];
  const response = NotificationDB.list;
  return [200, response];
});
