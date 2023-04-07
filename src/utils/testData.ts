interface IMenuLevel {
  title?: string;
  showSubmenu?: boolean;
  submenu: IMenuLevel[] | [];
  isActive?: boolean;
}

const menuData: IMenuLevel[] = [
  {
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },
  // 
  // 
  {
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },{
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },{
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },{
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },{
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },{
    title: "Home",
    showSubmenu: false,
    submenu: [],
    isActive: false,
  },
  {
    title: "Inventory Management",
    showSubmenu: false,
    isActive: false,
    submenu: [
      {
        title: "Warehouse Management",
        showSubmenu: false,
        submenu: [
          {
            title: "Item Request",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
          {
            title: "Item Transfer",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Reports",
        showSubmenu: false,
        submenu: [],
        isActive: false,
      },
    ],
  },
  {
    title: "Configuration",
    showSubmenu: false,
    submenu: [
      {
        title: "User",
        showSubmenu: false,
        submenu: [
          {
            title: "User Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
        isActive: false,
      },
      {
        title: "Employee",
        showSubmenu: false,
        submenu: [
          {
            title: "Employee Create",
            showSubmenu: false,
            submenu: [],
            isActive: false,
          },
        ],
      },
    ],
  },
];

export default menuData;
