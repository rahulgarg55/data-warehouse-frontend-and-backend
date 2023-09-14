export const navigations = [
  { name: 'Dashboard', path: '/dashboard/default', icon: 'dashboard' },
  { label: 'PAGES', type: 'label' },

  {
    name: 'Components',
    icon: 'favorite',
    badge: { value: '4', color: 'secondary' },
    children: [
      { name: 'Transactions', path: '/material/autocomplete', iconText: 'A' },
      { name: ' Customers ', path: '/material/dialog', iconText: 'D' },
      {
        name: 'Suppliers ', path: '/material/form', iconText: 'F'
      },
      { name: 'Incoming/Outgoing', path: '/material/table', iconText: 'T' }
    ]
  },
  {
    name: 'YouTube',
    icon: 'launch',
    type: 'extLink',
    path: 'https://www.youtube.com/@CODEWITHRAHUL./videos'
  }
];
