const fakedata = {
  bname: "2021 Financials",
  currency: "$",
  currencyformat: "before",
  categories: {
    Home: [
      {
        id: 1,
        category: "Home",
        available: 100,
        assigned: 55,
        timing: "Monthly",
        enddate: 2,
        subcat: "Garden",
      },
      {
        id: 2,
        category: "Entertaintment",
        available: 100,
        assigned: 55,
        timing: "Yearly",
        enddate: "July",
        subcat: "Netflix",
      },
    ],
    Recreation: [
      {
        id: 3,
        category: "Recreation",
        available: 100,
        assigned: 55,
        timing: "Monthly",
        enddate: 19,
        subcat: "Gym",
      },
      {
        id: 4,
        category: "Food",
        available: 100,
        assigned: 55,
        timing: "Yearly",
        enddate: "October",
        subcat: "Icecream",
      },
    ],
    Education: [
      {
        id: 5,
        category: "Education",
        available: 100,
        assigned: 55,
        timing: "Yearly",
        enddate: "September",
        subcat: "Tuition",
      },
      {
        id: 6,
        category: "Auto",
        available: 100,
        assigned: 55,
        timing: "Weekly",
        enddate: "Saturday",
        subcat: "Oil",
      },
    ],

    // {
    //   id: 7,
    //   category: "Rent",
    //   available: 100,
    //   assigned: 55,
    //   timing: "Monthly",
    //   enddate: 2,
    // },
    // {
    //   id: 8,
    //   category: "Internet",
    //   available: 100,
    //   assigned: 55,
    //   timing: "Yearly",
    //   enddate: "July",
    // },
    // {
    //   id: 9,
    //   category: "Gym",
    //   available: 100,
    //   assigned: 55,
    //   timing: "Monthly",
    //   enddate: 19,
    // },
    // {
    //   id: 10,
    //   category: "Recreation",
    //   available: 100,
    //   assigned: 55,
    //   timing: "Yearly",
    //   enddate: "October",
    // },
    // {
    //   id: 11,
    //   category: "Insurance",
    //   available: 100,
    //   assigned: 55,
    //   timing: "Yearly",
    //   enddate: "September",
    // },
    // {
    //   id: 12,
    //   category: "Groceries",
    //   available: 100,
    //   assigned: 55,
    //   timing: "Weekly",
    //   enddate: "Saturday",
    // },
  },
};

const a = [
  { home: 1, category: [{ biwi: 1 }, { kiwi: 2 }] },
  { home: 2, category: [{ biwi: 3 }, { kiwi: 4 }] },
];
let emptyArr = [];
a.forEach((item) => {
  item.category.slice(1).forEach((pitem) => {
    emptyArr.push(pitem);
  });
});
let x = 0,
  y = 0;
a.forEach((item, index) => {
  item.category.forEach((pitem, pindex) => {
    if (pitem.biwi === 3) {
      (x = index), (y = pindex);
    }
  });
});
console.log(x, y);

abge = ["a", "b", "c", "d"];
abge.splice(1, 1);
console.log(abge.slice(1, 1));
